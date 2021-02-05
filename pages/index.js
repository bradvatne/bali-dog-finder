import Head from "next/head";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import dbConnect from "../utils/dbConnect";
import MarkerData from "../models/Marker";
import dynamic from "next/dynamic";
import Header from "../components/Header";

export default function Home(data) {
  //Next Auth Session, passed to Form
  const [session, loading] = useSession();
  //Map Center (used for selecting location)
  const [center, setCenter] = useState({ lat: -8.6, long: 115.2126, zoom: 12 });
  //Marker filters
  const [markerFilter, setMarkerFilter] = useState('showAll')
  //Function to handle DogForm modal
  const [modalShow, setModalShow] = useState({ show: false, modaltype: "", location: [] });
  //Selecting Location State, triggered by Add Dog forms, consumed by LeafletMap
  const [selectingLocation, setSelectingLocation] = useState(false)

  //Disable Leaflet SSR - Mandatory for compatibility with NextJS
  const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
    ssr: false,
  });


  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"/>
      
<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@600&display=swap" rel="stylesheet"/>
      </Head>
      <Header
        signIn={signIn}
        signOut={signOut}
        session={session}
        setModalShow={setModalShow}
        modalShow={modalShow}
        setSelectingLocation={setSelectingLocation}
        setCenter={setCenter}
        setMarkerFilter={setMarkerFilter}
        markerFilter={markerFilter}
      />

      <div className="leaflet-container">
        <LeafletMap data={data.data} center={center} selectingLocation={selectingLocation} setSelectingLocation={setSelectingLocation} setModalShow={setModalShow} markerFilter={markerFilter} />
      </div>
    </>
  );
}

//Get map markers from DB
export async function getServerSideProps(context) {
  //Connects to database
  dbConnect();

  let data;
  //Query Database for all markers
  try {
    data = await MarkerData.find({});
  } catch (err) {
    console.log("error");
  }

  //Little trick to convert non-serializable fields (like objectID) into JSON (throws error otherwise)
  data = JSON.parse(JSON.stringify(data));

  return {
    props: {
      data,
    },
  };
}

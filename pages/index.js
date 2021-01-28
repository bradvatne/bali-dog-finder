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
  //Function to handle DogForm modal
  const [modalShow, setModalShow] = useState({ show: false, modalContent: "" });

  //Disable Leaflet SSR
  console.log(session);
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
      </Head>
      <Header
        signIn={signIn}
        signOut={signOut}
        session={session}
        setModalShow={setModalShow}
      />

      <div className="leaflet-container">
        <LeafletMap data={data} />
      </div>
    </>
  );
}

//Get map markers from DB
export async function getServerSideProps(context) {
  //Connects to database
  dbConnect();

  //Query Database for all markers
  let data = await MarkerData.find({});

  //Little trick to convert non-serializable fields (like objectID) into JSON (throws error otherwise)
  data = JSON.parse(JSON.stringify(data));

  return {
    props: {
      data,
    },
  };
}

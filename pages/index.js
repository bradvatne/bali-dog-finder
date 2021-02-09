import Head from "next/head";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import dbConnect from "../utils/dbConnect";
import MarkerData from "../models/Marker";
import dynamic from "next/dynamic";
import Header from "../components/Header";

export default function Home(data) {
  //Gues login
  const [guest, setGuest] = useState(false);
  //Next Auth Session
  const [session, loading] = useSession();

  //Map Center (used for selecting location)
  const [center, setCenter] = useState({ lat: -8.6, long: 115.2126, zoom: 12 });
  //Marker filters
  const [markerFilter, setMarkerFilter] = useState("showAll");
  //Function to handle DogForm modal
  const [modalShow, setModalShow] = useState({
    show: false,
    modaltype: "",
    location: [],
  });
  //Selecting Location State, triggered by Add Dog forms, consumed by LeafletMap
  const [selectingLocation, setSelectingLocation] = useState(false);

  //Disable Leaflet SSR - Mandatory for compatibility with NextJS
  const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Bali Dog Finder - Find Lost and Adoptable Dogs in Bali</title>
        <meta
          name="title"
          content="Bali Dog Finder  - Find Lost and Adoptable Dogs in Bali"
        />
        <meta
          name="description"
          content="Search for your lost doggo, help others find their furry friends, and arrange adoptions easily with our map-based interface.  No sales. No bounties. Non-profit. "
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balidogfinder.com/" />
        <meta
          property="og:title"
          content="Bali Dog Finder  - Find Lost and Adoptable Dogs in Bali"
        />
        <meta
          property="og:description"
          content="Search for your lost doggo, help others find their furry friends, and arrange adoptions easily with our map-based interface.  No sales. No bounties. Non-profit. "
        />
        <meta property="og:image" content="https://balidogfinder.com/social.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://balidogfinder.com/" />
        <meta
          property="twitter:title"
          content="Bali Dog Finder  - Find Lost and Adoptable Dogs in Bali"
        />
        <meta
          property="twitter:description"
          content="Search for your lost doggo, help others find their furry friends, and arrange adoptions easily with our map-based interface.  No sales. No bounties. Non-profit. "
        />
        <meta property="twitter:image" content="https://balidogfinder.com/social.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
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
        setGuest={setGuest}
      />

      <div className="leaflet-container">
        <LeafletMap
          data={data.data}
          center={center}
          selectingLocation={selectingLocation}
          setSelectingLocation={setSelectingLocation}
          setModalShow={setModalShow}
          markerFilter={markerFilter}
        />
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
    console.log(err);
  }

  //Little trick to convert non-serializable fields (like objectID) into JSON (throws error otherwise)
  if (data) data = JSON.parse(JSON.stringify(data));

  return {
    props: {
      data,
    },
  };
}

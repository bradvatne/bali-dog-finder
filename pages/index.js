import Head from "next/head";
import React, { useState} from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import dynamic from "next/dynamic";

import Header from "../components/Header";

export default function Home() {
  //Next Auth Session, passed to Form
  const [session, loading] = useSession();
  //Function to handle DogForm modal
  const [modalShow, setModalShow] = useState({ show: false, modalContent: "" });

  //Disable Leaflet SSR
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
        <LeafletMap />
      </div>
    </>
  );
}

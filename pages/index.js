import Head from "next/head";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import dbConnect from "../utils/dbConnect";
import Marker from "../models/Marker";
import dynamic from "next/dynamic";

import Header from "../components/Header";
import ModalContainer from "../components/ModalContainer";
import LostDog from '../components/forms/LostDog';
import FoundDog from '../components/forms/FoundDog'
import AdoptionDog from '../components/forms/AdoptionDog'

export default function Home(data) {
  //Next Auth Session, passed to Form
  const [session, loading] = useSession();
  //Function to handle DogForm modal
  const [modalShow, setModalShow] = useState({show: false, modalContent: ''});
  //Function passed to DogForm to handle closing the window by setting modal state to false
  const closeModal = () => setShowModal({show: false});
  //Modal Content
  //Disable Leaflet SSR
  console.log(session)
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
      <ModalContainer show={modalShow.show} onHide={() => setModalShow({show: false})} >
        {(modalShow.modalContent == 'lostdog') && <LostDog onHide={() => setModalShow({show: false})}/>}
        {(modalShow.modalContent == 'founddog') && <FoundDog onHide={() => setModalShow({show: false})}/>}
        {(modalShow.modalContent == 'adoptiondog') && <AdoptionDog onHide={() => setModalShow({show: false})}/>}
        {(modalShow.modalContent == 'signin') && <LostDog onHide={() => setModalShow({show: false})}/>}
        </ModalContainer>
      <div className="leaflet-container">
        <LeafletMap />
      </div>
    </>
  );
}

//Get map markers from DB
export async function getServerSideProps(context) {
  //Connects to database
  dbConnect();

  //Query Database for all markers
  let data = await Marker.find({});

  //Little trick to convert non-serializable fields (like objectID) into JSON (throws error otherwise)
  data = JSON.parse(JSON.stringify(data));

  return {
    props: {
      data,
    },
  };
}

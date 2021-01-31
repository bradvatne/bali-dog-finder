import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import LostDog from "./forms/LostDog";
import FoundDog from "./forms/LostDog";
import AdoptionDog from "./forms/LostDog";
import { useState } from "react";

export default function Header({ session, signIn, signOut, setSelectingLocation, modalShow, setModalShow, setCenter }) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">Bali Dog Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Locations"
              id="collasible-nav-dropdown-locations"
            >
              <NavDropdown.Item onClick={()=> setCenter({lat: -8.642200081375222, long: 115.14164661291235, zoom: 15})}>Canggu</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> setCenter({lat: -8.651056004310325, long: 115.16261616679331, zoom: 15})}>Kerobokan</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> setCenter({lat: -8.72038369839143, long: 115.1771971703523, zoom: 15})}>Kuta</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> setCenter({lat: -8.704884452281737, long: 115.17079982161916, zoom: 15})}>Legian</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> setCenter({lat: -8.689487172894228, long: 115.16841298340574, zoom: 15})}>Seminyak</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> setCenter({lat: -8.504769316013077, long: 115.26303521236298, zoom: 15})}>Ubud</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filters" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Show Only Lost Dogs
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Show Only Found Dogs
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Show Only Dogs for Adoption
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Show All Dogs
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() =>
                setModalShow({ show: true, modalContent: "lostdog" })
              }
            >
              + Lost Dog
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                setModalShow({ show: true, modalContent: "founddog" })
              }
            >
              + Found Dog
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                setModalShow({ show: true, modalContent: "adoptiondog" })
              }
            >
              + Dog For Adoption
            </Nav.Link>
          </Nav>
          <Nav>
            {!session && (
              <Nav.Link
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </Nav.Link>
            )}
            {session && (
              <Nav.Link>
                <span className="text-white">
                  Signed in as {session.user.email}
                </span>
              </Nav.Link>
            )}
            {session && (
              <Nav.Link
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow.show}
    >
        {(modalShow.modalContent == 'lostdog') && <LostDog session={session} setSelectingLocation={setSelectingLocation} onHide={() => setModalShow({show: false})}/>}
        {(modalShow.modalContent == 'founddog') && <FoundDog session={session} setSelectingLocation={setSelectingLocation} onHide={() => setModalShow({show: false})}/>}
        {(modalShow.modalContent == 'adoptiondog') && <AdoptionDog session={session} setSelectingLocation={setSelectingLocation} onHide={() => setModalShow({show: false})}/>}
        {(modalShow.modalContent == 'signin') && <LostDog session={session} setSelectingLocation={setSelectingLocation} onHide={() => setModalShow({show: false})}/>}
    </Modal>
    </>
  );
}

import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import LostDog from "./forms/LostDog";
import FoundDog from "./forms/FoundDog";
import AdoptDog from "./forms/AdoptDog";
import { useState } from "react";
import NewWindow from "react-new-window";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Header({
  setSelectingLocation,
  modalShow,
  setModalShow,
  setCenter,
  setMarkerFilter,
}) {
  function onHide() {
    setModalShow({ show: false });
  }
  const [session, loading] = useSession;
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
        className="navbar-custom"
      >
        <Navbar.Brand href="/">
          <img src="/brand_icon.png" className="brand-logo"></img>Bali Dog
          Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Locations"
              id="collasible-nav-dropdown-locations"
            >
              <NavDropdown.Item
                onClick={() =>
                  setCenter({
                    lat: -8.642200081375222,
                    long: 115.14164661291235,
                    zoom: 15,
                  })
                }
              >
                Canggu
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  setCenter({
                    lat: -8.651056004310325,
                    long: 115.16261616679331,
                    zoom: 15,
                  })
                }
              >
                Kerobokan
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  setCenter({
                    lat: -8.72038369839143,
                    long: 115.1771971703523,
                    zoom: 15,
                  })
                }
              >
                Kuta
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  setCenter({
                    lat: -8.704884452281737,
                    long: 115.17079982161916,
                    zoom: 15,
                  })
                }
              >
                Legian
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  setCenter({
                    lat: -8.689487172894228,
                    long: 115.16841298340574,
                    zoom: 15,
                  })
                }
              >
                Seminyak
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  setCenter({
                    lat: -8.504769316013077,
                    long: 115.26303521236298,
                    zoom: 15,
                  })
                }
              >
                Ubud
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filters" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => setMarkerFilter("lostdog")}>
                Show Only Lost Dogs
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setMarkerFilter("founddog")}>
                Show Only Found Dogs
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setMarkerFilter("adoptdog")}>
                Show Only Dogs for Adoption
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => setMarkerFilter("showAll")}>
                Show All Dogs
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() =>
                session
                  ? setModalShow({
                      show: true,
                      modaltype: "lostdog",
                      location: [],
                    })
                  : setPopUp(true)
              }
            >
              + Lost Dog
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                session
                  ? setModalShow({
                      show: true,
                      modaltype: "founddog",
                      location: [],
                    })
                  : setPopUp(true)
              }
            >
              + Found Dog
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                session
                  ? setModalShow({ show: true, modaltype: "adoptdog" })
                  : setPopUp(true)
              }
            >
              + Dog For Adoption
            </Nav.Link>
          </Nav>
          <Nav>
            {!session && (
              <Nav.Link
                className="sign-in"
                session={session}
                onClick={() => setPopUp(true)}
              >
                Sign In
              </Nav.Link>
            )}
            {session && (
              <Nav.Link>
                <span className="">Signed in as {session.user.email}</span>
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
      {popUp && (
        <NewWindow url="/auth/signin" onUnload={() => setPopUp(false)} />
      )}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow.show}
        onHide={onHide}
      >
        {modalShow.modaltype == "lostdog" && (
          <LostDog
            session={session}
            setSelectingLocation={setSelectingLocation}
            onHide={() =>
              setModalShow({
                show: false,
                modaltype: localStorage.getItem("modaltype"),
              })
            }
          />
        )}

        {modalShow.modaltype == "founddog" && (
          <FoundDog
            session={session}
            setSelectingLocation={setSelectingLocation}
            onHide={() =>
              setModalShow({
                show: false,
                modaltype: localStorage.getItem("modaltype"),
              })
            }
          />
        )}

        {modalShow.modaltype == "adoptdog" && (
          <AdoptDog
            session={session}
            setSelectingLocation={setSelectingLocation}
            onHide={() => setModalShow({ show: false })}
          />
        )}
      </Modal>
    </>
  );
}

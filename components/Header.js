import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LostDog from "./forms/LostDog";

export default function Header({ setModalShow, onHide, session, signIn, signOut }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="#home">Bali Dog Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Locations" id="collasible-nav-dropdown-locations">
            <NavDropdown.Item href="#action/3.1">Canggu</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Kuta</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Seminyak</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Ubud</NavDropdown.Item>
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
            <Nav.Link><span class="text-white">Signed in as {session.user.email}</span></Nav.Link>
            
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
  );
}

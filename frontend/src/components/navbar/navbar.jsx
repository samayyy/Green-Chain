import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import AuthContext from "../../context/auth-context";

import { ConnectButton } from "web3uikit"
import { useContext } from "react"

import "./navbar.css"

function NavBar() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="navbar-pos">
      {["lg"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 navbar">
          <Container fluid>
            <Navbar.Brand href="/home">Eco-Sustain</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {authCtx.userType === "user" && <Nav.Link href="/user-home">Home</Nav.Link>}
                  {authCtx.userType === "authority" && <Nav.Link href="/authority-home">Home</Nav.Link>}
                  {/* <Nav.Link href="/authority">Authority</Nav.Link> */}
                  <NavDropdown
                    title="Reports"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Active</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Completed
                    </NavDropdown.Item>
                  </NavDropdown>
                  <ConnectButton moralisAuth={false} /> {" "}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default NavBar;

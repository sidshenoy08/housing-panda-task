import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import BrandLogo from '../../assets/BrandLogo.png';

function NavigationBar() {
    return (<>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={BrandLogo}
                        width="150rem"
                        height="30rem"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/listings">Listings</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>)
}

export default NavigationBar;
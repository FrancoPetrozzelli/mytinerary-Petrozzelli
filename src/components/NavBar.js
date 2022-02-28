import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'; 
import { UilUserSquare } from '@iconscout/react-unicons'
import {Link} from 'react-router-dom'

const NavbarMain = () => {
    return (
        <Navbar bg="info" expand="lg" className='d-flex align-items-center'>
<Container fluid>
    <Link to='/' ><img className='logoNav' src = '../assets/logo.png'/></Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
    <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
    >
        <Link to="/"><p className='navTitles'>Home</p></Link>
        <Link to="/cities"><p className='navTitles'>Cities</p></Link>
    </Nav>
    {/* <div className="d-flex">
        <UilUserSquare className='iconUser'/>
    </div> */}
    <NavDropdown title={<UilUserSquare className='iconUser'/>} id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
        </NavDropdown>
    </Navbar.Collapse>
</Container>
</Navbar>

    );
}

export default NavbarMain;
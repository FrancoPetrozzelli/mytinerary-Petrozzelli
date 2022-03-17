import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'; 
import { UilUserSquare } from '@iconscout/react-unicons'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';


const NavbarMain = (props) => {

    // const token = true

    function handleLogOut(){

        props.logOutUser(props.user.email)

    }



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
        {props.user ? (
            <>
            {/* <img src={props.user.imageUrl} className="imgUser"/> */}
            
            <NavDropdown title={<img src={props.user.imageUrl} className="imgUser"/>} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
        </NavDropdown>
            </>
            
        ):(
            <>
            <NavDropdown title={<UilUserSquare className='iconUser'/>} id="basic-nav-dropdown">
            <NavDropdown.Item ><Link to={"/login"}>Log In</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to={"/signup"}>Sign Up</Link></NavDropdown.Item>
            </NavDropdown>
            </>
        )}
    </Navbar.Collapse>
</Container>
</Navbar>

    );
}

const mapStateToProps = (state)=>{

    return{
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {

    logOutUser: userActions.logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMain);





// import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'; 
// import { UilUserSquare } from '@iconscout/react-unicons'
// import {Link} from 'react-router-dom'


// const NavbarMain = () => {

//     const token = true

//     return (
//         <Navbar bg="info" expand="lg" className='d-flex align-items-center'>
// <Container fluid>
//     <Link to='/' ><img className='logoNav' src = '../assets/logo.png'/></Link>
//     <Navbar.Toggle aria-controls="navbarScroll" />
//     <Navbar.Collapse id="navbarScroll">
//     <Nav
//         className="me-auto my-2 my-lg-0"
//         style={{ maxHeight: '100px' }}
//         navbarScroll
//     >
//         <Link to="/"><p className='navTitles'>Home</p></Link>
//         <Link to="/cities"><p className='navTitles'>Cities</p></Link>
//     </Nav>
//     {/* <div className="d-flex">
//         <UilUserSquare className='iconUser'/>
//     </div> */}
//     <NavDropdown title={<UilUserSquare className='iconUser'/>} id="basic-nav-dropdown">
//         {token? (

//             <NavDropdown.Item >Log Out</NavDropdown.Item>
            
//         ):(
//             <>
//             <NavDropdown.Item ><Link to={"/login"}>Log In</Link></NavDropdown.Item>
//             <NavDropdown.Item><Link to={"/signup"}>Sign Up</Link></NavDropdown.Item>
//             </>
//         )}
//         </NavDropdown>
//     </Navbar.Collapse>
// </Container>
// </Navbar>

//     );
// }

// export default NavbarMain;
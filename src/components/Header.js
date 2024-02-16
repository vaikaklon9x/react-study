
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState, useEffect } from 'react';


const Header = (props) => {
  const location = useLocation()
  //const handleSelect = (eventKey) => alert(`selected ${eventKey}`); onChange={handleSelect}

  const { logout, user } = useContext(UserContext)

  const [hideHeader, setHideHeader] = useState(false)

  /*useEffect(() => {

    if (window.location.pathname === '/login') {
      setHideHeader(true)
    }
  }, [])*/

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    alert('Log out success!')
  }
  return (<>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><span>NVN-Apps</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === '/') &&
            <>
              <Nav className="me-auto">
                <NavLink to='/' className='nav-link'>Home</NavLink>
                <NavLink to='/users' className='nav-link'>Manage Users</NavLink>
              </Nav>
              <Nav>
                {user && user.email && <span className='nav-link'>Welcome <i><b>{user.email}</b></i></span>}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth === true
                    ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                    : <NavLink to='/login' className='dropdown-item'>Login</NavLink>
                  }
                </NavDropdown>
              </Nav>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
}
export default Header
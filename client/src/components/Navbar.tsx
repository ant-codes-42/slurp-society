import { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
import  '../styles/Navbar.css'
import auth from '../utils/Auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  return (
    <nav className='nav'>
  
      <div className='nav-div'>
      <ul className='nav-links'>
        <li className='nav-item'>
          <Link to='/' className='a-link'> Home Page</Link>
        </li>

        <li className='nav-item'>
          <Link to='/menu' className='a-link'>Menu</Link>
        </li>
        <li className='nav-item'>
          <Link to='/reservation' className='a-link'>Reservation</Link>
        </li>
        <li className='nav-item'>
          <Link to='/contact' className='a-link'>Contact</Link>
        </li>
          {!loginCheck ? (
            <>
              <li className='nav-item'>
                <Link to='/login' className='a-link'>Login</Link> 
              </li>
              <li className='nav-item'>
                <Link to='/register' className='a-link'>Register</Link> 
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <Link
                to='/'
                className='a-link'
                onClick={() => {
                  auth.logout();
                  setLoginCheck(false); //  Logout & update state
                }}
              >
                Logout
              </Link>
            </li>
          )}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;

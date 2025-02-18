import { useState, useEffect } from 'react';
import { Link } from 'react-router'; 

import auth from '../utils/Auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  return (
    <nav className='nav'>
      <div className='nav-title'>
        <Link to='/'>Home Page</Link>
      </div>
      <ul className='nav-links'>
        <li className='nav-item'>
          <Link to='/menu'>Menu</Link>
        </li>
        <li className='nav-item'>
          <Link to='/reservation'>Reservation</Link>
        </li>
        <li className='nav-item'>
          <Link to='/contact'>Contact</Link>
        </li>
        <li className='nav-item'>
          {!loginCheck ? (
            <>
              <li className='nav-item'>
                <Link to='/login'>Login</Link> 
              </li>
              <li className='nav-item'>
                <Link to='/register'>Register</Link> 
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <Link
                to='/'
                onClick={() => {
                  auth.logout();
                  setLoginCheck(false); //  Logout & update state
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

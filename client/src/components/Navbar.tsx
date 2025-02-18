import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // FIXED: Use 'react-router-dom' instead of 'react-router'
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
        <Link to='/'> Home Page</Link>
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
              <Link to='/login'>
                <button type='button'>Login</button>
              </Link>
              <Link to='/register'>
                <button type='button'>Register</button> 
              </Link>
            </>
          ) : (
            <button
              type='button'
              onClick={() => {
                auth.logout();
                setLoginCheck(false); // Update state after logout
              }}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

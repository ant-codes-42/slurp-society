import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import auth from '../utils/Auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <nav className='nav'>
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
        <li className='nav-item'>
          {!loginCheck ? (
            <Link to='/login' className='a-link'>
              <button type='button'>Login</button>
            </Link>
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
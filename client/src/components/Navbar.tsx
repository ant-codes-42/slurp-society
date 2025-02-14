import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/Auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <nav className='nav'>
      <div className='nav-title'>
        <Link to='/'> My Restaurant</Link>
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
            <Link to='/login'>
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
//user authentication API
import type { UserLogin } from '../interfaces/UserLogin';
import type { RegisterUser} from '../interfaces/RegisterUser';

const login = async (userInfo: UserLogin) => {
  //here is a post request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data; //returns the data we receive from the server 

  } catch (err) {
    console.log('Error from user login: ', err); //log errors that may occur during fetch
    return Promise.reject('Could not fetch user info');
  }
};

export { login }; //login function exported to be used elsewhere 


const register = async (userinfo: RegisterUser) => {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userinfo),
    });

    const data = await response.json();

    if(!response.ok) {
      throw new Error ('Registration failed, check network tab');
    }

    return data; // returns reponse from the backend 

  } catch (err) {
    console.log('Error from user registration', err);
    return Promise.reject('Could not register user');

  }

}

export { register }; 
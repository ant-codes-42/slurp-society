import { useState, type FormEvent, type ChangeEvent } from 'react';
import Auth from '../utils/Auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';

//function to login users
const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    email: '',
    password: '',
  });

  
  //function to handle changes within the input fields 
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  //handles form submission for the login 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //calls login API endpoint with the loginData 
      const data = await login(loginData);
      //if login is succesful, Auth.login is called to store the token in localStorage 
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='container'>
      {/*generic container to hold ONLY the user login password & submit button */}
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Email</label>
        <input 
          type='email'
          name='email'
          value={loginData.email || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;

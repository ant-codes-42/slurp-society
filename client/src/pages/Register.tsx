import { useState, type FormEvent, type ChangeEvent } from 'react';
import { register } from '../api/authAPI';
import type { RegisterUser } from '../interfaces/RegisterUser';
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate(); // helps redirect user after registration is complete

    const [formData, setFormData] = useState<RegisterUser>({
        email: '',
        password: '',
    });

    // Hookstates to check current status of errors, succesful registration and loading status
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    //function to handle input changes
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    //check email format
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    //form submission 
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);


        //checks if email is valid or else it'll send error
        if (!isValidEmail(formData.email)) {
            setError('Invalid email format.');
            return;
        }

        try {
            setLoading(true);
            //calls register API endpoint 
            const response = await register(formData);
            
            if(response.error) {
              throw new Error(response.error); //shows the error on the backend
            }

            setSuccess('Registration successful! Please check your email.');
            //redirects page to login endpoint after 3 seconds 
            setTimeout(() => navigate('/login'), 3000);
        }
        catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error');
        }
    }

    return (
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <h1>Register</h1>
    
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
    
            <label className='label'>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
    
            <label className='label'>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
    
            <button className='button' type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
        </div>
      );
    };
    
    export default Register;


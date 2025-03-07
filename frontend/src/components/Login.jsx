import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    // State for handling input fields and error messages
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser] = useLoginUserMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch(); // Fix typo from "disptach" to "dispatch"
    
    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };

        try {
            const response = await loginUser(data).unwrap();
            const { user } = response;
            dispatch(setUser({ user })); // Save user in Redux store
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            setMessage(`${error.data.message}`); // Display error message
        }
    }

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
                
                {/* Login Form */}
                <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
                    <input 
                        type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address' required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />
                    <input 
                        type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />
                    
                    {/* Display error message if login fails */}
                    {message && <p className='text-red-500'>{message}</p>}

                    <button type='submit'
                        className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                    >Login</button>
                </form>

                {/* Register link */}
                <p className='my-5 italic text-sm text-center'>
                    Don&apos;t have an account? 
                    <Link to="/register" className='text-red-700 px-1 underline'>Register</Link> here.
                </p>
            </div>
        </section>
    )
}

export default Login

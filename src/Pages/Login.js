import React, { useEffect, useState } from 'react';
import Img1 from '../Images//Others/signIn.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (email === '' || password === '') {
      alert("Please fill all details.")
      return
    }

    const payload = {
      "email": email,
      "password": password
    }
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-in`, payload);
    if (data.data.success) {
      setEmail('');
      setPassword('');
      localStorage.removeItem('token')
      localStorage.removeItem('adminToken')
      localStorage.removeItem('user')
      localStorage.removeItem('type')
      localStorage.setItem('token', data.data.data.user.jwtToken)
      localStorage.setItem('type', 'user')
      localStorage.setItem('user', JSON.stringify(data.data.data.user))
      navigate('/user/dashboard')
      setTimeout(() => {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
      }, 500)
    } else {
      // alert(data.data.message)
      if (data.data.message === 'Your Account is not verified.') {
        navigate('/verify-otp', { state: { email: email } });
        toast.error(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-error'
        });
      }
      toast.error(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toast-error'
      });
      // navigate('/login')
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token)
      navigate('/user/dashboard')
  }, [])

  return (
    <>
      <div className="mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src={Img1}
            alt="my zomato"
            style={{
              height: '24rem'
            }}
          />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-[#452a72]">
              Sign in to your account
            </h1>
            <div>
              <span className="text-gray-600 text-sm">Don't have an account? &nbsp; </span>
              <Link to="/register" className="text-gray-700 text-sm font-semibold">
                Sign up
              </Link>
            </div>
            <div className="mb-6 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="email"
                type="text"
                placeholder="Your email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-3 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className='flex justify-between'>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 transition duration-300 rounded   focus:outline-none "
                  />
                  <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
                </div>
                <Link
                  className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>

            </div>

            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

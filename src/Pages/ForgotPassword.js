import React, { useState } from 'react';
import Img1 from '../Images/Doctors/article1.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (email === '') {
      alert("Please fill Email Id.")
      return
    }

    const payload = {
      "email": email
    }
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/forgot-password`, payload);
    if (data.data.success) {
      setEmail('');

      navigate('/verify-otp', { state: { email: email, text: 'forgot-password' } })
      setTimeout(() => {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
      }, 500)
    } else {
      toast.error(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toast-error'
      });
    }
  };

  return (
    <>
      <div className="mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src={Img1}
            alt="my zomato"
          />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-[#452a72]">
              Forgot Password
            </h1>
            <div>
              <span className="text-gray-600 text-sm">Don't have an account?&nbsp;</span>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <div className="mb-3 mt-6">
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
            

          </div> */}

            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;

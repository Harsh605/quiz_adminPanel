import React, { useState } from 'react';
import Img1 from '../Images/Doctors/article1.jpeg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!password === '' || !confirmPassword === '') {
      alert("Please fill all details.")
      return
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password does not match.")
      return
    }

    const payload = {
      email: location.state.email,
      password: password
    }
    let apiUrl = `${process.env.REACT_APP_API_URL}/admin/update-password`
    const data = await axios.post(apiUrl, payload);
    if (data.data.success) {
      setPassword('');
      setConfirmPassword('');

      navigate('/')
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
              Update Password
            </h1>


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
                onChange={(e) => setPassword(e.target.value)}
              />


            </div>

            <div className="mb-3 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="cPassword"
              >
                Confirm Password
              </label>
              <input
                className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
                id="cPassword"
                type="password"
                placeholder="Your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />


            </div>

            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdatePassword;

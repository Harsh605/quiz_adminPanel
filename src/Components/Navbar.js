

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Img1 from '../Images/Others/logo.jpg';
import jwt_decode from "jwt-decode";


function Navbar({ userData }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     const token = localStorage.getItem('token');
  //     setUser(jwt_decode(token));
  //   } else
  //     navigate('/login')

  // }, [])

  return (
    <>
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8" style={{ height: "101px"}}>
        <nav className="flex justify-center">
          <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
            <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
              {/* <Link
                className="px-5 py-2 text-sm font-medium text-gray-600  "
                to="/"
              >
                Home
              </Link>
              <Link
                className="px-5 py-2 text-sm font-medium text-gray-600  "
                to="/about"
              >
                About
              </Link>
              <Link
                className="px-5 py-2 text-sm font-medium text-gray-600  "
                to="/articles"
              >
                Material
              </Link>
              <Link
                className="px-5 py-2 text-sm font-medium text-gray-600  "
                to="/pricing"
              >
                Pricing
              </Link> */}
            </div>
            <div className="flex w-full items-center justify-between md:w-auto">
              {/* <Link className="w-28 dark:hidden" to="/">
                <img
                  alt="Logo"
                  width="150"
                  height="70"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: 'transparent' }}
                  sizes="(max-width: 640px) 100vw, 200px"
                  // src="https://bentlyfoundation.org/images/tesla.png"
                  src={Img1}
                />
              </Link>
              <button
                className="order-2 ml-2 md:hidden focus:outline-none"
                onClick={handleMenuToggle}
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button> */}
            </div>
            <div className="order-3 hidden w-full md:flex md:w-auto md:order-none md:justify-end">
              {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " target="" rel="" to="/doctors">Doctors</Link> */}
              {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " target="" rel="" to="/QuestionsPage">Q/A</Link> */}
              {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " target="" rel="" to="/contact">Contact</Link> */}
              {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " to={Object.keys(user).length > 0 ? `/${userData.role}/dashboard` : '/login'}>Dashboard</Link> */}
              {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " to="/admin-login">Admin Login</Link>
              <Link className="px-5 py-2 text-sm font-medium text-gray-600  " to="/login">Login</Link> */}
            </div>

            <div
              style={{ zIndex: "100" }}
              className={`fixed left-0 top-0 h-full w-[100vw] bg-white  transform transition-transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
            >
              <div className="flex flex-col h-full justify-start items-center py-8 px-4">
                {/* <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/"
                  onClick={handleMenuToggle}
                >
                  Home
                </Link>
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/about"
                  onClick={handleMenuToggle}
                >
                  About
                </Link>
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/articles"
                  onClick={handleMenuToggle}
                >
                  Material
                </Link>
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/pricing"
                  onClick={handleMenuToggle}
                >
                  Pricing
                </Link>
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/doctors"
                  onClick={handleMenuToggle}
                >
                  Doctors
                </Link>

                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/contact"
                  onClick={handleMenuToggle}
                >
                  Contact
                </Link>
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to={`/${userData.role}/dashboard`}
                  onClick={handleMenuToggle}
                >
                  Dashboard
                </Link>
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
                  to="/login"
                  onClick={handleMenuToggle}
                >
                  Login
                </Link> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;


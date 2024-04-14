import React, { useState } from 'react';
import Img1 from '../Images/Others/signUp.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { Checkbox, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [checkboxError, setCheckboxError] = useState();
    const navigate = useNavigate();
    // const [designation, setDesignation] = useState('');
    // const [country, setCountry] = useState('');
    // const [state, setState] = useState('');
    // const [city, setCity] = useState('');
    // const [zipcode, setZipcode] = useState('');
    // const [certificate, setCertificate] = useState('');
    // const [plan, setPlan] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === '') {
            setCheckboxError("Please Select Type.")
            return
        }
        if (name === '') {
            setCheckboxError("Please Fill your name.")
            return
        }
        if (email === '') {
            setCheckboxError("Please Fill your email.")
            return
        }
        if (mobile === '') {
            setCheckboxError("Please Fill your mobile no.")
            return
        }
        if (password === '') {
            setCheckboxError("Please Fill your password.")
            return
        }
        if (cpassword === '') {
            setCheckboxError("Please Fill your confirm password.")
            return
        }

        if (password !== cpassword) {
            setCheckboxError("Confirm password should not matched with password.")
            return
        }
        if(!checkbox) {
            setCheckboxError('Please read and accept the terms & conditions and privacy policy.')
            return
        }
        const payload = {
            "type": type,
            "name": name,
            "email": email,
            "password": password,
            "mobile": mobile,
            // "address": "300, Jaswant Nagar",
            // "state": "Rajasthan",
            // "gender": "Male"
        }
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, payload);
        if (data.data.success) {
            setName('');
            setEmail('');
            setMobile('');
            setPassword('');
            setCPassword('');
            setType('');
            navigate('/verify-otp', { state: { email: email } })
            setTimeout(() => {
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        } else {
            // alert(data.data.message)
            navigate('/login')
            setTimeout(() => {
                toast.error(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        }

        // setDesignation('');
        // setCountry('');
        // setState('');
        // setCity('');
        // setZipcode('');
        // setCertificate('');
        // setPlan('');
    };

    return (
        <>
            <div className="w-full mx-auto">
                <div className="flex justify-center my-12">
                    {/* Row */}
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        {/* Col */}
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage: `url(${Img1})`,
                            }}
                        ></div>
                        {/* Col */}
                        <div className="w-full xl:w-1/2 p-8">
                            <form method="post" action="#" onSubmit={handleSubmit}>
                                <h3 className="my-4 text-2xl font-semibold text-[#452a72]">Sign Up</h3>
                                <div>
                                    <span className="text-gray-600 text-sm">
                                        Already have an account? &nbsp;
                                    </span>
                                    <Link to="/login" className="text-gray-700 text-sm font-semibold">
                                        Sign in
                                    </Link>
                                </div>

                                <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5 mb-4 mt-6">
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="Name"
                                        >
                                            Type
                                        </label>
                                        <input
                                            id="student"
                                            type="radio"
                                            checked={type === 'student'}
                                            onChange={() => setType('student')}
                                        />  <label for='student'>Student</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input
                                            id="donar"
                                            type="radio"
                                            checked={type === 'donar'}
                                            onChange={() => setType('donar')}
                                        /> <label for='donar'>Donar</label>
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="Name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="Name"
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="email"
                                            type="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="mobile"
                                        >
                                            Mobile No
                                        </label>
                                        <input
                                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center  focus:outline-none h-10  mt-1  px-4 w-full bg-gray-50 border border-gray-200"
                                            id="mobile"
                                            type="number"
                                            placeholder="Mobile No"
                                            value={mobile}
                                            onChange={(e) => {
                                                if (e.target.value.length > 10) {
                                                    return
                                                }
                                                setMobile(e.target.value)
                                            }}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="md:col-span-5 ">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="cpassword"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-5 ">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="cpassword"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="cpassword"
                                            type="password"
                                            placeholder="confirm password"
                                            value={cpassword}
                                            onChange={(e) => setCPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        {/* <label
                                        htmlFor="state"
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                    >
                                        Choose Plan
                                    </label>
                                    <select
                                        className="mb-4 h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                                        required
                                        value={plan}
                                        onChange={(e) => setPlan(e.target.value)}
                                    >
                                        <option value="">Choose Plan</option>
                                        <option value="" className="flex justify-between relative">
                                            1st plan
                                        </option>
                                        <option value="">2nd plan</option>
                                        <option value="">3rd plan</option>
                                    </select> */}
                                        <div class="form-check flex justify-center items-center mx-auto">

                                            <input style={{ width: "15px", height: "15px" }} class="form-check-input me-2 " type="checkbox" value="" id="form2Example3cg" onChange={(e) => {setCheckbox(!checkbox); setCheckboxError('')}} />
                                            <label class="form-check-label" for="form2Example3cg">
                                                I agree all statements in <Link to="/privacyPolicy" className="text-body"><u>Terms of service</u></Link>
                                            </label>
                                        </div>
                                            {checkboxError && <div className='form-check flex justify-center items-center mx-auto' style={{color: 'red'}}>{checkboxError}</div>}
                                    </div>

                                </div>
                                <div className="flex w-full mt-8">
                                    <button
                                        className="w-full bg-[#452a72]  text-white  hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                        type="submit"
                                        // disabled={!checkbox}
                                    >
                                        SignUp
                                    </button>
                                </div>
                            </form>
                            {/* <div className="flex flex-col space-y-5 mt-3">
                            <span className="flex items-center justify-center space-x-2">
                                <span className="h-px bg-gray-400 w-14"></span>
                                <span className="font-normal text-gray-500">
                                    or free signup
                                </span>
                                <span className="h-px bg-gray-400 w-14"></span>
                            </span>
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/register-as-a-user"
                                    style={{ textDecoration: 'none' }}
                                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-[#452a72] rounded-md group hover:bg-[#452a72] focus:outline-none"
                                >
                                    <span className="text-[#452a72] group-hover:text-white">
                                        <i className="fas fa-user user-icon "></i>
                                    </span>
                                    <span className="text-sm font-medium text-[#452a72] group-hover:text-white">
                                        Signup as a User
                                    </span>
                                </Link>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;

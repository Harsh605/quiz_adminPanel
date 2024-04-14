import React, { useState } from 'react';
import Img1 from "../Images/Doctors/article3.jpeg";
import { Link } from 'react-router-dom';
import { Country, State, City } from "country-state-city";

const FreeRegister = () => {
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
    };

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-center my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                        style={{
                            backgroundImage: `url(${Img1})`,
                        }}
                    ></div>
                    <div className="w-full xl:w-1/2 p-8">
                        <form method="post" action="#" onSubmit={handleSubmit}>
                            <h3 className="my-4 text-2xl font-semibold text-[#452a72]">
                                Sign Up as a Member
                            </h3>
                            <div>
                                <span className="text-gray-600 text-sm">
                                    Don't have an account?
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
                                        Name
                                    </label>
                                    <input
                                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                        id="Name"
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label
                                        htmlFor="country"
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                    >
                                        Country
                                    </label>
                                    <select
                                        className="h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                                        required
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="">Country</option>
                                        {Country &&
                                            Country.getAllCountries().map((item, id) => (
                                                <option key={id} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                {country && (
                                    <div className="md:col-span-3">
                                        <label
                                            htmlFor="state"
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                        >
                                            State / province
                                        </label>
                                        <select
                                            className="h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                                            required
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        >
                                            <option value="">State</option>
                                            {State &&
                                                State.getStatesOfCountry(country).map((item, id) => (
                                                    <option key={id} value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                )}
                                {state && (
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="state"
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                        >
                                            City
                                        </label>
                                        <select
                                            className="h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        >
                                            <option value="">City</option>
                                            {City &&
                                                City.getCitiesOfState(country, state).map((item, id) => (
                                                    <option key={id} value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                )}
                                <div className="md:col-span-5">
                                    <label
                                        htmlFor="zipcode"
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                    >
                                        Zipcode
                                    </label>
                                    <input

                                        className="focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        id="zipcode"
                                        type="number"
                                        placeholder="Zip Code"
                                        value={zipcode}
                                        onChange={(e) => setZipcode(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label
                                        htmlFor="message"
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                    >
                                        Write about yourself
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        placeholder="Your Message"
                                        className="w-full mb-4 px-4 py-3 border-2 text-gray-700 placeholder:text-gray-700 rounded-md outline-none h-32 focus:ring-4 border-gray-300  ring-gray-100  focus:outline-none"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                    <div class="form-check flex justify-center items-center">

                                        <input style={{ width: "15px", height: "15px" }} class="form-check-input me-2 " type="checkbox" value="" id="form2Example3cg" />
                                        <label class="form-check-label" for="form2Example3g">
                                            I agree all statements in <Link to="/privacyPolicy" className="text-body"><u>Terms of service</u></Link>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full mt-8">
                                <button
                                    className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                    type="submit"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <div className="flex flex-col space-y-5 mt-3">
                            <span className="flex items-center justify-center space-x-2">
                                <span className="h-px bg-gray-400 w-14"></span>
                                <span className="font-normal text-gray-500">
                                    or Pro signup
                                </span>
                                <span className="h-px bg-gray-400 w-14"></span>
                            </span>
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/register"
                                    style={{ textDecoration: "none" }}
                                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-[#452a72] rounded-md group hover:bg-[#452a72] focus:outline-none"
                                >
                                    <span className="text-[#452a72] group-hover:text-white">
                                        <i className="fas fa-user user-icon "></i>
                                    </span>
                                    <span className="text-sm font-medium text-[#452a72] group-hover:text-white">
                                        Signup as a Doctor
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeRegister;

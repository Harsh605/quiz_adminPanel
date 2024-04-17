import React, { useEffect, useState } from "react";
import img1 from "../Images/Doctors/doctor2.jpeg"
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import EditPassword from "./Components/EditPassword";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { compact } from "lodash";
import '../App.css';
import { handleUnAuthorized } from "../hook/handleUnauthorized";

function ProfilePage() {
    const navigate = useNavigate()
    const [open2, setOpen2] = useState(false)
    const [user, setUser] = useState({});
    const [address, setAddress] = useState({});

    const profileGet = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/get-profile`, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                setUser(data.data.data.admin)
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    useEffect(() => {
        profileGet()
    }, [])
    console.log(user.avatar)
    return (
        <>
            <EditPassword open={open2} setOpen={setOpen2} />

            <div className="px-1 lg:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow rounded xl:flex lg:flex w-full">
                    <div className="xl:w-2/5 lg:w-2/5 bg-gray-100 dark:bg-gray-800 py-8 border-gray-300 dark:border-gray-200 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="h-24 w-24 rounded-full mb-3">
                                <img className="h-full w-full object-cover rounded-full shadow" src={user?.avatar ? user.avatar : "https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png"} />
                            </div>
                            <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">{user?.name}</p>
                            <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">{user?.email}</p>
                            <div className="flex mb-6 gap-2">

                                <button onClick={() => navigate('edit')} className="bg-white font-medium transition duration-150 ease-in-out hover:bg-gray-200 rounded text-[#452a72] px-6 py-2 text-sm border border-[#452a72] dark:border-gray-200 focus:outline-none">Edit Profile</button>
                                <button onClick={() => setOpen2(true)} className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] ] focus:outline-none">Edit Password</button>
                            </div>
                            {/* <div className="flex justify-start flex-wrap pt-5 gap-4 socials px-3">

                                <div className="relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block"><a target="_blank" href="https://www.linkedin.com/in/buff-goofy-164bb027a">
                                        <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                                    </a></span>
                                </div>
                                <div className="relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block"><a target="_blank" href="mailto:contact@buffgoofy.com">
                                        <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                    </a></span>
                                </div>
                                <div className=" relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block"><a target="_blank" href="https://www.facebook.com/profile.php?id=100093479117440">
                                        <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                    </a></span>
                                </div>
                                <div className="relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block">
                                        <a target="_blank" href="https://www.instagram.com/buff.goofy/">
                                            <i className="social-links fa-brands fa-instagram text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                        </a></span>

                                </div>
                                <div className="relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block">
                                        <a target="_blank" href="http://discordapp.com/users/1118422230804725760">
                                            <i className="social-links fa-brands fa-discord text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                        </a></span>

                                </div>
                                <div className="relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block">
                                        <a target="_blank" href="https://www.reddit.com/user/Buff_Goofy/">
                                            <i className="social-links fa-brands fa-reddit text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                        </a></span>

                                </div>
                                <div className="relative overflow-hidden block footer-div cursor-pointer">
                                    <span className="block"><a target="_blank" href="https://twitter.com/findoutsoon">
                                        <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                                    </a></span>
                                </div>

                            </div> */}
                        </div>
                    </div>
                    <div className="xl:w-3/5 lg:w-3/5 px-6 py-8">
                        <div className="flex flex-wrap justify-between">
                            {/* <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Birthday</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">29 Jan, 1982</p>
                                </div>
                            </div> */}
                            {/* <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Gender</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{user?.gender}</p>
                                </div>
                            </div> */}
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Name</p>
                                    {/* <p className="text-sm text-gray-700 dark:text-gray-400">{compact([address?.city, address.state, address?.country]).join(', ')}</p> */}
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{user?.name}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Email</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{user?.email}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Phone Number</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{user?.mobile}</p>
                                </div>
                            </div>
                            {/* <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Pin Code</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{address.pinCode}</p>
                                </div>
                            </div> */}
                            
                            

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {/* Card code block end */}
        </>
    );
}
export default ProfilePage;

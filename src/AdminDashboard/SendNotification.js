import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CityStateDropDown, CountryDropDown, handleUnAuthorized } from "../hook/handleUnauthorized";

function SendNotification() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                title: title,
                description: description
            };
            const adminToken = localStorage.getItem('adminToken') || ''
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/push-notification`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminToken
                }

            });
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-error'
                });
            }
        } catch (error) {
            console.error('Error sending push notification:', error);
            // Handle error here, e.g., display a toast or error message
        }
    };
    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow py-7">
                                <div className="px-7">
                                    <form onSubmit={handleFormSubmit}>
                                        <p className="text-xl font-bold leading-tight text-gray-800">
                                            Send Notification
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-4 border p-3">

                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Title
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={title}
                                                    name="title"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Description
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={description}
                                                    name="description"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-2 mb-3 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                style={{ height: '40px' }}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-3 text-white  lg:max-w-[100px] w-full "
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default SendNotification;

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import { CityStateDropDown, CountryDropDown, handleUnAuthorized } from "../../hook/handleUnauthorized";

function AddSocialLink() {
    const navigate = useNavigate();

    const [slide, setSlide] = useState({
        name: '',
        link: ''
    });

    const addSlide = async (e) => {
        e.preventDefault()
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/admin/add-social-link`, slide, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                navigate('/admin/social-link')
                // alert(data.data.message)
                setTimeout(() => {
                    toast.success(data.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success'
                    });
                }, 500)
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const handleChange = (e) => setSlide({ ...slide, [e.target.name]: e.target.value })

    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow py-7">
                                <div className="mt-10 px-7">
                                    <form onSubmit={(e) => addSlide(e)}>
                                        <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Add Social Link
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Name
                                                </p>
                                                <input
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    type="text"
                                                    value={slide?.name}
                                                    name="name"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                    Update Your Name
                                                </p> */}
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Link
                                                </p>
                                                <input
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    type="link"
                                                    value={slide?.link}
                                                    name="link"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                    Update Your Name
                                                </p> */}
                                            </div>
                                            {/* <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Email
                                                </p>
                                                <input
                                                    type="email"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={admin?.email}
                                                    name="email"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Email
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Phone No
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={admin?.mobile}
                                                    name="mobile"
                                                    onChange={(e) => {
                                                        if (e.target.value.length === 11) return
                                                        handleProfile(e)
                                                    }}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Phone No
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Your Photo
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setAdmin({ ...admin, ['image']: e.target.files[0] })}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Set Your Photo
                                                </p>
                                            </div> */}
                                        </div>
                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                // onClick={() => AddSlide()}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full "
                                            >
                                                Add Link
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

export default AddSocialLink;

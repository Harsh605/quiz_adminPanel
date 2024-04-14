import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import { CityStateDropDown, CountryDropDown, handleUnAuthorized } from "../../hook/handleUnauthorized";

function EditProfile() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({});
    const [type, setType] = useState('student');
    const [address, setAddress] = useState({});
    const [bank, setBank] = useState({});
    const [kyc, setKyc] = useState({});
    const [professional, setProfessional] = useState({});
    const [education, setEducation] = useState({});

    const profileGet = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/get-profile`, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                localStorage.setItem('admin', JSON.stringify(data.data.data.admin))
                setAdmin(data.data.data.admin)
                setAddress(data.data.data.address)
                setKyc(data.data.data.kyc)
                setType(data.data.data.admin.type)
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    const profileEdit = async () => {
        if (admin?.mobile.length >= 11) {
            alert("Mobile no. should be 10 digit.")
            return
        }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const form = new FormData();
            form.append('name', admin.name)
            form.append('email', admin.email)
            form.append('mobile', admin.mobile)
            form.append('profile-pic', admin.image)
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/admin/edit-profile`, form, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                profileGet()
                // alert(data.data.message)
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const addressEdit = async () => {
        if (!address.street || !address.pinCode || !address.city || !address.state || !address.country) {
            alert('Fill Address Detail Properly.')
            return
        }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const payload = {
                street: address.street,
                pinCode: address.pinCode,
                city: address.city,
                state: address.state,
                country: address.country
            }
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-admin-address`, payload, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                profileGet()
                // alert(data.data.message)
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const kycEdit = async () => {
        if (!kyc.panNo || !kyc.tanNo || !kyc.panImage || !kyc.tanImage) {
            alert('Fill KYC Detail Properly.')
            return
        }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const form = new FormData();
            form.append('panNo', kyc.panNo)
            form.append('tanNo', kyc.tanNo)
            form.append('aadharNo', kyc.aadharNo)
            if (typeof kyc.panImage === 'object')
                form.append('panImage', kyc.panImage)

            if (typeof kyc.tanImage === 'object')
                form.append('tanImage', kyc.tanImage)

            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-admin-kyc`, form, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                profileGet()
                // alert(data.data.message)
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const handleProfile = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value })

    const handleAddress = (e) => setAddress({ ...address, [e.target.name]: e.target.value })

    const handleKYC = (e) => setKyc({ ...kyc, [e.target.name]: e.target.value })

    useEffect(() => {
        profileGet()
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submit logic or API call here
    };

    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow py-7">
                                <div className="mt-10 px-7">
                                    <form onSubmit={handleSubmit}>
                                        <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Update Your Profile Detail
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Name
                                                </p>
                                                <input
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={admin?.name}
                                                    name="name"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                                <p className="mt-3 text-xs leading-3 text-gray-600">
                                                    Update Your Name
                                                </p>
                                            </div>
                                            <div>
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
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                onClick={() => profileEdit()}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full "
                                            >
                                                Update Profile
                                            </button>
                                        </div>
                                        {/* ---------------------- Address Detail -------------------- */}
                                        {/* <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Update Your Address Detail
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Street Address
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    name="street"
                                                    value={address?.street}
                                                    onChange={(e) => handleAddress(e)}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Street
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    PinCode
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    name="pinCode"
                                                    value={address?.pinCode}
                                                    onChange={(e) => handleAddress(e)}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your PinCode
                                                </p>
                                            </div>
                                            <CityStateDropDown address={address} setAddress={setAddress} type={'city'} />
                                            <CityStateDropDown address={address} setAddress={setAddress} type={'state'} />
                                            <CountryDropDown address={address} setAddress={setAddress} />
                                        </div>
                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                onClick={() => addressEdit()}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[160px] w-full "
                                            >
                                                Update Address
                                            </button>
                                        </div> */}
                                        {/* ---------------------- KYC Detail -------------------- */}
                                        {/* <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Update Your KYC Detail
                                        </p>
                                        <div className=" mt-7 border p-3">
                                            <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 border p-2">
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Pan No.*
                                                    </p>
                                                    <input
                                                        type="text"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        name="panNo"
                                                        value={kyc?.panNo}
                                                        onChange={(e) => handleKYC(e)}
                                                    />
                                                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Pan No.
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Upload Pan Card* ( PNG, JPG, PDF )
                                                    </p>
                                                    <input
                                                        // accept="image/*"
                                                        type="file"
                                                        name="image"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        // value={photo}
                                                        onChange={(e) => setKyc({ ...kyc, ['panImage']: e.target.files[0] })}
                                                    />
                                                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Pan Card
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 border p-2 mt-2">
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Tan No.
                                                    </p>
                                                    <input
                                                        type="text"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        name="tanNo"
                                                        value={kyc?.tanNo}
                                                        onChange={(e) => handleKYC(e)}
                                                    />
                                                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Tan No.
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Upload Tan No (PNG, JPG, PDF )
                                                    </p>
                                                    <input
                                                        // accept="image/*"
                                                        type="file"
                                                        name="image"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        // value={photo}
                                                        onChange={(e) => setKyc({ ...kyc, ['tanImage']: e.target.files[0] })}
                                                    />
                                                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Pan Card
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                onClick={() => kycEdit()}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[160px] w-full "
                                            >
                                                Update KYC
                                            </button>
                                        </div> */}
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

export default EditProfile;

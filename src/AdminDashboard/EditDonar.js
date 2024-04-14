import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import TextEditor from "../Pages/Text";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AnnualIncomeDropDown, CityStateDropDown, CountryDropDown, handleUnAuthorized } from "../hook/handleUnauthorized";

function EditDonar() {
    const navigate = useNavigate();
    const location = useLocation()
    const [user, setUser] = useState({});
    const [type, setType] = useState('student');
    const [address, setAddress] = useState({});
    const [bank, setBank] = useState({});
    const [kyc, setKyc] = useState({});
    const [professional, setProfessional] = useState({});
    const [education, setEducation] = useState({});
    const [donar, setDonar] = useState({})

    const handleChange = (e) => setDonar({ ...donar, [e.target.name]: e.target.value })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (donar.name === '' || donar.email === '' || donar.mobile === '' || donar.password === '' || donar.confirmPassword === '') {
            alert("Please fill all details.")
            return
        }

        if (donar.password !== donar.confirmPassword) {
            alert("Confirm password should not matched with password.")
            return
        }
        const payload = {
            "type": 'donar',
            "create": 'admin',
            "name": donar.name,
            "email": donar.email,
            "password": donar.password,
            "mobile": donar.mobile
        }
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, payload);
        if (data.data.success) {
            setDonar({})
            navigate('/admin/donars')
            setTimeout(() => {
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        } else {
            handleUnAuthorized(data.data.message, navigate)
        }
    };

    const handleProfile = (e) => setUser({ ...user, [e.target.name]: e.target.value })

    const handleAddress = (e) => setAddress({ ...address, [e.target.name]: e.target.value })

    const handleKYC = (e) => setKyc({ ...kyc, [e.target.name]: e.target.value })

    const handleProfessional = (e) => setProfessional({ ...professional, [e.target.name]: e.target.value })

    const profileGet = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/user-get-profile/${location.state.userId}`, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                localStorage.setItem('user', JSON.stringify(data.data.data.user))
                setUser(data.data.data.user)
                setAddress(data.data.data.address)
                setBank(data.data.data.bank)
                setKyc(data.data.data.kyc)
                setProfessional(data.data.data.professional)
                setEducation(data.data.data.education)
                setType(data.data.data.user.type)
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
        } else {
            navigate('/admin-login')
        }
    }
    const profileEdit = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const payload = {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                gender: user.gender
            }
            const form = new FormData();
            form.append('name', user.name)
            form.append('email', user.email)
            form.append('mobile', user.mobile)
            form.append('profile-pic', user.image)
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-profile?id=${location.state.userId}`, form, { headers: { Authorization: adminToken } });
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
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-address?id=${location.state.userId}`, payload, { headers: { Authorization: adminToken } });
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
        if (!kyc.panNo || !kyc.tanNo || !kyc.aadharNo || !kyc.aadharFront || !kyc.aadharBack || !kyc.panImage || !kyc.tanImage) {
            alert('Fill KYC Detail Properly.')
            return
        }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const form = new FormData();
            form.append('panNo', kyc.panNo)
            form.append('tanNo', kyc.tanNo)
            form.append('aadharNo', kyc.aadharNo)
            if (typeof kyc.aadharFront === 'object')
                form.append('aadharFront', kyc.aadharFront)

            if (typeof kyc.aadharBack === 'object')
                form.append('aadharBack', kyc.aadharBack)

            if (typeof kyc.panImage === 'object')
                form.append('panImage', kyc.panImage)

            if (typeof kyc.tanImage === 'object')
                form.append('tanImage', kyc.tanImage)

            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-kyc?id=${location.state.userId}`, form, { headers: { Authorization: adminToken } });
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

    const professionalEdit = async () => {
        if (!professional.occupation || !professional.designation || !professional.annualIncome) {
            alert('Fill Professional Detail Properly.')
            return
        }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const payload = {
                fatherName: professional.fatherName,
                occupation: professional.occupation,
                designation: professional.designation,
                annualIncome: professional.annualIncome
            }
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-professional?id=${location.state.userId}`, payload, { headers: { Authorization: adminToken } });
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

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (!adminToken)
            navigate('/admin-login')

        profileGet()
    }, [])




    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow mt-7 py-7">
                                <div className="mt-10 px-7">
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
                                                value={user?.name}
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
                                                value={user?.email}
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
                                                value={user?.mobile}
                                                name="mobile"
                                                onChange={(e) => {
                                                    if (e.target.value) return
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
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                // value={photo}
                                                onChange={(e) => setUser({ ...user, ['image']: e.target.files[0] })}
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
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
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
                                    </div>
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
                                        Update Your Professional Detail
                                    </p>
                                    <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">

                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Occuption*
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                name="occupation"
                                                value={professional?.occupation}
                                                onChange={(e) => handleProfessional(e)}
                                            />
                                            <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Update Your Occuption
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Designation*
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                name="designation"
                                                value={professional?.designation}
                                                onChange={(e) => handleProfessional(e)}
                                            />
                                            <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Update Your Designation
                                            </p>
                                        </div>
                                        <AnnualIncomeDropDown professional={professional} setProfessional={setProfessional} />
                                    </div>
                                    <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                        <button
                                            type="submit"
                                            onClick={() => professionalEdit()}
                                            className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[220px] w-full "
                                        >
                                            Update Professional Detail
                                        </button>
                                    </div>
                                    {/* ---------------------- KYC Detail -------------------- */}
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
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
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 border p-2 mt-2">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Aadhar Card No.
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={kyc?.aadharNo}
                                                    name="aadharNo"
                                                    onChange={(e) => handleKYC(e)}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Aadhar Card No.
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Front Side  (PNG, JPG, PDF )
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setKyc({ ...kyc, ['aadharFront']: e.target.files[0] })}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Adhar Front Side
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Back Side (PNG, JPG, PDF )
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setKyc({ ...kyc, ['aadharBack']: e.target.files[0] })}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Adhar Back Side
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
                                    </div>
                                </div>

                                {/* <hr className="h-[1px] bg-gray-100 my-14" />
                                <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                    <button
                                        onClick={() => navigate("/admin/donars")}
                                        className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full "
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleFormSubmit}
                                        className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full  "
                                    >
                                        Create
                                    </button>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditDonar;


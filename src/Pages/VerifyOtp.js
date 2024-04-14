import React, { useEffect, useState } from 'react';
import Img1 from '../Images/Doctors/doctor1.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPInput from 'react-otp-input';
import '../styles/css/verifyOtp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp = () => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp === '') {
            alert("Please fill otp.")
            return
        }

        const payload = {
            email: location.state.email,
            otp: otp
        }
        let apiUrl = `${process.env.REACT_APP_API_URL}/admin/verify-otp`
        const data = await axios.post(apiUrl, payload);
        if (data.data.success) {
            if (location?.state?.text)
                navigate('/update-password', { state: { email: location.state.email, text: location?.state?.text } })
            else
                navigate('/login')

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

    const handleResendOtp = async (e) => {
        e.preventDefault();

        const payload = {
            email: location.state.email
        }
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/resend-otp`, payload);
        if (data.data.success) {
            // alert(data.data.message)
            toast.success(data.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-success'
            });
        } else {
            // alert(data.data.message)
            toast.error(data.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        }
    };

    function handleChange(otp) {
        setOtp(otp);
    }

    useEffect(() => {
        if (!location?.state?.email || location.state.email === '') navigate('/login')
    }, [])

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
                                <h3 className="my-4 text-2xl font-semibold text-[#452a72]">Verify OTP</h3>
                                {/* <div>
                                <span className="text-gray-600 text-sm">
                                    Already have an account? &nbsp;
                                </span>
                                <Link to="/login" className="text-gray-700 text-sm font-semibold">
                                    Sign in
                                </Link>
                            </div> */}

                                <div className="otpElements">
                                    <p className="p3" style={{ color: 'black', fontWeight: '700' }}>Enter your OTP here*</p>
                                    <div className="otp">
                                        <OTPInput
                                            onChange={handleChange}
                                            value={otp}
                                            inputStyle="inputStyle"
                                            numInputs={4}
                                            separator={<span></span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    </div>

                                    <p className="p3" style={{ color: 'black', fontWeight: '500', marginTop: '10px' }}>Didn't receive the code?&nbsp;

                                        <span className="" style={{ color: 'black', fontWeight: '700', cursor: 'pointer' }} onClick={(e) => handleResendOtp(e)}> Resend Otp</span>
                                    </p>
                                </div>
                                <div className="flex w-full mt-8">
                                    <button
                                        className="w-full bg-[#452a72]  text-white  hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                        type="submit"
                                        disabled={!otp}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default VerifyOtp;

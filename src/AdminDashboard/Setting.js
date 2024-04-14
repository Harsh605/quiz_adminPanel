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

function Setting() {
    const navigate = useNavigate();

    const [setting, setSetting] = useState({});

    const settingGet = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/setting`, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                setSetting(data.data.data.setting)
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    const settingEdit = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const form = new FormData();
            if (setting?.logo)
                form.append('logo', setting?.logo)
            if (setting?.ad1)
                form.append('ad1', setting?.ad1)
            if (setting?.ad2)
                form.append('ad2', setting?.ad2)
            if (setting?.ad3)
                form.append('ad3', setting?.ad3)
            if (setting?.ad4)
                form.append('ad4', setting?.ad4)
            if (setting?.whatsappLink)
                form.append('whatsappLink', setting?.whatsappLink)
            if (setting?.telegramLink)
                form.append('telegramLink', setting?.telegramLink)
            if (setting?.youtubeLink)
                form.append('youtubeLink', setting?.youtubeLink)
            if (setting?.email)
                form.append('email', setting?.email)
            if (setting?.playVideoLink)
                form.append('playVideoLink', setting?.playVideoLink)
            if (setting?.playImageLink)
                form.append('playImageLink', setting?.playImageLink)
            if (setting?.playText)
                form.append('playText', setting?.playText)
            if (setting?.aboutUs)
                form.append('aboutUs', setting?.aboutUs)
            if (setting?.termsAndCondition)
                form.append('termsAndCondition', setting?.termsAndCondition)
            if (setting?.privacyPolicy)
                form.append('privacyPolicy', setting?.privacyPolicy)
            if (setting?.refundCancellation)
                form.append('refundCancellation', setting?.refundCancellation)
            if (setting?.questionTiming)
                form.append('questionTiming', setting?.questionTiming)
            if (setting?.nextQuestionTiming)
                form.append('nextQuestionTiming', setting?.nextQuestionTiming)
            if (setting?.quizTiming)
                form.append('quizTiming', setting?.quizTiming)
            if (setting?.rightQuestionMarks)
                form.append('rightQuestionMarks', setting?.rightQuestionMarks)
            if (setting?.wrongQuestionMarks)
                form.append('wrongQuestionMarks', setting?.wrongQuestionMarks)
            if (setting?.quizInstruction)
                form.append('quizInstruction', setting?.quizInstruction)
            if (setting?.referralPoints)
                form.append('referralPoints', setting?.referralPoints)
            if (setting?.minimumWithdraw)
                form.append('minimumWithdraw', setting?.minimumWithdraw)
            if (setting?.playStoreLink)
                form.append('playStoreLink', setting?.playStoreLink)
            if (setting?.withdrawCommission)
                form.append('withdrawCommission', setting?.withdrawCommission)
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/admin/setting`, form, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                settingGet()
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

    const handleProfile = (e) => setSetting({ ...setting, [e.target.name]: e.target.value })

    useEffect(() => {
        settingGet()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        settingEdit()
        // Perform submit logic or API call here
    };

    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow py-7">
                                <div className="px-7">
                                    <form onSubmit={handleSubmit}>
                                        <p className="text-xl font-bold leading-tight text-gray-800">
                                            Setting
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-4 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Logo
                                                </p>
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['logo']: e.target.files[0] })}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Ad 1
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['ad1']: e.target.files[0] })}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Ad 2
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['ad2']: e.target.files[0] })}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Ad 3
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['ad3']: e.target.files[0] })}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Upload Ad 4
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['ad4']: e.target.files[0] })}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Whatsapp Link
                                                </p>
                                                <input
                                                    type="url"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.whatsappLink}
                                                    name="whatsappLink"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Telegram Link
                                                </p>
                                                <input
                                                    type="url"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.telegramLink}
                                                    name="telegramLink"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Youtube Link
                                                </p>
                                                <input
                                                    type="url"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.youtubeLink}
                                                    name="youtubeLink"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    PlayStore Link
                                                </p>
                                                <input
                                                    type="url"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.playStoreLink}
                                                    name="playStoreLink"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Email Address
                                                </p>
                                                <input
                                                    type="email"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.email}
                                                    name="email"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    How to Play Video Link
                                                </p>
                                                <input
                                                    accept="video/*"
                                                    type="file"
                                                    name="playVideoLink"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['playVideoLink']: e.target.files[0] })}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    How to Play Image On Video
                                                </p>
                                                <input
                                                    // accept="video/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-2 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    onChange={(e) => setSetting({ ...setting, ['playImageLink']: e.target.files[0] })}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-3 border mt-2" style={{ paddingBottom: '54px' }}>
                                            {/* <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    How to Play Text
                                                </p>
                                                <textarea
                                                    rows={4}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.playText}
                                                    name="playText"
                                                    onChange={(e) => setSetting({ ...setting, playText: e })}
                                                />
                                             
                                            </div> */}
                                            <div>
                                                <p className="text-base mt-14 font-medium leading-none text-gray-800">
                                                    About Us
                                                </p>
                                                <textarea
                                                    rows={4}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.aboutUs}
                                                    name="aboutUs"
                                                    onChange={(e) => setSetting({ ...setting, aboutUs: e.target.value })}
                                                />
                                                {/* <ReactQuill
                                                    // theme="bubble" // Specify the theme ('snow' or 'bubble')
                                                    className="w-full mt-4 mb-13  rounded outline-none focus:bg-gray-50"
                                                    style={{ color: 'black!important' }}
                                                    value={setting?.aboutUs}
                                                    onChange={(e) => setSetting({ ...setting, aboutUs: e })}
                                                /> */}
                                            </div>
                                            <div>
                                                <p className="text-base mt-14 font-medium leading-none text-gray-800">
                                                    Terms and Condition
                                                </p>
                                                <textarea
                                                    rows={4}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.termsAndCondition}
                                                    style={{ color: 'black!important' }}
                                                    name="aboutUs"
                                                    onChange={(e) => setSetting({ ...setting, termsAndCondition: e.target.value })}
                                                />
                                                {/* <ReactQuill
                                                    // theme="bubble" // Specify the theme ('snow' or 'bubble')
                                                    className="w-full mt-4 mb-13  rounded outline-none focus:bg-gray-50"
                                                    style={{ color: 'black!important' }}
                                                    value={setting?.termsAndCondition}
                                                    onChange={(e) => setSetting({ ...setting, termsAndCondition: e })}
                                                /> */}
                                            </div>
                                            <div>
                                                <p className="text-base mt-14 font-medium leading-none text-gray-800">
                                                    Privacy Policy
                                                </p>
                                                <textarea
                                                    rows={4}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.privacyPolicy}
                                                    name="aboutUs"
                                                    onChange={(e) => setSetting({ ...setting, privacyPolicy: e.target.value })}
                                                    
                                                />
                                                {/* <ReactQuill
                                                    // theme="bubble" // Specify the theme ('snow' or 'bubble')
                                                    className="w-full mt-4 mb-13 rounded outline-none focus:bg-gray-50"
                                                    style={{ color: 'black!important' }}
                                                    value={setting?.privacyPolicy}
                                                    onChange={(e) => setSetting({ ...setting, privacyPolicy: e })}
                                                /> */}
                                            </div>
                                            <div>
                                                <p className="text-base mt-14 font-medium leading-none text-gray-800">
                                                    Refund and Cancellation
                                                </p>
                                                <textarea
                                                    rows={4}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.refundCancellation}
                                                    name="aboutUs"
                                                    onChange={(e) => setSetting({ ...setting, refundCancellation: e.target.value })}
                                                />
                                                {/* <ReactQuill
                                                    // theme="bubble" // Specify the theme ('snow' or 'bubble')
                                                    className="w-full mt-4 mb-13  rounded outline-none focus:bg-gray-50"
                                                    style={{ color: 'black!important' }}
                                                    value={setting?.refundCancellation}
                                                    onChange={(e) => setSetting({ ...setting, refundCancellation: e })}
                                                /> */}
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-2 mb-3 lg:flex-row lg:justify-start md:justify-start gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                // onClick={() => settingEdit()}
                                                style={{ height: '40px' }}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-3 text-white  lg:max-w-[100px] w-full "
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <hr />
                                        <p className="text-xl font-bold leading-tight text-gray-800 mt-5">
                                            Quiz Exam Setting
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-4 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Question Timing(in seconds)
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.questionTiming}
                                                    name="questionTiming"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Next Question Timing(in seconds)
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.nextQuestionTiming}
                                                    name="nextQuestionTiming"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Quiz Timing(in minutes)
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.quizTiming}
                                                    name="quizTiming"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Right Question Marks
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.rightQuestionMarks}
                                                    name="rightQuestionMarks"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Wrong Question Marks
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.wrongQuestionMarks}
                                                    name="wrongQuestionMarks"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>

                                        </div>

                                        {/* <div className="p-3 border mt-2 mb-4" style={{ paddingBottom: '54px' }}>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Quiz Instruction
                                                </p>
                                                <textarea
                                                    rows={4}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.quizInstruction}
                                                    name="aboutUs"
                                                    onChange={(e) => setSetting({ ...setting, quizInstruction: e })}
                                                />
                                               
                                            </div>
                                        </div> */}

                                        <div className="flex flex-col mt-1 mb-3 flex-wrap items-center justify-center w-full px-2 lg:flex-row lg:justify-start md:justify-start gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                // onClick={() => settingEdit()}
                                                style={{ height: '40px' }}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-3 text-white  lg:max-w-[100px] w-full "
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <hr />
                                        <p className="text-xl font-bold leading-tight text-gray-800 mt-5">
                                            Other Setting
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-4 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Referral Points
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.referralPoints}
                                                    name="referralPoints"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Minimum Withdraw
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.minimumWithdraw}
                                                    name="minimumWithdraw"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Withdraw Commission
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={setting?.withdrawCommission}
                                                    name="withdrawCommission"
                                                    onChange={(e) => handleProfile(e)}
                                                />
                                            </div>

                                        </div>

                                        <div className="flex flex-col mt-1 flex-wrap items-center justify-center w-full px-2 lg:flex-row lg:justify-start md:justify-start gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                // onClick={() => settingEdit()}
                                                style={{ height: '40px' }}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-3 text-white  lg:max-w-[100px] w-full "
                                            >
                                                Submit
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

export default Setting;

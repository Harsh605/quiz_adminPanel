import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TextEditor from "../Pages/Text";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleUnAuthorized } from "../hook/handleUnauthorized";
import { set } from "lodash";

function CreateQuiz() {
    const navigate = useNavigate();
    const [quizDetail, setQuizDetail] = useState({
        quizNameInEnglish: '',
        quizNameInHindi: '',
        entranceAmount: '',
        startDateTime: '',
        endDateTime: '',
        noOfQuestion: 1,
        noOfParticipation: '',
        noOfPrice: '',
        pricePool: '',
    })

    const [questionArray, setQuestionArray] = useState([{
        questionInEnglish: '',
        questionInHindi: '',
        answer: null,
        option1Eng: '',
        option2Eng: '',
        option3Eng: '',
        option4Eng: '',
        option1Hin: '',
        option2Hin: '',
        option3Hin: '',
        option4Hin: ''
    }])

    const [poolSetting, setPoolSetting] = useState([
        {
            from: '',
            to: '',
            amount: ''
        }
    ])

    const handleChange = (e) => setQuizDetail({ ...quizDetail, [e.target.name]: e.target.value })
    const handleChangeQuestion = (e, index) => {
        const questionArrayOne = [...questionArray];
        questionArrayOne[index][e.target.name] = e.target.value;
        setQuestionArray(questionArrayOne)
    }
    const handleChangePool = (e, index) => {
        const questionArrayOne = [...poolSetting];
        questionArrayOne[index][e.target.name] = e.target.value;
        setPoolSetting(questionArrayOne)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const adminToken = localStorage.getItem('adminToken') || ''

            const startDateTimeTimestamp = new Date(quizDetail.startDateTime).getTime();
            const payload = {
                ...quizDetail,
                startDateTime: startDateTimeTimestamp,
                questionArray,
                poolSetting: poolSetting
            }
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/admin/addGame`, payload, {
                headers: {
                    Authorization: `${adminToken}`
                }
            });
            console.log("data11", data.data.success)
            if (data.data.success) {
                setQuizDetail({
                    quizNameInEnglish: '',
                    quizNameInHindi: '',
                    entranceAmount: '',
                    startDateTime: '',
                    endDateTime: '',
                    noOfQuestion: 1,
                    noOfParticipation: '',
                    noOfPrice: '',
                    pricePool: '',
                })
                navigate('/admin/quiz')
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
                // handleUnAuthorized(data.data.message, navigate)
            }
        } catch (err) {
            handleUnAuthorized(err.response.data, navigate)
        }

    };

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (!adminToken)
            navigate('/admin-login')
    }, [])

    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="px-2">
                            <div className="bg-white rounded shadow mt-3 py-7">
                                <div className=" px-7">
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
                                        Create Quiz
                                    </p>
                                    <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Quiz Name(In English)*
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={quizDetail.quizNameInEnglish}
                                                name="quizNameInEnglish"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                Set a simple and precise name
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Quiz Name(In Hindi)*
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={quizDetail.quizNameInHindi}
                                                name="quizNameInHindi"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                Set a simple and precise name
                                            </p> */}
                                        </div>

                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                StartDateAndTime
                                            </p>
                                            <input
                                                type="datetime-local"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={quizDetail.startDateTime}
                                                name="startDateTime"
                                                onChange={(e) => { if (e.target.value.length === 10) return; handleChange(e) }}
                                            />
                                        </div>
                                        {/* <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                EndDateTime
                                            </p>
                                            <input
                                                type="datetime-local"
                                                value={quizDetail.endDateTime}
                                                name="endDateTime"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                onChange={(e) => handleChange(e)}
                                            />
                                           
                                        </div> */}
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Entrance Amount
                                            </p>
                                            <input
                                                type="number"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={quizDetail.entranceAmount}
                                                name="entranceAmount"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set Slug that is related to the Post
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                No. of Question
                                            </p>
                                            <input
                                                type="number"
                                                value={quizDetail.noOfQuestion}
                                                name="noOfQuestion"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                onChange={(e) => {
                                                    handleChange(e); if (+e.target.value > 1) {
                                                        let arr = []; for (let i = 0; i < +e.target.value; i++) arr.push({
                                                            questionInEnglish: '',
                                                            questionInHindi: '',
                                                            answer: null,
                                                            option1Eng: '',
                                                            option2Eng: '',
                                                            option3Eng: '',
                                                            option4Eng: '',
                                                            option1Hin: '',
                                                            option2Hin: '',
                                                            option3Hin: '',
                                                            option4Hin: ''
                                                        }); setQuestionArray(arr)
                                                    }
                                                }}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set a high-quality image for your post
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Max No. of Participation
                                            </p>
                                            <input
                                                type="number"
                                                value={quizDetail.noOfParticipation}
                                                name="noOfParticipation"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set a high-quality image for your post
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                No. of Price
                                            </p>
                                            <input
                                                type="number"
                                                value={quizDetail.noOfPrice}
                                                name="noOfPrice"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set a high-quality image for your post
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Total Prize Pool
                                            </p>
                                            <input
                                                type="number"
                                                value={quizDetail.pricePool}
                                                name="pricePool"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set a high-quality image for your post
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Duration(in millisecond)
                                            </p>
                                            <input
                                                type="number"
                                                value={quizDetail.duration}
                                                name="duration"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set a high-quality image for your post
                                            </p> */}
                                        </div>

                                    </div>
                                    <div className="border grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                                        {questionArray?.map((item, index) => (
                                            <>
                                                <div className="border mt-2 p-4">
                                                    <div>
                                                        <p className="text-base font-medium leading-none text-gray-800">
                                                            Q.no {index + 1} (In English*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.questionInEnglish}
                                                            name="questionInEnglish"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Answer*
                                                        </p>
                                                        <input
                                                            type="number"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.answer}
                                                            name="answer"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 1 (In English*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option1Eng}
                                                            name="option1Eng"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 2 (In English*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option2Eng}
                                                            name="option2Eng"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 3 (In English*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option3Eng}
                                                            name="option3Eng"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 4 (In English*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option4Eng}
                                                            name="option4Eng"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="border mt-2 p-4">
                                                    <div>
                                                        <p className="text-base font-medium leading-none text-gray-800">
                                                            Q.no {index + 1} (In Hindi*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.questionInHindi}
                                                            name="questionInHindi"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Answer*
                                                        </p>
                                                        <input
                                                            type="number"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.answer}
                                                            name="answer"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 1 (In Hindi*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option1Hin}
                                                            name="option1Hin"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 2 (In Hindi*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option2Hin}
                                                            name="option2Hin"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 3 (In Hindi*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option3Hin}
                                                            name="option3Hin"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                            Option 4 (In Hindi*)
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                            value={item.option4Hin}
                                                            name="option4Hin"
                                                            onChange={(e) => handleChangeQuestion(e, index)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                </div>
                                <div className="px-7">
                                    <p className="text-xl font-semibold leading-tight text-gray-800 mt-4">
                                        Pool Setting
                                    </p>
                                    <div className="border">
                                        <div className="grid w-full grid-cols-1 pb-5 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-3">
                                            {poolSetting && poolSetting.length > 0 && poolSetting?.map((item, index) => (
                                                <>
                                                    <div className="grid w-full grid-cols-1 pb-5 lg:grid-cols-3 md:grid-cols-1 gap-7">
                                                        <div className="pt-2 pl-4">
                                                            <p className="text-base font-medium leading-none text-gray-800">
                                                                From<span className="text-red-600">*</span>
                                                            </p>
                                                            <input
                                                                type="number"
                                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                                value={item.from}
                                                                name="from"
                                                                onChange={(e) => handleChangePool(e, index)}
                                                            />
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                                To<span className="text-red-600">*</span>
                                                            </p>
                                                            <input
                                                                type="number"
                                                                className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                                value={item.to}
                                                                name="to"
                                                                onChange={(e) => handleChangePool(e, index)}
                                                            />
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="text-base mt-2 font-medium leading-none text-gray-800">
                                                                Total
                                                            </p>
                                                            <input
                                                                type="number"
                                                                className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                                value={item.amount}
                                                                name="amount"
                                                                onChange={(e) => handleChangePool(e, index)}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div>

                                                    </div>
                                                </>
                                            ))}
                                        </div >
                                        <div className="pl-4 pt-2 pr-4 pb-3 flex items-end">
                                            <button
                                                onClick={() => {
                                                    let sett = [...poolSetting];
                                                    sett.push({
                                                        from: '',
                                                        to: '',
                                                        amount: ''
                                                    })
                                                    setPoolSetting(sett)
                                                }}
                                                className="border-[#01e7a5] rounded bg-[#01e7a5] transform duration-300 ease-in-out text-sm font-medium px-3 py-2 text-white border lg:max-w-[95px] lg:max-h-[45px]  w-full h-[45px]"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                </div>


                                <hr className="h-[1px] bg-gray-100 my-14" />
                                <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                    <button
                                        onClick={() => navigate("/admin/quizDetail.")}
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

export default CreateQuiz;


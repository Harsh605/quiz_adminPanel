
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { DialogHeader, IconButton, MenuItem, Select, Tooltip } from '@material-tailwind/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputLabel, NativeSelect } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/Stop';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SchemeForDropDown, SchemeNameDropDown, handleUnAuthorized } from "../hook/handleUnauthorized";

import { ToastContainer, toast } from 'react-toastify';
import caret from '../Images/caret-down.png'
import className from 'classnames'
import axios from "axios";

function SubAdmin() {
    const navigate = useNavigate()
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [subAdminList, setSubAdminList] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [dayInput, setDayInput] = useState("");
    const [addSubAdmin, setAddSubAdmin] = useState({});
    const [scheme, setScheme] = useState([]);
    // const [classList, setClassList] = useState([]);
    const [search, setSearch] = useState({});
    const [sort, setSort] = useState({ createdAtUpArrow: true })
    const [sortingState, setSortingState] = useState({
        sortBy: 'createdAt',
        sortType: 'desc'
    })

    const handleDltQuestion = (id) => {

    };
    const handleStatusChange = (id) => {

    };
    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    // Array of post data
    const questions = [
    ];

    const toggleAnswerUserVisibility = () => {

    }

    const handleSaveDay = () => {

        setOpenDialog(false);
    };

    const renderAnswers = () => {
        const selectedQuestionData = questions.find((note) => note.id === selectedQuestion);
        if (selectedQuestionData && selectedQuestionData.answers) {
            return selectedQuestionData.answers.map((answer, index) => (
                <div key={index} className="mb-2">
                    Ans {index + 1}. <p>{answer.answer}</p>
                    <p>By: {answer.answerBy} {answer.createdAt}  </p>
                    <Button variant="contained" sx={{ textTransform: "capitalize", letterSpacing: "1px", fontFamily: "sans-serif" }} size="small" onClick={() => toggleAnswerUserVisibility(selectedQuestion, index)}>
                        {answer.showUser === "On" ? 'Visibility Off' : 'Visibility On'}
                    </Button>
                </div>
            ));
        }
        return null;
    };

    const filteredQuestions = questions.filter((cur) => {

        if (startDate && endDate) {
            const questionDate = new Date(cur.createdAt.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$3-$2-$1'));
            const filterStartDate = new Date(startDate);
            const filterEndDate = new Date(endDate);
            return questionDate >= filterStartDate && questionDate <= filterEndDate;
        }
        return true;
    });

    const getSubAdmin = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            let query = {
                sortKey: sortingState.sortBy,
                sortType: sortingState.sortType
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/sub-admin-list`, { params: query, headers: { Authorization: adminToken } });
            if (data.data.success) {
                setSubAdminList(data.data.data.subAdminList)
            } else {
                handleUnAuthorized(data.data.message, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    const handleSort = (e, sortType, state) => {
        setSortingState({ sortBy: e.target.name, sortType })
        setSort({ [state]: true })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!addSubAdmin.name || !addSubAdmin.email || !addSubAdmin.mobileNumber || !addSubAdmin.password) {
            alert("Please fill below details.")
        } else {
            const adminTtoken = localStorage.getItem('adminToken') || '';
            if (adminTtoken) {
                const payload = {
                    type: 'subAdmin',
                    name: addSubAdmin.name,
                    email: addSubAdmin.email,
                    mobile: addSubAdmin.mobileNumber,
                    password: addSubAdmin.password
                }

                const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin-create`, payload, { headers: { Authorization: adminTtoken } });
                if (data.data.success) {
                    setOpenDialog(false)
                    setAddSubAdmin({})
                    getSubAdmin()
                    toast.success(data.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success'
                    });
                } else {
                    handleUnAuthorized(data.data.message, navigate)
                }
                // setUser(jwt_decode(token));
            } else {
                navigate('/login')
                // localStorage.removeItem('token')
            }
            // Proceed with password update
        }
    }

    useEffect(() => {
        getSubAdmin()
    }, [search, sortingState])

    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">SubAdmin</p>
                        <div>


                            <div className="flex items-center space-x-4 mb-4">
                                {/* <SchemeNameDropDown search={search} setSearch={setSearch} /> */}
                                {/* <SchemeForDropDown search={search} setSearch={setSearch} /> */}
                                <button
                                    className="px-3 py-2 mt-3 border rounded-md bg-[#452a72] text-white h-[47px] w-[280px]"
                                    onClick={() => setOpenDialog(true)}
                                >
                                    Add SubAdmin
                                </button>
                                {/* <button
                                    className="px-3 py-2 ml-2 mt-3 border rounded-md bg-[#452a72] text-white h-[47px] w-[280px]"
                                    onClick={() => getDonationListDownloadCSV()}
                                >
                                    Download File
                                </button> */}
                                {/* <button
                                    className="px-3 py-2 border rounded-md bg-[#452a72] text-white"
                                    onClick={() => navigate("add/category")}
                                >
                                    Add Category
                                </button> */}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">S.No.</th>
                                <th className="font-normal text-left pl-12">Name
                                    <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                        <img name='name' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.nameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'nameUpArrow')} />
                                        <img name='name' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.nameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'nameDownArrow')} />
                                    </button>
                                </th>
                                <th className="font-normal text-left pl-12">Email
                                    <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                        <img name='className' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.classNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'classNameUpArrow')} />
                                        <img name='className' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.classNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'classNameDownArrow')} />
                                    </button>
                                </th>
                                <th className="font-normal text-left pl-12">Mobile Number
                                    <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                        <img name='amount' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.amountUpArrow })} onClick={(e) => handleSort(e, 'asc', 'amountUpArrow')} />
                                        <img name='amount' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.amountDownArrow })} onClick={(e) => handleSort(e, 'desc', 'amountDownArrow')} />
                                    </button>
                                </th>
                                <th className="font-normal text-left pl-12">Action</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {subAdminList?.map((cur, index) => (
                                <tr
                                    key={cur.id}
                                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                >


                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {index + 1}
                                        </p>
                                    </td>


                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.name}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.email}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur?.mobile}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            <div className="flex items-center cursor-pointer color-red" style={{color: 'red'}} onClick={() => navigate('/admin/edit-permission', { state: { userId: cur.id } })}>
                                                Edit Permission

                                                {/* <Tooltip content="Edit">
                                                        <IconButton
                                                            variant="text"
                                                            color="blue-gray"
                                                            onClick={() => navigate('/admin/edit-permission', { state: { userId: cur.id } })}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip> */}
                                            </div>                                        </p>
                                    </td>
                                </tr>
                            ))}
                            {subAdminList.length === 0 && (
                                // <tr className="text-center">
                                // Data not found
                                <div className="text-center" style={{ width: '628%', fontWeight: '600', border: '1px solid black' }}>Data not found</div>
                                // </tr>
                            )}
                        </tbody>
                    </table>
                    <Dialog open={isDialogOpen} onClose={handleToggleDialog}>
                        <DialogHeader >
                            Q. {selectedQuestion && questions?.find(note => note.id === selectedQuestion).question}

                        </DialogHeader>
                        <DialogContent>
                            {renderAnswers()}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleToggleDialog}>Close</Button>
                        </DialogActions>


                    </Dialog>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Add SubAdmin</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Enter Name"
                                variant="outlined"
                                value={addSubAdmin.name}
                                onChange={(e) => setAddSubAdmin({ ...addSubAdmin, 'name': e.target.value })}
                                sx={{ marginTop: "10px" }}
                            />
                            <TextField
                                fullWidth
                                label="Enter Email"
                                variant="outlined"
                                type="email"
                                required
                                value={addSubAdmin.email}
                                onChange={(e) => setAddSubAdmin({ ...addSubAdmin, 'email': e.target.value })}
                                sx={{ marginTop: "10px" }}
                            />
                            <TextField
                                fullWidth
                                label="Enter Mobile"
                                variant="outlined"
                                type="text"
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '/^-?\d+(?:\.\d+)?$/g'
                                }}

                                value={addSubAdmin.mobileNumber}
                                onChange={(e) => { if (e.target.value.length >= 11) return; if (/^-?\d+(?:\.\d+)?$/g.test(e.target.value) || e.target.value === '') setAddSubAdmin({ ...addSubAdmin, 'mobileNumber': e.target.value }); }}
                                sx={{ marginY: "10px" }}
                            />
                            <TextField
                                fullWidth
                                label="Enter Password"
                                variant="outlined"
                                type="password"
                                inputProps={{
                                    // inputMode: 'numeric',
                                    // pattern: '/^-?\d+(?:\.\d+)?$/g'
                                }}

                                value={addSubAdmin.password}
                                onChange={(e) => setAddSubAdmin({ ...addSubAdmin, 'password': e.target.value })}
                                sx={{ marginY: "10px" }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)} sx={{ background: "#452a72", color: "#fff" }}>
                                Cancel
                            </Button>
                            <Button onClick={(e) => handleSubmit(e)} sx={{ background: "#452a72", color: "#fff" }}>
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}




export default SubAdmin
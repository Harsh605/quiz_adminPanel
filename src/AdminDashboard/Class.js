
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { DialogHeader, IconButton, Tooltip } from '@material-tailwind/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/Stop';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SchemeForDropDown, SchemeNameDropDown, handleUnAuthorized } from "../hook/handleUnauthorized";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Class() {
  const navigate = useNavigate()
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [classList, setClassList] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [className, setClass] = useState('');

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

  const getClass = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-list`, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        setClassList(data.data.data.classList)
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!className) {
      alert('Please fill class name.')
    } else {
      const adminTtoken = localStorage.getItem('adminToken') || '';
      if (adminTtoken) {
        const payload = {
          className
        }
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-class`, payload, { headers: { Authorization: adminTtoken } });
        if (data.data.success) {
          setClass('')
          getClass()
          setOpenDialog(false)
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
    getClass()
  }, [])

  return (
    <>
      <div className="w-full px-0 md:px-6 py-2">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Class List</p>
            <div>


              <div className="flex items-center space-x-4 mb-4">
                <button
                  className="px-3 py-2 mt-3 border rounded-md bg-[#452a72] text-white h-[47px] w-[180px]"
                  onClick={() => setOpenDialog(true)}
                >
                  Add Class
                </button>

              </div>

            </div>
          </div>
        </div>
        <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-4">S.No.</th>
                <th className="font-normal text-left pl-12">Class Id</th>
                <th className="font-normal text-left pl-12">Class Name</th>
                <th className="font-normal text-left pl-12">Date</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {classList?.map((cur, index) => (
                <tr
                  key={cur.id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >

                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {index+1}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {cur.id}
                    </p>
                  </td>


                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {cur.name}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {cur.createdAt}
                    </p>
                  </td>



                  {/* <td className="px-7 2xl:px-0">

                    <Tooltip content="delete Question">
                      <IconButton variant="text" color="blue-gray" onClick={() => handleDltQuestion(cur.id)}>
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                    {cur.status === "On" ?
                      <Tooltip content="Stop answering">
                        <IconButton variant="text" color="blue-gray" onClick={() => handleStatusChange(cur.id)}>
                          <StopIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                      :
                      <Tooltip content="Continue Answering">
                        <IconButton variant="text" color="blue-gray" onClick={() => handleStatusChange(cur.id)}>
                          <ArrowRightIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                    }
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {classList.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
          No Data Found.
        </div>}
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
            <DialogTitle style={{ height: '5rem', width: '30rem' }}>Add Class</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Enter Class"
                variant="outlined"
                value={className}
                onChange={(e) => setClass(e.target.value)}
                sx={{ marginTop: "10px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} sx={{ background: "#452a72", color: "#fff" }}>
                Cancel
              </Button>
              <Button onClick={(e)=> handleSubmit(e)} sx={{ background: "#452a72", color: "#fff" }}>
                Create Class
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}




export default Class
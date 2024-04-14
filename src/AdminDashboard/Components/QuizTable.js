import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { TrashIcon, UserIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/solid";

import {
  IconButton,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import EditScheme from './EditScheme';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import '../../ComponentCss.css'
import { AnnualIncome2DropDown, CityState2DropDown, Country2DropDown, DatePicker, InputSearch, QuizStatus, ReactPaginateComponent, handleUnAuthorized } from '../../hook/handleUnauthorized';
import moment from 'moment';
import { convertMillisecondsToDateTime } from '../../utils/date';

const QuizTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [noOfPage, setNoOfPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [open2, setOpen2] = useState(false)
  const [user, setUser] = useState([])
  const [item, setItem] = useState({})
  const [edit, setEdit] = useState(false)
  const [search, setSearch] = useState({})
  const [sort, setSort] = useState({ createdAtUpArrow: true })
  const [sortingState, setSortingState] = useState({
    sortBy: 'createdAt',
    sortType: 'desc'
  })
  const navigate = useNavigate();

  const getQuizList = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        page: page,
        _limit: rowsPerPage,
        status: search.quizStatus,
        // endDate: search.endDate,
        keyword: search.keyword,
        // country: search.country,
        // city: search.city,
        // state: search.state,
        // annualIncome: search.annualIncome,
        // sortKey: sortingState.sortBy,
        // sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/quiz-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.allGames)
        setNoOfPage(data.data.data?.totalPages)
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

  const handleChange = async (status, item) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const payload = {
        status: status ? 'active' : 'inactive'
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/change-user-status/${item.id}`, payload, { headers: { Authorization: adminToken } });
      console.log("data.data.message", data)
      if (data.data.success) {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
        // getUser()
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const checkFunctionDate = (start, end) => {
    if (new Date(Date.now(start)) > new Date() && new Date(Date.now(end)) > new Date()) {
      return 'Pending'
    }
    if (new Date(Date.now(start)) < new Date() && new Date(Date.now(end)) > new Date()) {
      return 'Running'
    }
    if (new Date(Date.now(start)) < new Date() && new Date(Date.now(end)) < new Date()) {
      return 'Completed'
    }
  }

  useEffect(() => {
    getQuizList()
  }, [page, search, sortingState])
  console.log(user)
  return (
    <>
      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-0 flex justify-end">
          <InputSearch search={search} setSearch={setSearch} msg={"Search name"} />
          <QuizStatus search={search} setSearch={setSearch} msg={"Select status"} />
          {/* <DatePicker search={search} setSearch={setSearch} />
          <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Annual Income"} /> */}
        </div>
        <div className="mb-4 flex justify-end">
          {/* <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} /> */}
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-4">
                Quiz Name
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='name' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarNameUpArrow')} />
                  <img name='name' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarNameDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Quiz Amount
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Quiz Amount after discount
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='mobile' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.mobileUpArrow })} onClick={(e) => handleSort(e, 'asc', 'mobileUpArrow')} />
                  <img name='mobile' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.mobileDownArrow })} onClick={(e) => handleSort(e, 'desc', 'mobileDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Maximum Participation
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                  <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Joined Participation(If completed or live)
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                  <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                No of question
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='state' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.stateUpArrow })} onClick={(e) => handleSort(e, 'asc', 'stateUpArrow')} />
                  <img name='state' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.stateDownArrow })} onClick={(e) => handleSort(e, 'desc', 'stateDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Duration
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='country' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.countryUpArrow })} onClick={(e) => handleSort(e, 'asc', 'countryUpArrow')} />
                  <img name='country' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.countryDownArrow })} onClick={(e) => handleSort(e, 'desc', 'countryDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Schedule At
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='country' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.countryUpArrow })} onClick={(e) => handleSort(e, 'asc', 'countryUpArrow')} />
                  <img name='country' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.countryDownArrow })} onClick={(e) => handleSort(e, 'desc', 'countryDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Prize Pool
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='occupation' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.occupationUpArrow })} onClick={(e) => handleSort(e, 'asc', 'occupationUpArrow')} />
                  <img name='occupation' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.occupationDownArrow })} onClick={(e) => handleSort(e, 'desc', 'occupationDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">Commission of Admin
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='designation' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.designationUpArrow })} onClick={(e) => handleSort(e, 'asc', 'designationUpArrow')} />
                  <img name='designation' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.designationDownArrow })} onClick={(e) => handleSort(e, 'desc', 'designationDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Status
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='annualIncome' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.annualIncomeUpArrow })} onClick={(e) => handleSort(e, 'asc', 'annualIncomeUpArrow')} />
                  <img name='annualIncome' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.annualIncomeDownArrow })} onClick={(e) => handleSort(e, 'desc', 'annualIncomeDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">Date&Time
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">Action
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button> */}
              </th>
              {/* <th className="font-normal text-left pl-12">No. of Refferal
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Bank details
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Block/Unblock
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Date
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} />
                </button>
              </th> */}
            </tr>
          </thead>
          <tbody className="w-full">
            {user.map((item, index) => (
              <tr
                key={index}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {index + 1 + (page - 1) * rowsPerPage}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center">
                    <div
                      className="w-30 h-10"
                    >
                      {item?.gameNameInEnglish?.slice(0, 12) || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.pricePool || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.abcd || '0'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.noOfParticipation || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-25 h-10"
                  >
                    {item.joinedUser || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.noOfQuestion || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.duration || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-30 h-10"
                  >
                    {convertMillisecondsToDateTime(item?.schedule) || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.pricePool || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.commission || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.isCompleted===true ? "Completed":"Not-Completed" || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-30 h-10"
                  >
                    {moment(item.createdAt).format('LLL') || 'N/A'}
                  </div>
                </div>
                </td>
                {/* <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-23 h-10"
                    >
                      {item.createdAt || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <label class="switch small">
                        <input type="checkbox" id="toggle" checked={item.status === 'active'} onClick={(e) => handleChange(e.target.checked, item)} style={{ margin: '4px' }} />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </td> */}
                {/* <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.status || 'N/A'}
                    </div>
                  </div>
                </td> */}


                {/* <td className="pl-16">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {member.createdAt}
                  </p>
                </td> 
                <Tooltip content="Delete member">
                <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => handleDltMember(member.id)}
                >
                <ViewfinderCircleIcon className="h-5 w-5" />
                </IconButton>
              </Tooltip>*/}
                <td className="pl-12">
                  <div className="flex" style={{ marginTop: '-1.4rem' }}>
                    <div
                      className="w-10 h-10"
                    >
                      <Tooltip content="All Exams">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => navigate('/admin/joined-user-list', { state: { gameId: item?._id } })}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        {user.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
          No Data Found.
        </div>}

        {/* <div className="flex justify-center mt-5">
          <div className="flex">
            <p className="text-[#452a72] pt-3">Total Pages -</p>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${currentPage === index + 1
                  ? 'bg-[#452a72] text-white'
                  : 'text-[#452a72]'
                  }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div> */}
        <ReactPaginateComponent setPage={setPage} noOfPage={noOfPage} />
      </div>
      <ToastContainer />
    </>
  );
};

export default QuizTable;

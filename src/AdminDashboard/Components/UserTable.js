import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { TrashIcon, UserIcon, EyeIcon, PencilIcon, CurrencyRupeeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import moment from 'moment';

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
import { AnnualIncome2DropDown, CityState2DropDown, Country2DropDown, DatePicker, InputSearch, ReactPaginateComponent, StatusDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const UserTable = () => {
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

  const getUserList = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        page: page,
        _limit: rowsPerPage,
        status: search.status,
        // endDate: search.endDate,
        keyword: search.keyword,
        // country: search.country,
        // city: search.city,
        // state: search.state,
        // annualIncome: search.annualIncome,
        // sortKey: sortingState.sortBy,
        // sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/user-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.allUser)
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
        status: status
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change-user-status/${item?._id}`, payload, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
        getUserList()
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  useEffect(() => {
    getUserList()
  }, [page, search, sortingState])
  return (
    <>
      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-0 flex justify-end">
          {/* <DatePicker search={search} setSearch={setSearch} /> */}
          <StatusDropDown search={search} setSearch={setSearch} />
          <InputSearch search={search} setSearch={setSearch} msg={"Search name, email, mobile, id"} />
          {/* <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Annual Income"} /> */}
        </div>
        <div className="mb-4 flex justify-end">
          {/* <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} /> */}
        </div>
        <hr style={{ height: '2px', backgroundColor: 'black' }} />
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-4">
                User Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Registration ID
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                 
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Mobile No.
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Email Id
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                City
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                State
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Country
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Total No. of Quiz
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">Winning Amount
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Referral Amount
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">Total Winning Wallet Amount
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">Wallet Balance
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">No. of Refferal
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              {/* <th className="font-normal text-left pl-12">Bank details
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button>
              </th> */}
              <th className="font-normal text-left pl-12">Status
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  {/* <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} /> */}
                </button>
              </th>
              <th className="font-normal text-left pl-12">Date
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                </button>
              </th>
              <th className="font-normal text-left pl-12">Action
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  {/* <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} /> */}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {user && user?.length > 0 && user?.map((item, index) => (
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
                <td className="pl-4">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item?.name?.slice(0, 14) || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item?.id || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item?.mobile || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-25 h-10"
                  >
                    {item?.email || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item?.city || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item?.state || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item?.country || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.occupation || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item?.winBalance || '0'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item?.ref_amount || '0'}
                  </div>
                </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-23 h-10"
                    >
                      {(item?.winBalance && item?.withdraw) ? item?.winBalance - item?.withdraw : '0'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-23 h-10"
                    >
                      {item.balance || '0'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-23 h-10"
                    >
                      {item.refferal || '0'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <label class="switch small">
                        <input type="checkbox" id="toggle" checked={item?.status} onClick={(e) => handleChange(e.target.checked, item)} style={{ margin: '4px' }} />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-23 h-10"
                    >
                      {moment(item.createdAt).format('LLL') || 'N/Á'}
                    </div>
                  </div>
                </td>
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
                  <div className="flex" style={{ marginTop: '-1.4rem ' }}>
                    <div
                      className="w-10 h-10"
                    >
                      <Tooltip content="All Exams">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => navigate('/admin/exams-list', { state: { userId: item?._id } })}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div
                      className="w-10 h-10"
                    >
                      <Tooltip content="All Transactions">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => navigate('/admin/transactions-list', { state: { userId: item?._id } })}
                        >
                          <CurrencyRupeeIcon className="h-5 w-5" />
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

export default UserTable;

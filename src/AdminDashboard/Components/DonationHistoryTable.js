import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

import { TrashIcon, UserIcon, EyeIcon } from "@heroicons/react/24/solid";

import caret from '../../Images/caret-down.png'
import className from 'classnames'

import {
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import EditClass from './EditClass';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { DatePicker, InputSearch, SchemeDropDown, SchemeForDropDown, SchemeNameDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const DonationHistoryTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [open2, setOpen2] = useState(false)
  const [donationList, setDonationList] = useState([])
  const [item, setItem] = useState({})
  const [search, setSearch] = useState({})
  const [edit, setEdit] = useState(false)
  const [sort, setSort] = useState({ createdAtUpArrow: true})
  const [sortingState, setSortingState] = useState({
    sortBy: 'createdAt',
    sortType: 'desc'
  })
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const handleMakeAdmin = (data) => {
    // Handle making member admin
    setEdit(true)
    setItem(data)
    setOpen2(true)
  };

  const handleSort = (e, sortType, state) => {
    setSortingState({ sortBy: e.target.name, sortType })
    setSort({ [state]: true })
  }

  const handleDltMember = (id) => {
    // Handle deleting member
  };
  const members = []
  const getDonationList = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        startDate: search.startDate,
        endDate: search.endDate,
        keyword: search.keyword,
        schemeName: search.schemeName,
        schemeFor: search.schemeFor,
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-donation-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setDonationList(data.data.data.donationList)
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
    getDonationList()
  }, [search, sortingState])

  return (
    <>
      <div className="bg-white shadow px-0 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-4 flex justify-end">
          <DatePicker search={search} setSearch={setSearch} />
          <InputSearch search={search} setSearch={setSearch} msg={"Search Donar..."} />
          <SchemeNameDropDown search={search} setSearch={setSearch} />
          {/* <SchemeForDropDown search={search} setSearch={setSearch} /> */}
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">
                S.No.
              </th>
              <th className="font-normal text-left pl-4">
                Donor Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarName' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarNameUpArrow')} />
                  <img name='donarName' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Donor ID
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Date
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Scheme Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='schemeName' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.schemeNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'schemeNameUpArrow')} />
                  <img name='schemeName' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.schemeNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'schemeNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">
                Class
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='classId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.classIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'classIdUpArrow')} />
                  <img name='classId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.classIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'classIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">
                Amount ( per Student/ Month.)
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='amount' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.amountUpArrow })} onClick={(e) => handleSort(e, 'asc', 'amountUpArrow')} />
                  <img name='amount' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.amountDownArrow })} onClick={(e) => handleSort(e, 'desc', 'amountDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">
                Duration
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='duration' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.durationUpArrow })} onClick={(e) => handleSort(e, 'asc', 'durationUpArrow')} />
                  <img name='duration' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.durationDownArrow })} onClick={(e) => handleSort(e, 'desc', 'durationDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16"
              >No. of Students
               <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='noOfStudent' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.noOfStudentUpArrow })} onClick={(e) => handleSort(e, 'asc', 'noOfStudentUpArrow')} />
                  <img name='noOfStudent' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.noOfStudentDownArrow })} onClick={(e) => handleSort(e, 'desc', 'noOfStudentDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">
                Total Donation Amount
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='totalAmount' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.totalAmountUpArrow })} onClick={(e) => handleSort(e, 'asc', 'totalAmountUpArrow')} />
                  <img name='totalAmount' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.totalAmountDownArrow })} onClick={(e) => handleSort(e, 'desc', 'totalAmountDownArrow')} />
                </button>
                </th>
              <th className="font-normal text-left pl-16">
                Payment reference id
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='paymentReferenceId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.paymentReferenceIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'paymentReferenceIdUpArrow')} />
                  <img name='paymentReferenceId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.paymentReferenceIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'paymentReferenceIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Download 80G tax Certificate</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {donationList.map((item, index) => (
              <tr
                key={index}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.donarName}
                    </div>
                  </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.donarId}
                  </div>
                </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-25 h-10"
                    >
                      {item.createdAt}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.schemeName}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.classId}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10" style={{ marginLeft: '6rem' }}
                    >
                      {item.amount}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.duration}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.noOfStudent}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10" style={{ marginLeft: '2rem' }}
                    >
                      {item.totalAmount}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10" style={{ marginLeft: '4rem' }}
                    >
                      {item.paymentReferenceId}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10" style={{ marginLeft: '3rem' }}
                    >
                      {item.noOfStudent}
                    </div>
                  </div>
                </td>

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
                {/* <td className="pl-7 2xl:px- 0 ml-5">
                  <Tooltip content="Edit">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => handleMakeAdmin(item)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {donationList.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
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
      </div>
    </>
  );
};

export default DonationHistoryTable;

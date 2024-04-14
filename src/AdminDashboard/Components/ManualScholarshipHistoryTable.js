import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { useNavigate } from 'react-router-dom';

import { TrashIcon, UserIcon, EyeIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

import {
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import ViewScholarship from './ViewScholarship';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import { AnnualIncome2DropDown, CityState2DropDown, InputSearch, PercentageDropDown, StatusDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const ManualScholarshipHistoryTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [open2, setOpen2] = useState(false)
  const [user, setUser] = useState([])
  const [item, setItem] = useState({})
  const [view, setView] = useState(false)
  const [search, setSearch] = useState({})
  const [sort, setSort] = useState({ createdAtUpArrow: true })
  const [sortingState, setSortingState] = useState({
    sortBy: 'createdAt',
    sortType: 'desc'
  })
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const handleMakeAdmin = (data) => {
    // Handle making member admin
    setView(true)
    setItem(data)
    setOpen2(true)
  };

  const handleDltMember = (id) => {
    // Handle deleting member
  };
  const members = []
  const manualScholarshipHistory = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        familyAnnualIncome: search.annualIncome,
        percentage: search.percentage,
        documentStatus: search.status,
        schemeName: search.schemeName,
        keyword: search.keyword,
        city: search.city,
        state: search.state,
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/manual-donation-history`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.studentsList)
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const handleRequest = async (sId, docStatus, status, key) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/change-status-scholarship/${sId}/${docStatus}/${status}`, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
        if (key !== '')
          manualScholarshipHistory()
      } else {
        toast.error(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-error'
        });
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

  useEffect(() => {
    manualScholarshipHistory()
  }, [search, sortingState])

  return (
    <>
      <ViewScholarship open={open2} setOpen={setOpen2} item={item} handleRequest={handleRequest} />
      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-0 flex justify-end">
          <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} />
          <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Higher Class Percentage"} />
          <StatusDropDown search={search} setSearch={setSearch} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />
        </div>
        <div className="mb-4 flex justify-end">
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} />
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-12">Donor Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarName' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarNameUpArrow')} />
                  <img name='donarName' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Donor ID
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='donarId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.donarIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'donarIdUpArrow')} />
                  <img name='donarId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.donarIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'donarIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Scheme Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='schemeName' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.schemeNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'schemeNameUpArrow')} />
                  <img name='schemeName' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.schemeNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'schemeNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Student Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='studentName' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.studentNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'studentNameUpArrow')} />
                  <img name='studentName' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.studentNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'studentNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Student ID
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='studentId' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.studentIdUpArrow })} onClick={(e) => handleSort(e, 'asc', 'studentIdUpArrow')} />
                  <img name='studentId' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.studentIdDownArrow })} onClick={(e) => handleSort(e, 'desc', 'studentIdDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Mobile No.
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='mobile' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.mobileUpArrow })} onClick={(e) => handleSort(e, 'asc', 'mobileUpArrow')} />
                  <img name='mobile' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.mobileDownArrow })} onClick={(e) => handleSort(e, 'desc', 'mobileDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Email Id
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                  <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">City
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                  <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">State
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='state' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.stateUpArrow })} onClick={(e) => handleSort(e, 'asc', 'stateUpArrow')} />
                  <img name='state' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.stateDownArrow })} onClick={(e) => handleSort(e, 'desc', 'stateDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Country
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='country' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.countryUpArrow })} onClick={(e) => handleSort(e, 'asc', 'countryUpArrow')} />
                  <img name='country' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.countryDownArrow })} onClick={(e) => handleSort(e, 'desc', 'countryDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Higher Class Percentage
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='higherClassPercentage' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.higherClassPercentageUpArrow })} onClick={(e) => handleSort(e, 'asc', 'higherClassPercentageUpArrow')} />
                  <img name='higherClassPercentage' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.higherClassPercentageDownArrow })} onClick={(e) => handleSort(e, 'desc', 'higherClassPercentageDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Pursing Class
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='pursuingClass' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.pursuingClassUpArrow })} onClick={(e) => handleSort(e, 'asc', 'pursuingClassUpArrow')} />
                  <img name='pursuingClass' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.pursuingClassDownArrow })} onClick={(e) => handleSort(e, 'desc', 'pursuingClassDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Year
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='year' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.yearUpArrow })} onClick={(e) => handleSort(e, 'asc', 'yearUpArrow')} />
                  <img name='year' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.yearDownArrow })} onClick={(e) => handleSort(e, 'desc', 'yearDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Family Annual Income
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='familyANnualIncome' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.familyANnualIncomeUpArrow })} onClick={(e) => handleSort(e, 'asc', 'familyANnualIncomeUpArrow')} />
                  <img name='familyANnualIncome' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.familyANnualIncomeDownArrow })} onClick={(e) => handleSort(e, 'desc', 'familyANnualIncomeDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Duration
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='duration' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.durationUpArrow })} onClick={(e) => handleSort(e, 'asc', 'durationUpArrow')} />
                  <img name='duration' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.durationDownArrow })} onClick={(e) => handleSort(e, 'desc', 'durationDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Amount
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='amount' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.amountUpArrow })} onClick={(e) => handleSort(e, 'asc', 'amountUpArrow')} />
                  <img name='amount' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.amountDownArrow })} onClick={(e) => handleSort(e, 'desc', 'amountDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Date
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Status</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {user.map((item, index) => (
              <tr
                key={index}
                className="h-16 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
                <td className="pl-4 mt-3 cursor-pointer">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="pl-3">
                  <div className="flex items-center justify-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.donarName}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
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
                      className="w-10 h-10"
                    >
                      {item.schemeName}
                    </div>
                  </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.studentName}
                  </div>
                </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.studentId}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.mobile}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-25 h-10"
                    >
                      {item.email}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.city}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.state}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.country}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.higherClassPercentage}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.pursuingClass}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.year}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-20 h-10"
                    >
                      {item.familyANnualIncome}
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
                      {item.amount}
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
                  <div className="flex items-center justify-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.status}
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
                <td className="pl-14">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* <Tooltip content="View">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleMakeAdmin(item)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> &nbsp;&nbsp;&nbsp; */}
                      {/* <Tooltip content="Accept">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleRequest(item.id, 'verified')}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> &nbsp;&nbsp;&nbsp;
                      <Tooltip content="Reject">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleRequest(item.id, 'rejected')}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> */}
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
      </div>
    </>
  );
};

export default ManualScholarshipHistoryTable;

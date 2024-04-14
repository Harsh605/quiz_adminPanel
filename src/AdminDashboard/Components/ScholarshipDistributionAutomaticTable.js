import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'

import { TrashIcon, UserIcon, EyeIcon } from "@heroicons/react/24/solid";

import {
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import EditScheme from './EditScheme';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AnnualIncome2DropDown, CityState2DropDown, DatePicker, InputSearch, PercentageDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const ScholarshipDistributionAutomaticTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [open2, setOpen2] = useState(false)
  const [user, setUser] = useState([])
  const [classList, setClassList] = useState([])
  const [item, setItem] = useState({})
  const [edit, setEdit] = useState(false)
  const [search, setSearch] = useState({})
  const [totalStudent, setTotalStudent] = useState([])
  const [totalStudentData, setTotalStudentData] = useState(0)
  const [checkedStudent, setCheckedStudent] = useState([])
  const [sort, setSort] = useState({ createdAtUpArrow: true })
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

  const handleDltMember = (id) => {
    // Handle deleting member
  };
  const members = []
  const ScholarshipDistributionAutomatic = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        familyAnnualIncome: search.annualIncome,
        percentage: search.percentage,
        endDate: search.endDate,
        startDate: search.startDate,
        keyword: search.keyword,
        city: search.city,
        state: search.state,
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-eligible-student-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.studentsList)
        setTotalStudent(data.data.data.totalStudentDetail)
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const handleChecked = async (value, id) => {
    const arr = [...checkedStudent];
    if (arr.includes(id.toString())) {
      const i = arr.findIndex(data => data.toString() === id.toString())
      arr.splice(i, 1)
    } else {
      if (totalStudentData > arr.length) {
        arr.push(id.toString())
      } else {
        toast.error(`You only ${totalStudentData} student has donate`, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-error'
        });
      }
    }
    setCheckedStudent(arr)
  }

  const handleSort = (e, sortType, state) => {
    setSortingState({ sortBy: e.target.name, sortType })
    setSort({ [state]: true })
  }

  const handleDonation = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const payload = {
        donationDetail: totalStudent,
        studentList: checkedStudent
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/student-donation-by-admin`, payload, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        ScholarshipDistributionAutomatic()
        setCheckedStudent([])
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
    ScholarshipDistributionAutomatic()
  }, [search, sortingState])

  useEffect(() => {
    if (totalStudent.length) {
      const obj = {
        totalStudent: 0
      };
      totalStudent?.map(data => {
        obj.totalStudent += data.totalStudent;
      })
      setTotalStudentData(obj.totalStudent)
      // setTotalStudentData(1)
    }
  }, [totalStudent])

  return (
    <>
      {/* <EditScheme open={open2} setOpen={setOpen2} getScheme={getScheme} classList={classList} />
      {edit ? <EditScheme open={open2} setOpen={setOpen2} getScheme={getScheme} item={item} classList={classList} />
        : <EditScheme open={open2} setOpen={setOpen2} getScheme={getScheme} classList={classList} />
      } */}
      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-0 flex justify-end">
          {checkedStudent && checkedStudent.length > 0 && <button onClick={() => handleDonation()} style={{ marginTop: '1rem' }} className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-center justify-center px-6 py-3 bg-[#452a72] border border-[#452a72]  focus:outline-none rounded">
            <p className="text-sm font-medium leading-none">Student Donate</p>
          </button>}
          <DatePicker search={search} setSearch={setSearch} />
          {/* <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} /> */}
          <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Higher Class Percentage"} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
        </div>

        <div className="mb-0 flex justify-end">
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} />
          <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />
        </div>

        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-4">Check box</th>
              <th className="font-normal text-left pl-12">Student Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='name' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.nameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'nameUpArrow')} />
                  <img name='name' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.nameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'nameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Student ID
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                  <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} />
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
              <th className="font-normal text-left pl-16">Family Annual Income
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='familyANnualIncome' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.familyANnualIncomeUpArrow })} onClick={(e) => handleSort(e, 'asc', 'familyANnualIncomeUpArrow')} />
                  <img name='familyANnualIncome' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.familyANnualIncomeDownArrow })} onClick={(e) => handleSort(e, 'desc', 'familyANnualIncomeDownArrow')} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {user?.map((post, index) => (
              <tr
                key={post.id}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
                <td className="pl-4">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {index + 1}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={checkedStudent.includes(post.id.toString())}
                      onChange={(e) => handleChecked(e.target.checked, post.id)}
                      className="w-4 h-4 transition duration-300 rounded   focus:outline-none "
                    />
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.name}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.id}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.mobile}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.email}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.city}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.state}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.country}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.higherClassPercentage}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.pursuingClass}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.year}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {post.familyANnualIncome}
                  </p>
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
      <ToastContainer />
    </>
  );
};

export default ScholarshipDistributionAutomaticTable;

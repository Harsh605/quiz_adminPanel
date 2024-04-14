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
import ViewScholarship from './ViewScholarship';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import { InputSearch, StatusDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const DocumentHistoryTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
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
  const getUser = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        documentStatus: search.status,
        keyword: search.keyword,
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-document-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.documentList)
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

  const handleRequest = async (sId, docStatus, status, key) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/change-status-verification/${sId}/${docStatus}/${status}`, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
        if (key !== '')
          getUser()
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

  useEffect(() => {
    getUser()
  }, [search, sortingState])

  return (
    <>
      <ViewScholarship open={open2} setOpen={setOpen2} item={item} handleRequest={handleRequest} />
      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-4 flex justify-end">
          <StatusDropDown search={search} setSearch={setSearch} />
          <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-4">Student Name
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
              <th className="font-normal text-left pl-12">Class
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='className' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.classNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'classNameUpArrow')} />
                  <img name='className' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.classNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'classNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Name of college
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='collegeName' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.collegeNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'collegeNameUpArrow')} />
                  <img name='collegeName' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.collegeNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'collegeNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">University
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='university' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.universityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'universityUpArrow')} />
                  <img name='university' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.universityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'universityDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Roll No
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='rollNo' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.rollNoUpArrow })} onClick={(e) => handleSort(e, 'asc', 'rollNoUpArrow')} />
                  <img name='rollNo' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.rollNoDownArrow })} onClick={(e) => handleSort(e, 'desc', 'rollNoDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Percantage
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='percentage' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.percentageUpArrow })} onClick={(e) => handleSort(e, 'asc', 'percentageUpArrow')} />
                  <img name='percentage' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.percentageDownArrow })} onClick={(e) => handleSort(e, 'desc', 'percentageDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Document 1</th>
              <th className="font-normal text-left pl-16">Document 2</th>
              <th className="font-normal text-left pl-16">Document 3</th>
              <th className="font-normal text-left pl-16">Document 4</th>
              <th className="font-normal text-left pl-16">Document 5</th>
              <th className="font-normal text-left pl-16">Status</th>
              <th className="font-normal text-left pl-16">Date
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} />
                </button>
              </th>
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
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
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
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.className}
                  </div>
                </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.collegeName}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.university}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.rollNo}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.percentage}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* {item.docOne ? item.docOneStatus : 'N/A'} */}
                      {item.docOne ? <span style={{ padding: "5px", backgroundColor: item.docOneStatus === 'verified' ? 'green' : item.docOneStatus === 'rejected' ? 'red' : 'blue', color: 'white' }}>{item.docOneStatus}</span> : 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* {item.docTwo ? item.docTwoStatus : 'N/A'} */}
                      {item.docTwo ? <span style={{ padding: "5px", backgroundColor: item.docTwoStatus === 'verified' ? 'green' : item.docTwoStatus === 'rejected' ? 'red' : 'blue', color: 'white' }}>{item.docTwoStatus}</span> : 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* {item.docThree ? item.docThreeStatus : 'N/A'} */}
                      {item.docThree ? <span style={{ padding: "5px", backgroundColor: item.docThreeStatus === 'verified' ? 'green' : item.docThreeStatus === 'rejected' ? 'red' : 'blue', color: 'white' }}>{item.docThreeStatus}</span> : 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* {item.docFour ? item.docFourStatus : 'N/A'} */}
                      {item.docFour ? <span style={{ padding: "5px", backgroundColor: item.docFourStatus === 'verified' ? 'green' : item.docFourStatus === 'rejected' ? 'red' : 'blue', color: 'white' }}>{item.docFourStatus}</span> : 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.docFive ? <span style={{ padding: "5px", backgroundColor: item.docFiveStatus === 'verified' ? 'green' : item.docFiveStatus === 'rejected' ? 'red' : 'blue', color: 'white' }}>{item.docFiveStatus}</span> : 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '3rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <span style={{ padding: "5px", backgroundColor: item.status === 'verified' ? 'green' : item.status === 'rejected' ? 'red' : 'blue', color: 'white' }}>{item.status}</span>
                    </div>
                  </div>
                </td>
                <td className="pl-12" style={{ paddingLeft: '5rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-25 h-10"
                    >
                      {item.createdAt}
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
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10" style={{ marginTop: "-1.3rem" }}
                    >
                      <Tooltip content="View">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleMakeAdmin(item)}
                        >
                          <EyeIcon className="h-4 w-4" />
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
      </div>
    </>
  );
};

export default DocumentHistoryTable;

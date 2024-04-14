import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { useNavigate } from 'react-router-dom';

import { TrashIcon, UserIcon, EyeIcon, CheckIcon } from "@heroicons/react/24/solid";

import {
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import AddDocument from './AddDocument';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import { SchemeForDropDown, SchemeNameDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const MasterDocumentTable = ({open, setOpen}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [open2, setOpen2] = useState(false)
  const [donationList, setDonationList] = useState([])
  const [item, setItem] = useState({})
  const [edit, setEdit] = useState(false)
  const [search, setSearch] = useState({})
  const [classList, setClassList] = useState([])
  const [classDocumentList, setClassDocumentList] = useState([])
  const [sort, setSort] = useState({ createdAtUpArrow: true })
  const [sortingState, setSortingState] = useState({
    sortBy: 'createdAt',
    sortType: 'desc'
  })
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const handleMakeAdmin = (data) => {
    // Handle making member admin
    // setItem(data)
    // setOpen2(true)
  };

  const handleDltMember = (id) => {
    // Handle deleting member
  };
  const members = []
  const getUser = async ({ keyword = '' }) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/donation-list-admin?keyword=${keyword}`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setDonationList(data.data.data.donationList)
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setDonationList(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const handleSort = (e, sortType, state) => {
    setSortingState({ sortBy: e.target.name, sortType })
    setSort({ [state]: true })
  }

  const handleRequest = async (item, type, status, userList) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const payload = {
        id: item.id,
        type: type,
        status: status
      }
      if (type === 'auto') {
        payload.user = userList;
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/donation-approve`, payload, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        getUser({ keyword: '' })
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setDonationList(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const getClass = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/all-class-list`, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        setClassList(data.data.data.allClassList)
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const getDocumentClass = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-document-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setClassDocumentList(data.data.data.classDocumentList)
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
    getClass()
    getDocumentClass()
    // getUser({ keyword: searchQuery })
  }, [searchQuery, sortingState])

  return (
    <>
      {open && <AddDocument open={open} setOpen={setOpen} classList={classList} getDocumentClass={getDocumentClass} />}

      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-4 flex justify-end">
          <SchemeNameDropDown search={search} setSearch={setSearch} />
          {/* <SchemeForDropDown search={search} setSearch={setSearch} /> */}
          <button onClick={()=> navigate('/admin/class')} className='px-3 py-2 mt-4 ml-2 border rounded-md bg-[#452a72] text-white h-[47px] w-[160px]'>Class</button>
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-12">Class
              <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='className' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.classNameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'classNameUpArrow')} />
                  <img name='className' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.classNameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'classNameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">No. of Document</th>
              {/* <th className="font-normal text-left pl-12">Document Name</th>
              <th className="font-normal text-left pl-12">Optional or compulsory</th> */}
            </tr>
          </thead>
          <tbody className="w-full">
            {classDocumentList.map((item, index) => (
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
                <td className="pl-12 cursor-pointer">
                  <div className="flex items-center">
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
                      {JSON.parse(item.documents).length}
                    </div>
                  </div>
                </td>
                {/* <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.noOfStudent}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
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
                      className="w-10 h-10"
                    >
                      {item.status}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.createdAt}
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
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* {item.mode === 'manual' ? <Tooltip content="Approve">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          disabled={item.status === 'active'}
                          onClick={() => handleRequest(item, item.mode, 'active')}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> : <Tooltip content="Select Student">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          // style={{ cursor: item.status === 'active' ? 'no-drop' : 'no-drop' }}
                          disabled={item.status === 'active'}
                          onClick={() => handleMakeAdmin(item)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>} */}
                    </div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        {classDocumentList.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
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

export default MasterDocumentTable;

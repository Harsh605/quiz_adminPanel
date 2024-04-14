import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { TrashIcon, UserIcon, EyeIcon } from "@heroicons/react/24/solid";

// import '../../ComponentCss.css'

import {
    IconButton,
    Switch,
    Tooltip,
} from "@material-tailwind/react";
import EditScheme from './EditScheme';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import { AnnualIncome2DropDown, CityState2DropDown, DatePicker, InputSearch, PercentageDropDown, ReactPaginateComponent, ScholarshipRecieveDropDown, StatusDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const SocialMediaTable = () => {
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

    const handleSort = (e, sortType, state) => {
        setSortingState({ sortBy: e.target.name, sortType })
        setSort({ [state]: true })
    }

    const getUser = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            let query = {
                page: page,
                _limit: rowsPerPage,
                // startDate: search.startDate,
                // endDate: search.endDate,
                // keyword: search.keyword,
                // scholarshipRecieveStatus: search.scholarshipRecieveStatus,
                // status: search.status,
                // percentage: search.percentage,
                // city: search.city,
                // state: search.state,
                // annualIncome: search.annualIncome,
                // sortKey: sortingState.sortBy,
                // sortType: sortingState.sortType
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/social-link-list`, { params: query, headers: { Authorization: adminToken } });
            if (data.data.success) {
                setUser(data.data.data.allLink)
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

    const handleChange = async (status, item) => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const payload = {
                status: status ? 'active' : 'inactive'
            }
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/change-user-status/${item.id}`, payload, { headers: { Authorization: adminToken } });
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

    useEffect(() => {
        getUser()
        // }, [search, sortingState])
    }, [page])

    return (
        <>
            <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <div className="mb-0 flex justify-end">
                    {/* <DatePicker search={search} setSearch={setSearch} />
          <InputSearch search={search} setSearch={setSearch} msg={"Student Name"} />
          <StatusDropDown search={search} setSearch={setSearch} />
          <ScholarshipRecieveDropDown search={search} setSearch={setSearch} />
          <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} /> */}
                </div>
                <div className='mb-4 flex justify-end'>
                    {/* <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Percentage"} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} /> */}
                </div>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">S.No.</th>
                            <th className="font-normal text-left pl-12">Name
                                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                                    <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} />
                                </button> */}
                            </th>
                            <th className="font-normal text-left pl-12">Link
                                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                                    <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} />
                                </button> */}
                            </th>
                            <th className="font-normal text-left pl-12">Date&TIme
                                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    <img name='name' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.nameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'nameUpArrow')} />
                                    <img name='name' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.nameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'nameDownArrow')} />
                                </button> */}
                            </th>
                            {/* <th className="font-normal text-left pl-12">Amount
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    <img name='mobile' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.mobileUpArrow })} onClick={(e) => handleSort(e, 'asc', 'mobileUpArrow')} />
                                    <img name='mobile' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.mobileDownArrow })} onClick={(e) => handleSort(e, 'desc', 'mobileDownArrow')} />
                                </button>
                            </th>
                            <th className="font-normal text-left pl-12">Transaction Id
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                                    <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                                </button>
                            </th>
                            <th className="font-normal text-left pl-12">Status
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                                    <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} />
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
                                            className="w-5 h-10"
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
                                            {item.name || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10"
                                        >
                                            {item.link.slice(0, 36) || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10"
                                        >
                                            {item.createdAt || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                {/* <td className="pl-12"><div className="flex items-center">
                                    <div
                                        className="w-25 h-10"
                                    >
                                        {item._id || 'N/A'}
                                    </div>
                                </div>
                                </td>
                                <td className="pl-12"><div className="flex items-center">
                                    <div
                                        className="w-20 h-10"
                                    >
                                        {item.mobile || 'N/A'}
                                    </div>
                                </div>
                                </td>
                                <td className="pl-12"><div className="flex items-center">
                                    <div
                                        className="w-20 h-10"
                                    >
                                        {item.walletBalance || 'N/A'}
                                    </div>
                                </div>
                                </td>
                                <td className="pl-12"><div className="flex items-center">
                                    <div
                                        className="w-20 h-10"
                                    >
                                        {item.country || 'N/A'}
                                    </div>
                                </div>
                                </td> */}

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

export default SocialMediaTable;

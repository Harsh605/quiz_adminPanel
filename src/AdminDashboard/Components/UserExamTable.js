import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import {
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import { FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { ReactPaginateComponent, handleUnAuthorized } from '../../hook/handleUnauthorized';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';

const UserExamTable = () => {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('all'); // Default filter is 'all'
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is 'asc'
    const itemsPerPage = 5;
    const [noOfPage, setNoOfPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([])
    const [search, setSearch] = useState({})
    const navigate = useNavigate()


    const getExamList = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            let query = {
                _limit: rowsPerPage,
                status: search.status,
                // startDate: search.startDate,
                // endDate: search.endDate,
                keyword: search.keyword,
                gameId: location?.state?.gameId,
                // scholarshipRecieveStatus: search.scholarshipRecieveStatus,
                // status: search.status,
                // percentage: search.percentage,
                // city: search.city,
                // state: search.state,
                // annualIncome: search.annualIncome,
                // sortKey: sortingState.sortBy,
                // sortType: sortingState.sortType
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/user-exam-list`, { params: query, headers: { Authorization: adminToken } });
            if (data.data.success) {
                setData(data.data.data.allGames)
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
    // Array of objects representing table rows data

const checkPool = (type = [], status, rank) => {
    let check = type?.filter(item => item.from >= rank && rank >= item.to)
    if(check.length > 0 && status === 0) return <span style={{ color: 'red'}}>-{check[0].amount}</span>
    if(check.length > 0 && status === 1) return <span style={{ color: 'green'}}>+{check[0].amount}</span>
    return '0'
}

    useEffect(() => {
        if (location?.state?.gameId)
            getExamList()
    }, [search, page, location?.state?.gameId])

    return (
        <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <div style={{ rowGap: '20px' }} className="flex justify-center md:justify-between items-center flex-wrap mb-4">
                {/* <div className="flex">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'all' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } rounded-l-md focus:outline-none`}
                        onClick={() => handleFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'pending' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } focus:outline-none`}
                        onClick={() => handleFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'confirm' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } focus:outline-none`}
                        onClick={() => handleFilter('confirm')}
                    >
                        Confirm
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'rejected' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } rounded-r-md focus:outline-none`}
                        onClick={() => handleFilter('rejected')}
                    >
                        Rejected
                    </button>
                </div> */}
                {/* <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Members..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                    />
                    <button
                        className="ml-2 px-4 py-2 text-sm font-medium bg-[#452a72] text-white rounded-md focus:outline-none"
                        onClick={handleSortOrder}
                    >
                        {sortOrder === 'asc' ? 'Latest' : 'Oldest'}
                    </button>
                </div> */}
            </div>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <th className="font-normal text-left pl-4">Sr.no</th>
                        <th className="font-normal text-left pl-12">User Name</th>
                        <th className="font-normal text-left pl-12">Registration No.</th>
                        <th className="font-normal text-left pl-16">Points</th>
                        <th className="font-normal text-left pl-16">Rank</th>
                        <th className="font-normal text-left pl-16">Wining/loss amount</th>
                        <th className="font-normal text-left pl-16">Transaction Id(for joining exam)</th>
                        {/* <th className="font-normal text-left">Action</th> */}
                        <th className="px-7  2xl:px-0"></th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {data && data?.length > 0 && data.map((member, index) => (
                        <tr
                            key={member.id}
                            className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                        >
                            <td className="pl-4 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {index + 1}
                                </p>
                            </td>
                            {/* <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    <Popover>
                                        <PopoverHandler>
                                            <p className='cursor-pointer text-sm font-medium leading-none text-gray-800'> {member?.gameNameInEnglish?.slice(0, 8)}...</p>
                                        </PopoverHandler>
                                        <PopoverContent className="w-72" style={{ fontFamily: "sans-serif", lineHeight: "12px", letterSpacing: "2px" }}>
                                            {member?.gameNameInEnglish}
                                        </PopoverContent>
                                    </Popover>
                                </p>
                            </td> */}
                            <td className="pl-16 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {member?.userDetail?.name}
                                </p>
                            </td>
                            <td className="pl-16 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {member?.userDetail?.id}
                                </p>
                            </td>
                            <td className="pl-16 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {member?.rank || 0}
                                </p>
                            </td>
                            <td className="pl-16 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {member?.amount || 0}
                                </p>
                            </td>
                            <td className="pl-16 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {checkPool(member?.PoolDetail?.pool || [], member?.status, member?.rank) || 0}
                                </p>
                            </td>
                            <td className="pl-16 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {member?.transactionId || 'N/A'}
                                </p>
                            </td>
                            {/* <td className="pl-12">
                                <Popover>
                                    <PopoverHandler>
                                        <p className='cursor-pointer text-sm font-medium leading-none text-gray-800'> {member?.answer?.slice(0, 8)}...</p>
                                    </PopoverHandler>
                                    <PopoverContent className="w-72" style={{ fontFamily: "sans-serif", lineHeight: "12px", letterSpacing: "2px" }}>
                                        {member?.answer}
                                    </PopoverContent>
                                </Popover>
                            </td>

                            <td className="pl-16">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {moment(member.createdAt).format("LLL")}
                                </p>
                            </td> */}
                            {/* <td className="px-7  2xl:px-0">
                                <Tooltip content="Edit">
                                    <IconButton variant="text" color="blue-gray" onClick={() => navigate('/admin/edit-faq', { state: member })}>
                                        <FaPencilAlt className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip> */}
                                {/*  <Tooltip content="Delete member">
                                    <IconButton variant="text" color="blue-gray" onClick={() => handleDltMember(member.id)}>
                                        <TrashIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>*/}
                            {/* </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data && data?.length === 0 &&
                <div className='text-semibold text-center border'>No data found.</div>}
            {/* <div className="flex justify-center mt-5">
                <div className="flex">
                    <p className='text-[#452a72]'>Total Pages -</p>
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
            <ToastContainer />
        </div>
    );
};

export default UserExamTable;

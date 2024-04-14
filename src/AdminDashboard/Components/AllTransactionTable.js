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
import { AnnualIncome2DropDown, ReactPaginateComponent, TransactionStatus, handleUnAuthorized } from '../../hook/handleUnauthorized';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';

const AllTransactionTable = () => {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('');
    const [noOfPage, setNoOfPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('all'); // Default filter is 'all'
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is 'asc'
    const itemsPerPage = 5;
    const [data, setData] = useState([])
    const navigate = useNavigate()


    const getAllTransactionList = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            let query = {
                page: page,
                _limit: rowsPerPage,
                transactionStatus: search.transactionStatus,
                // endDate: search.endDate,
                // keyword: search.keyword,
                // scholarshipRecieveStatus: search.scholarshipRecieveStatus,
                status: search.status,
                // percentage: search.percentage,
                // city: search.city,
                // state: search.state,
                // annualIncome: search.annualIncome,
                // sortKey: sortingState.sortBy,
                // sortType: sortingState.sortType
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/transaction-list/${location?.state?.userId}`, { params: query, headers: { Authorization: adminToken } });
            if (data.data.success) {
                setData(data.data.data.allTransaction)
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
    const checkType = (type, status) => {
        //-1=pending deposit , 0=deposit,1=game ded,2=game won,3=withd,4=pen,5=refund,6=ref,7=bonus
        if (type === 0 && status === 0) {
            return 'Deposit Request(Pending)'
        }
        if (type === 0 && status === 1) {
            return 'Deposit Request(Paid)'
        }
        if (type === 0 && status === 2) {
            return 'Deposit Request(Reject)'
        }
        if (type === 3 && status === 1) {
            return 'Withdraw Request(Pending)'
        }
        if (type === 3 && status === 1) {
            return 'Withdraw Request(Paid)'
        }
        if (type === 3 && status === 2) {
            return 'Withdraw Request(Reject)'
        }
        if (type === 1) {
            return 'Game Deduct'
        }
        if (type === 2) {
            return 'Game Won'
        }
        if (type === 4) {
            return 'Penalty'
        }
        if (type === 5) {
            return 'refund'
        }
        if (type === 6) {
            return 'Refferal'
        }
        if (type === 7) {
            return 'Bonus'
        }
    }

    useEffect(() => {
        if (location?.state?.userId)
            getAllTransactionList()
    }, [page, search, location?.state])

    return (
        <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <div style={{ rowGap: '20px' }} className="flex justify-center md:justify-between items-center flex-wrap mb-4">
                <div className="mb-0 flex justify-end">
                    <TransactionStatus search={search} setSearch={setSearch} msg={"Select Status"} />
                </div>
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
                        <th className="font-normal text-left pl-12">Transaction Id</th>
                        <th className="font-normal text-left pl-12">Type</th>
                        <th className="font-normal text-left pl-12">Amount</th>
                        <th className="font-normal text-left pl-16">Created At</th>
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
                                    {index + 1 + (page - 1) * rowsPerPage}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {/* <Popover> */}
                                    {/* <PopoverHandler> */}
                                    <p className='cursor-pointer text-sm font-medium leading-none text-gray-800'> {member?._id}</p>
                                    {/* </PopoverHandler> */}
                                    {/* <PopoverContent className="w-72" style={{ fontFamily: "sans-serif", lineHeight: "12px", letterSpacing: "2px" }}>
                                            {member?.question}
                                        </PopoverContent> */}
                                    {/* </Popover> */}
                                </p>
                            </td>
                            <td className="pl-12">
                                {/* <Popover>
                                    <PopoverHandler> */}
                                <p className='cursor-pointer text-sm font-medium leading-none text-gray-800'> {checkType(member?.type, member?.status)}</p>
                                {/* </PopoverHandler>
                                    <PopoverContent className="w-72" style={{ fontFamily: "sans-serif", lineHeight: "12px", letterSpacing: "2px" }}>
                                        {member?.answer}
                                    </PopoverContent>
                                </Popover> */}
                            </td>

                            <td className="pl-16">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {member?.amount}
                                </p>
                            </td>
                            <td className="pl-16">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {moment(member.createdAt).format("LLL")}
                                </p>
                            </td>
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

export default AllTransactionTable;

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
import { AnnualIncome2DropDown, CityState2DropDown, DatePicker, InputSearch, PercentageDropDown, ReactPaginateComponent, ScholarshipRecieveDropDown, StatusDropDown, TStatusDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';
import moment from 'moment';
import Swal from 'sweetalert2';

const WithdrawTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [open2, setOpen2] = useState(false)
    const [noOfPage, setNoOfPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
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

    const getWithdrawList = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            let query = {
                page: page,
                _limit: rowsPerPage,
                // startDate: search.startDate,
                // endDate: search.endDate,
                keyword: search.keyword,
                // scholarshipRecieveStatus: search.scholarshipRecieveStatus,
                status: search.status,
                // percentage: search.percentage,
                // city: search.city,
                // state: search.state,
                // annualIncome: search.annualIncome,
                // sortKey: sortingState.sortBy,
                // sortType: sortingState.sortType
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/withdraw-list`, { params: query, headers: { Authorization: adminToken } });
            if (data.data.success) {
                setUser(data.data.data.allWithdraw)
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

    const updateFunction = (type, itemId) => {
        const adminToken = localStorage.getItem('adminToken') || ''
        const headers = {
            Authorization: adminToken
        }
        const confirm = window.confirm(`Are you sure, you want to ${type === 'accept' ? 'approve' : 'reject'} the request?`)
        if (confirm) {

            axios.post(`${process.env.REACT_APP_API_URL}/admin/update-withdraw-request`,
                {
                    type: type,
                    itemId: itemId
                },
                { headers })
                .then((res) => {
                    if (type === 'accept') {
                        Swal.fire({
                            icon: "success",
                            title: "Successfully",
                            text: "Deposit request paid successfully",
                        });
                    }
                    if (type === 'reject') {
                        Swal.fire({
                            icon: "success",
                            title: "Successfully",
                            text: "Deposit request reject successfully",
                        });
                    }
                    getWithdrawList()
                }).catch(err => {
                    console.log("updateFunction error has come", err)
                })
        }
    }

    useEffect(() => {
        getWithdrawList()
    }, [page, search, sortingState])

    return (
        <>
            <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <div className="mb-0 flex justify-end">
                    <InputSearch search={search} setSearch={setSearch} msg={"Search name, id"} />
                    <TStatusDropDown search={search} setSearch={setSearch} />
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
                            <th className="font-normal text-left pl-4">User Name
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                </button>
                            </th>
                            <th className="font-normal text-left 4">User Id
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    {/* <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                                    <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} /> */}
                                </button>
                            </th>
                            <th className="font-normal text-left pl-4">Date&Time
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                </button>
                            </th>
                            <th className="font-normal text-left pl-[30px]">Amount
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                </button>
                            </th>
                            <th className="font-normal text-left 4">Transaction Id
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                </button>
                            </th>
                            <th className="font-normal text-left pl-12">Status
                                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                                    {/* <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                                    <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} /> */}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {user && user?.length > 0 && user.map((item, index) => (
                            <tr
                                key={index}
                                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                            >
                                <td className="pl-4 cursor-pointer">
                                    <div className="flex items-center">
                                        <div
                                            className="w-20 h-10"
                                        >
                                            {index + 1 + (page - 1) * rowsPerPage}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-4">
                                    <div className="flex items-center">
                                        <div
                                            className="w-40 h-10"
                                        >
                                            {item?.userId?.name || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-4">
                                    <div className="flex items-center">
                                        <div
                                            className="w-40 h-10"
                                        >
                                            {item?.userId?.id || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-4">
                                    <div className="flex items-center">
                                        <div
                                            className="w-40 h-10"
                                        >
                                            {moment(item.createdAt).format("LLL") || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-4"><div className="flex items-center pl-8">
                                    <div
                                        className="w-20 h-10"
                                    >
                                        {item.amount || '0'}
                                    </div>
                                </div>
                                </td>
                                <td className="pl-4"><div className="flex items-center">
                                    <div
                                        className="w-50 h-10"
                                    >
                                        {item._id || 'N/A'}
                                    </div>
                                </div>
                                </td>
                                <td style={{ display: 'flex', marginTop: '8px', height: '4rem', paddingLeft: '2rem' }}>
                                    {item.status === 0 && <div className="row">
                                        <div className="col-12 col-lg-1 mt-1">
                                            <button className="btn btn-sm btn-primary" style={{ width: '79px', fontSize: '15px', borderRadius: '5px', height: '30px' }} onClick={() => updateFunction('accept', item?._id)}>Accept</button>
                                        </div>
                                        <div className="col-12 col-lg-1 mt-1">
                                            <button className="btn btn-sm btn-primary" style={{ width: '79px', fontSize: '15px', borderRadius: '5px', height: '30px' }} onClick={() => updateFunction('reject', item?._id)}>Reject</button>
                                        </div>
                                    </div>}
                                    {item.status !== 0 && <div className="col-12 col-lg-1 mt-1">
                                        <button className="btn btn-sm btn-primary" disabled style={{ width: '79px', fontSize: '15px', borderRadius: '5px', height: '30px', color: item.status === 1 ? 'green' : 'red' }}>{item.status === 1 ? 'Paid' : 'Reject'}</button>
                                    </div>}


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

export default WithdrawTable;

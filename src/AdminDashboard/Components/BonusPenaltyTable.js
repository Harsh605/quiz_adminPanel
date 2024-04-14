import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { TrashIcon, UserIcon, EyeIcon } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';
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

const BonusPenaltyTable = () => {
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
  const [type, setType] = useState("")
  const [wallet, setWallet] = useState('')
  const [bonus, setBonus] = useState("")
  const navigate = useNavigate();

  const handleSort = (e, sortType, state) => {
    setSortingState({ sortBy: e.target.name, sortType })
    setSort({ [state]: true })
  }

  const getBonusPenaltyList = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        page: page,
        _limit: rowsPerPage,
        // startDate: search.startDate,
        // endDate: search.endDate,
        keyword: search.keyword,
        // scholarshipRecieveStatus: search.scholarshipRecieveStatus,
        // status: search.status,
        // percentage: search.percentage,
        // city: search.city,
        // state: search.state,
        // annualIncome: search.annualIncome,
        // sortKey: sortingState.sortBy,
        // sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/bonus-penalty-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.allUser?.map(item => {
          item.amount = ''
          item.selectType = ''
          return item
        }))
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

  const update = (id, i) => {
    if (user[i]?.selectType === "") {
      alert("Plz select Type")
      return
    }
    if (user[i].amount === "" || +user[i].amount < 0) {
      alert("Fill amount")
      return
    }
    // if (!wallet) {
    //   alert("Please select Wallet Type.")
    //   return
    // }
    const adminToken = localStorage.getItem('adminToken') || ''
    const headers = {
      Authorization: adminToken
    }
    if (user[i]?.selectType === "bonus") {
      const confirm = window.confirm("Are you sure, you want to add bonus to this user?")
      if (confirm) {

        axios.post(`${process.env.REACT_APP_API_URL}/admin/add-bonus`,
          {
            amount: JSON.parse(user[i].amount),
            userId: id
          },
          { headers })
          .then((res) => {
            const allUser = [...user]
            allUser[i].amount = '';
            allUser[i].selectType = '';
            setUser(allUser)
            Swal.fire({
              icon: "success",
              title: "Successfully",
              text: "Bonus add successfully",
            });
            getBonusPenaltyList()
          })
      }
    } else {
      const confirm2 = window.confirm("Are you sure, you want to add penalty to this user?")
      if (confirm2) {

        axios.post(`${process.env.REACT_APP_API_URL}/admin/add-penalty`,
          {
            amount: JSON.parse(user[i].amount),
            userId: id
          },
          { headers })
          .then((res) => {
            if (res.data.status === 0) {
              const allUser = [...user]
              allUser[i].amount = '';
              allUser[i].selectType = '';
              setUser(allUser)
              Swal.fire({
                icon: "error",
                title: "Penalty",
                text: "Insufficient fund",
              });
              return
            }
            Swal.fire({
              icon: "success",
              title: "Successfully",
              text: "Penalty add successfully",
            });
            getBonusPenaltyList()
          })
      }
    }
  }

  useEffect(() => {
    getBonusPenaltyList()
  }, [page, search, sortingState])

  return (
    <>
      <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-0 flex justify-end">
          <InputSearch search={search} setSearch={setSearch} msg={"Search name, mobile, id"} />
          {/* <DatePicker search={search} setSearch={setSearch} />
          <StatusDropDown search={search} setSearch={setSearch} />
          <ScholarshipRecieveDropDown search={search} setSearch={setSearch} />
          <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} /> */}
        </div>
        <div className='mb-4 flex justify-end'>
          {/* <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Percentage"} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} /> */}
        </div>
        <hr style={{ height: '2px', backgroundColor: 'black' }} />
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left">S.No.</th>
              {/* <th className="font-normal text-left pl-4">User Image
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='name' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.nameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'nameUpArrow')} />
                  <img name='name' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.nameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'nameDownArrow')} />
                </button>
              </th> */}
              <th className="font-normal text-left">User Name
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                  <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left">User Id
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                  <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left">Mobile No.
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='mobile' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.mobileUpArrow })} onClick={(e) => handleSort(e, 'asc', 'mobileUpArrow')} />
                  <img name='mobile' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.mobileDownArrow })} onClick={(e) => handleSort(e, 'desc', 'mobileDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left">Main Wallet Balance
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                  <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left">Action
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                  <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} />
                </button> */}
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {user.map((item, index) => (
              <tr
                key={index}
                role='row'
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
                <td className="cursor-pointer">
                  <div className="flex items-center">
                    <div
                      className="w-5 h-10"
                    >
                      {index + 1 + (page - 1) * rowsPerPage}
                    </div>
                  </div>
                </td>
                {/* <td className="pl-4">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.avatar || 'N/A'}
                    </div>
                  </div>
                </td> */}
                <td className="">
                  <div className="flex items-center">
                    <div
                      className="w-20 h-10"
                    >
                      {item?.name?.slice(0, 13) || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center">
                    <div
                      className="w-20 h-10"
                    >
                      {item?.id || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item?.mobile || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className=""><div className="flex items-center">
                  <div
                    className="w-25 h-10 pl-12"
                  >
                    {item?.balance || 0}
                  </div>
                </div>
                </td>
                <td style={{ display: 'flex', alignItems: 'center', height: '4rem' }}>
                  <div className="row">
                    <div className="col-12 col-lg-3">
                      <input id="number" type="number" value={item?.amount} className="form-control input-sm" style={{ minWidth: '100px' }}
                        placeholder="Amount" onChange={(e) => {
                          const allUser = [...user]
                          allUser[index].amount = e.target.value;
                          setUser(allUser)
                        }} />
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="form-group">
                        <select className="form-control input-sm" name="type" style={{ minWidth: '100px' }} onChange={(e) => {
                          const allUser = [...user]
                          allUser[index].selectType = e.target.value;
                          setUser(allUser)
                        }}>
                          <option value="" disabled selected={item.selectType === ""}>Select</option>
                          <option value="penalty">Penalty</option>
                          <option value="bonus">Bonus</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-12 col-lg-3">
                      <div className="form-group">
                        <select className="form-control input-sm" name="type" style={{ minWidth: '100px' }} onChange={(e) => setWallet(e.target.value)}>
                          <option value="" disabled selected>Select</option>
                          <option value="mainWallet">Game Wallet</option>
                          <option value="wonWallet">Won Wallet</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="col-12 col-lg-1 mt-1">
                      <button className="btn btn-sm btn-primary" style={{ width: '79px', fontSize: '15px', borderRadius: '5px', height: '30px' }} onClick={() => update(item?._id, index)}>UPDATE</button>
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

export default BonusPenaltyTable;

import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { handleUnAuthorized } from '../hook/handleUnauthorized';
import { useNavigate } from 'react-router';
import WithdrawTable from './Components/WithdrawTable';

const AllWithdraw = () => {
  const navigate = useNavigate();
  const getDonationListDownloadCSV = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {

      const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/withdraw-history-csv`, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        const link = document.createElement('a');
        link.href = data.data.data.url;
        link.setAttribute('download', 'withdraw_history.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success(data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
      } else {
        handleUnAuthorized(data.data.message, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }
  return (
    <>
      <div className="w-full px-0 md:px-6 py-2">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">All Withdraw</p>
            
          </div>
        </div>
        <WithdrawTable />
      </div>
      <ToastContainer />
    </>
  )
}

export default AllWithdraw
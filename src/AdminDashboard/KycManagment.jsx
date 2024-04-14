import React from 'react'
import UserTable from "./Components/UserTable";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { handleUnAuthorized } from '../hook/handleUnauthorized';
import { ToastContainer, toast } from 'react-toastify';
import KycTableData from './KYCtableData';

const KycManagment = () => {
  const navigate = useNavigate();
  const getDonationListDownloadCSV = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {

      const data = await axios.get(`${process.env.REACT_APP_API_URL}/admin/user-list-csv`, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        const link = document.createElement('a');
        link.href = data.data.data.url;
        link.setAttribute('download', 'user_list.csv');
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
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">Kyc Managment</p>
            <div>
              {/* <button onClick={() => navigate("/admin/donar/create")} className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-center justify-center px-6 py-3 bg-[#452a72]  border border-[#452a72]  focus:outline-none rounded">
                <p className="text-sm font-medium leading-none">Create New Donar</p>
              </button> */}
              {/* <button
                className="px-3 py-2 ml-3 mt-3 border rounded-md bg-[#452a72] text-white h-[47px] w-[230px]"
                onClick={() => getDonationListDownloadCSV()}
              >
                Download File
              </button> */}
            </div>
          </div>
        </div>
        <KycTableData />
      </div>
      <ToastContainer />
    </>
  )
}

export default KycManagment
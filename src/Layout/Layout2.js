import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../DoctorDashboard/Sidebar.js'
import axios from 'axios'
import { handleUnAuthorized } from '../hook/handleUnauthorized'

const DoctorLayout = ({userData}) => {
    const navigate = useNavigate()
    const [permission, setPermission] = useState({})

    const MyData = () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            axios.get(process.env.REACT_APP_API_URL + `/admin/me`, {
                headers: {
                    Authorization: `${adminToken}`
                }
            }).then(res => {
                if(res?.data?.success === 'deactivated') {
                    handleUnAuthorized(res?.data?.message, navigate)
                    return
                }
                const perm = res?.data?.data?.permission || []
                if (res?.data?.data?.role === "Admin") {
                    setPermission({
                        type: "Admin",
                        dashboard: true,
                        profile: true,
                        quiz: true,
                        winner: true,
                        allUser: true,
                        BonusPenalty: true,
                        correct: true,
                        allDeposit: true,
                        allWithdraw: true,
                        createQuiz: true,
                        setting: true,
                        faqs: true,
                        sendNotification: true,
                        masterScholarshipScheme: true,
                        socialMedia: true,
                        slide: true,
                        kycManagement:true,
                        kycImages:true
                    });
                } else if (res.data.data.type === "subAdmin") {
                    setPermission({
                        usertype: "Agent",
                        userName: res.data.name,
                        dashboard: true,
                        profile: true,
                        donationHistory: perm[0].Status,
                        donar: perm[1].Status,
                        student: perm[2].Status,
                        allAdmin: perm[3].Status,
                        scholarshipDistributionAutomatic: perm[4].Status,
                        manualScholarshipHistory: perm[5].Status,
                        automaticScholarshipHistory: perm[6].Status,
                        documentHistory: perm[7].Status,
                        masterDocument: perm[8].Status,
                        masterScholarshipScheme: perm[9].Status
                    });
                }
            }).catch(err => {
                console.log(err);
                handleUnAuthorized(err.response.data, navigate)
            });
        }

    }

    useEffect(() => {
        MyData()
    }, [])
    return (
        <>
            <Sidebar Outlet={Outlet} userData={userData} permission={permission} />
        </>

    )
}

export default DoctorLayout
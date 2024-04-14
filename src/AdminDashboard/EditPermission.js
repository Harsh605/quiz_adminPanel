
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { DialogHeader, IconButton, MenuItem, Select, Tooltip } from '@material-tailwind/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputLabel, NativeSelect } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/Stop';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SchemeForDropDown, SchemeNameDropDown, handleUnAuthorized } from "../hook/handleUnauthorized";
import { ToastContainer, toast } from 'react-toastify';
import caret from '../Images/caret-down.png'
import className from 'classnames'
import '../editPermission.css'
import axios from "axios";
import { startCase } from "lodash";

function EditPermission() {
    const navigate = useNavigate()
    let location = useLocation();
    let id = location.state.userId;
    const [user, setUser] = useState();
    const [set, setSet] = useState();
    const access_token = localStorage.getItem("adminToken")

    const headers = {
        Authorization: `${access_token}`
    }
    const getUser = () => {
        axios.get(process.env.REACT_APP_API_URL + `/api/sub-admin/${id}`, { headers })
            .then((res) => {
                if (res?.data?.data?.subAdmin?.permission) {
                    console.log("permission", typeof res.data.data.subAdmin.permission, JSON.parse(res.data.data.subAdmin.permission).length)
                    // if (JSON.parse(res?.data?.data?.subAdmin?.permission).length) {
                    JSON.parse(res?.data?.data?.subAdmin?.permission).length > 0 && setSet(true);
                    // }
                }
                setUser(res?.data?.data?.subAdmin)
            }).catch((e) => {
                console.log('e :>> ', e);
                if (e.response.status == 401) {
                    handleUnAuthorized(e.response.data, navigate)
                }
            })
    }
    const grantAccess = () => {
        try {
            axios.patch(process.env.REACT_APP_API_URL + `/api/agent/permission/${id}`, {}, { headers })
                .then((res) => {
                    getUser();
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success'
                    });
                }).catch((e) => {
                    if (e.response.status == 401) {
                        handleUnAuthorized(e.response.data, navigate)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    const giveAccess = (Status) => {
        try {
            axios.post(process.env.REACT_APP_API_URL + `/api/agent/permission/nested/${id}`, {
                Status
            }, { headers })
                .then((res) => {
                    getUser();
                }).catch((e) => {
                    console.log(e, 'e')
                    if (e.response.status == 401) {
                        handleUnAuthorized(e.response.data, navigate)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Edit Permission</p>
                        <div>

                        </div>
                    </div>
                </div>
                <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <div className="row ">
                        <div className="col-12 grid-margin">
                            {user && <div className={`card ${!Boolean(set) && 'text-center bg-gray'}`}>
                                {!Boolean(set) && <button type="button" className="btn btn-success btn-lg" onClick={grantAccess}>Grant Permissions</button>}
                                {Boolean(set) && <div className='card-body'>
                                    <h4 className="card-title">Pages Permission</h4>
                                    <ul className="list-group list-group-flush">
                                        {console.log('user.permission :>> ', JSON.parse(user.permission))}
                                        {JSON.parse(user.permission).map((item, key) =>
                                            <li key={key} className="list-group-item">
                                                <div>
                                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                                        {startCase(item.Permission)}
                                                    </div>
                                                    <div>
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" checked={item.Status} onChange={(e) => giveAccess(item.Permission)} className="custom-control-input" id={item.Permission} />
                                                            <label className="custom-control-label ml-2" style={{ fontWeight: '400' }} htmlFor={item.Permission}>Allow to access</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}




export default EditPermission
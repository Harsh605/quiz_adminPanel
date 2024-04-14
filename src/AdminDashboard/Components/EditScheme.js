import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Input, TextField } from '@mui/material';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { handleUnAuthorized } from '../../hook/handleUnauthorized';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <>
            <DialogTitle sx={{ m: 0, p: 2, color: "#452a72" }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: "#452a72",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        </>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EditClass({ open, setOpen, getScheme, item, classList }) {

    const navigate = useNavigate()

    const [schemeName, setSchemeName] = useState("");
    const [schemeFor, setSchemeFor] = useState("");
    const [amount, setAmount] = useState("");
    const [classId, setClassId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!schemeName || !schemeFor || !amount || !classId) {
            // toast.error('Please fill details.', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     className: 'toast-error'
            // });
            alert("Please fill below details.")
        } else {
            const adminTtoken = localStorage.getItem('adminToken') || '';
            if (adminTtoken) {
                const payload = {
                    name: schemeName,
                    schemeFor: schemeFor,
                    classId: classId,
                    amount: amount,
                    id: item?.id
                }
                let apiName = '';
                if (item?.name)
                    apiName = `${process.env.REACT_APP_API_URL}/api/edit-scheme`
                else
                    apiName = `${process.env.REACT_APP_API_URL}/api/create-scheme`
                const data = await axios.post(apiName, payload, { headers: { Authorization: adminTtoken } });
                if (data.data.success) {
                    setOpen(false)
                    setSchemeName('')
                    setSchemeFor('')
                    setAmount('')
                    setClassId('')
                    getScheme()
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
            // Proceed with password update
        }
    }
    useEffect(() => {
        item?.name && setSchemeName(item?.name)
        item?.classId && setClassId(item?.classId)
        item?.schemeFor && setSchemeFor(item?.schemeFor)
        item?.amount && setAmount(item?.amount)
    }, [item?.name])

    return (
        <>
            <div>
                <BootstrapDialog
                    sx={{ zIndex: "11000" }}
                    onClose={() => setOpen(false)}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                        {item?.name ? "Edit Scheme" : "Create Scheme"}
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <input
                                    placeholder='Scheme Name'
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeName}
                                    onChange={(e) => setSchemeName(e.target.value)}
                                />
                                <input
                                    placeholder='Scheme For'
                                    type="text"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeFor}
                                    onChange={(e) => setSchemeFor(e.target.value)}
                                />
                                <select placeholder='Select Class' onChange={(e) => setClassId(e.target.value)} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                                    <option value="" disabled selected>Select Class</option>
                                    {classList && classList.length > 0 && classList?.map((data, index) => (
                                        <option value={data?.id} selected={classId === data?.id} >{data?.name}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder='Amount'
                                    type="number"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                {item?.name ? "Edit Scheme" : "Create Scheme"}
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}

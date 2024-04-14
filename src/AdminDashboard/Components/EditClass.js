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
import { Password } from '@mui/icons-material';
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

export default function EditClass({ open, setOpen, getClass, item }) {

    const navigate = useNavigate()

    const [className, setClassName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!className) {
            toast.error('Please fill class.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        } else {
            const adminTtoken = localStorage.getItem('adminToken') || '';
            if (adminTtoken) {
                const payload = {
                    className,
                    id: item?.id
                }
                let apiName = '';
                if (item?.name)
                    apiName = `${process.env.REACT_APP_API_URL}/api/edit-class`
                else
                    apiName = `${process.env.REACT_APP_API_URL}/api/create-class`
                const data = await axios.post(apiName, payload, { headers: { Authorization: adminTtoken } });
                if (data.data.success) {
                    setOpen(false)
                    setClassName('')
                    getClass()
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
        item?.name && setClassName(item?.name)
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
                    <BootstrapDialogTitle id="customized-dialog-title" style={{ height: '80px', width: '550px' }} onClose={() => setOpen(false)}>
                        {item?.name ? "Edit Class" : "Create Class"}
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <input
                                    placeholder='Class Name'
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                />
                                {/* <input
                                    placeholder='New Password'
                                    type="password"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                /> */}
                                {/* <inxput
                                    placeholder='Confirm Password'
                                    type="password"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                /> */}
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                {item?.name ? "Edit Class" : "Create Class"}
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}

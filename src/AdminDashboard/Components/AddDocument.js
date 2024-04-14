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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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

export default function AddDocument({ open, setOpen, classList, getDocumentClass }) {

    const navigate = useNavigate()

    const [schemeName, setSchemeName] = useState("");
    const [schemeFor, setSchemeFor] = useState("");
    const [amount, setAmount] = useState("");
    const [classId, setClassId] = useState("");
    const [documentAdd, setDocumentAdd] = useState([{
        isRequired: false,
        name: ''
    }])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!classId) {
            alert('Please select class.')
        } else {
            const adminTtoken = localStorage.getItem('adminToken') || '';
            if (adminTtoken) {
                const payload = {
                    classId: classId,
                    documents: JSON.stringify(documentAdd)
                }
                const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-class-document`, payload, { headers: { Authorization: adminTtoken } });
                if (data.data.success) {
                    setClassId('')
                    setDocumentAdd([{
                        isRequired: false,
                        name: ''
                    }])
                    getDocumentClass()
                    setOpen(false)
                    toast.success(data.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success'
                    });
                } else {
                    handleUnAuthorized(data.data.message, navigate)
                }
                // setUser(jwt_decode(token));
            } else {
                navigate('/admin-login')
                // localStorage.removeItem('token')
            }
            // Proceed with password update
        }
    }



    const handleAdd = (type, index) => {
        const arr = [...documentAdd];
        if (type === 'add') {
            if(index === 4) return
            arr.push({
                isRequired: false,
                name: ''
            })
        } else {
            if(index === 0) return
            arr.splice(index, 1)
        }
        setDocumentAdd(arr)
    }

    const handleChangeText = (type, value, index) => {
        const arr = [...documentAdd];
        if (type === 'text') {
            arr[index].name = value;
        } else {
            arr[index].isRequired = value;
        }
        setDocumentAdd(arr)
    }

    console.log("arr", documentAdd)

    // const handleSelect = (value) => {
    //     const userArr = [...userList];
    //     if (userArr.includes(value.toString())) {
    //         const index = userArr.findIndex(i => i.toString() === value.toString())
    //         userArr.splice(index, 1)
    //     } else {
    //         userArr.push(value.toString())
    //     }
    //     setUserList(userArr)
    // }
    // useEffect(() => {
    //     // StudentList(classId)
    //     // item?.name && setSchemeName(item?.name)
    //     // item?.classId && setClassId(item?.classId)
    //     // item?.schemeFor && setSchemeFor(item?.schemeFor)
    //     // item?.amount && setAmount(item?.amount)
    // }, [item?.name])

    return (
        <>
            <div>
                <BootstrapDialog
                    sx={{ zIndex: "11000" }}
                    onClose={() => setOpen(false)}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)} style={{ width: '37rem' }}>
                        Create Document
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <label style={{ fontWeight: 'bold' }}>
                                    Select Class
                                </label>
                                <select className="w-full p-3 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" onChange={(e) => setClassId(e.target.value)}>
                                    <option selected disabled>Select Class</option>
                                    {classList && classList.length > 0 && classList?.map((data, index) => (
                                        <option value={data.id.toString()}>{data.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontWeight: 'bold' }}>
                                    Document Name <span style={{ marginLeft: '9rem' }}>IsRequired</span>
                                </label>
                                {documentAdd && documentAdd.length && documentAdd.map((data, index) => (
                                    <div style={{ position: 'relative' }}>
                                        <input type='text' placeholder='Enter Document Name' value={data.name} className='w-[270px] p-3 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50' onChange={(e) => handleChangeText('text', e.target.value, index)} />
                                        <input type='checkbox' checked={data.isRequired} style={{ marginLeft: '2rem', width: '1rem', height: '1rem' }} onChange={(e) => handleChangeText('checked', e.target.checked, index)} />
                                        {documentAdd.length - 1 === index && (
                                            <>
                                                <AddIcon style={{ position: 'absolute', top: '1rem', right: '10rem', fontSize: '1.5rem', backgroundColor: 'green', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleAdd('add', index)} />
                                                <RemoveIcon style={{ position: 'absolute', top: '1rem', right: '7rem', fontSize: '1.5rem', backgroundColor: 'red', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleAdd('remove', index)} />
                                            </>
                                        )}

                                    </div>
                                ))}

                            </div>

                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Create
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}

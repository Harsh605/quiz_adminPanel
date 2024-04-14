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

export default function ApplyScheme({ open, setOpen, item, handleRequest }) {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [document, setDocument] = useState([]);
    const status = ['docOneStatus', 'docTwoStatus', 'docThreeStatus', 'docFourStatus', 'docFiveStatus']
    const status2 = ['docOne', 'docTwo', 'docThree', 'docFour', 'docFive']

    const handleApproveReject = (docStatus, status, key = '') => {
        setUser({ ...user, [docStatus]: status })
        handleRequest(item.id, docStatus, status, key)
        if (key !== '')
            setOpen(false)
    }

    useEffect(() => {
        if (Object.keys(item).length > 0) {
            setUser(item)
            setDocument(JSON.parse(item.documents))
        }
    }, [item])

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
                        View Details
                    </BootstrapDialogTitle>
                    <form>
                        <DialogContent dividers className='grid grid-row-2 gap-6'>
                            <div>
                                <label style={{ fontWeight: 'bold' }}>
                                    Class Id
                                </label>
                                <input
                                    placeholder='CLassId'
                                    type="text"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={user.classId}
                                    name='classId'
                                    disabled
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                    Student Name
                                </label>
                                <input
                                    placeholder='Student Name'
                                    type="text"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={user.studentName}
                                    name='studentName'
                                    disabled
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                    College/School Name
                                </label>
                                <input
                                    placeholder='College/School Name'
                                    type="text"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={user.collegeName}
                                    name='collegeName'
                                    disabled
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                    University
                                </label>
                                <input
                                    placeholder='University'
                                    type="text"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={user.university}
                                    name='university'
                                    disabled
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                    Roll no.
                                </label>
                                <input
                                    placeholder='Roll no.'
                                    type="text"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={user.rollNo}
                                    name='rollNo'
                                    disabled
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                Higher Class Percentage
                                </label>
                                <input
                                    placeholder='Percentage'
                                    type="text"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={user.percentage}
                                    name='percentage'
                                    disabled
                                />
                                {document && document.length > 0 && document?.map((data, index) => (
                                    <>
                                        <div className="w-full" style={{ height: '12rem' }}>
                                            <label style={{ fontWeight: 'bold', float: 'left', width: '35rem' }}>
                                                {data.name || `Document${index + 1}`} {user[status[index]] === 'pending' && (
                                                    <>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;<button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'green', fontSize: '15px' }} onClick={() => handleApproveReject(status[index], "verified", document.length-1 === index ? 'last' : '')}>Approve</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'red', fontSize: '15px' }} onClick={() => handleApproveReject(status[index], "rejected", document.length-1 === index ? 'last' : '')}>Reject</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </>
                                                )}
                                            </label>

                                            <img src={user[status2[index]]} alt='Adhar Card Front Image' style={{ height: '10rem', float: 'left', marginTop: '1rem', marginBottom: '1rem' }} />
                                        </div> <br />
                                    </>
                                ))}
                                {/* <div className="w-full" style={{ height: '12rem' }}>
                                    <label style={{ fontWeight: 'bold', float: 'left' }}>
                                        Adhar Card Front {user.docOneStatus === 'pending' && (
                                            <>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'green', fontSize: '15px' }} onClick={() => handleApproveReject('docOneStatus', "verified")}>Approve</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'red', fontSize: '15px' }} onClick={() => handleApproveReject('docOneStatus', "rejected")}>Reject</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </>
                                        )}
                                    </label>

                                    <img src={user.docOne} alt='Adhar Card Front Image' style={{ height: '10rem', float: 'left', marginTop: '1rem', marginBottom: '1rem' }} />
                                </div> <br />
                                <div className="w-full" style={{ height: '12rem' }}>
                                    <label style={{ fontWeight: 'bold', float: 'left' }}>
                                        Adhar Card Back {user.docTwoStatus === 'pending' && (
                                            <>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'green', fontSize: '15px' }} onClick={() => handleApproveReject('docTwoStatus', "verified")}>Approve</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'red', fontSize: '15px' }} onClick={() => handleApproveReject('docTwoStatus', "rejected")}>Reject</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </>
                                        )}
                                    </label>

                                    <img src={user.docTwo} alt='Adhar Card Back Image' style={{ height: '10rem', float: 'left', marginTop: '1rem', marginBottom: '1rem' }} />
                                </div> <br />
                                <div className="w-full" style={{ height: '12rem' }}>
                                    <label for="docThree" style={{ fontWeight: 'bold', float: 'left' }}>
                                        Student Profile Photo {user.docThreeStatus === 'pending' && (
                                            <>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'green', fontSize: '15px' }} onClick={() => handleApproveReject('docThreeStatus', "verified", "last")}>Approve</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button style={{ height: '2rem', width: '6rem', borderRadius: '2px', backgroundColor: 'red', fontSize: '15px' }} onClick={() => handleApproveReject('docThreeStatus', "rejected", "last")}>Reject</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </>
                                        )}
                                    </label>

                                    <img src={user.docThree} alt='Student Profile Photo Image' style={{ height: '10rem', float: 'left', marginTop: '1rem', marginBottom: '1rem' }} />
                                </div> */}
                            </div>

                            {error && <Typography color="red">"New Password and Confirm Password must be the same.</Typography>}
                        </DialogContent>
                        {/* <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Save
                            </button>
                        </DialogActions> */}
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}

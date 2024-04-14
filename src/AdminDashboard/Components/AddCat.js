import React, { useState } from 'react';
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
import { Select, Option } from "@material-tailwind/react";

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
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AddCat({ open, setOpen }) {
    const [category, setCategory] = useState("");
    const [selectedParent, setSelectedParent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    const handleParentSelect = (e) => {
        setSelectedParent(e.target.value);
        console.log("Selected Parent:", e.target.value);
    };

    return (
        <div>
            <BootstrapDialog
                sx={{ zIndex: "11000" }}
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                    Add Category
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers className='grid grid-row-1 gap-6'>
                        <div>
                            <input required placeholder='Category Name' type="text" className="w-full p-3  border border-gray-300 rounded outline-none focus:bg-gray-50" value={category} onChange={(e) => setCategory(e.target.value)} />
                            <div className="w-72 mt-5 relative zIndex-1000">
                                <select
                                    className="w-full p-3 cursor-pointer border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={selectedParent}
                                    onChange={handleParentSelect}
                                >
                                    <option value=""  selected>Select Parent</option>
                                    <option>Cat1</option>
                                    <option>Cat2</option>
                                    <option>Cat3</option>
                                    <option>Cat4</option>
                                </select>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type='submit' className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72]  focus:outline-none">Add</button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}

import React, { useState } from "react";
import { useNavigate } from 'react-router'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';


function AdminInstagram() {
    const navigate = useNavigate()
    const [show, setShow] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dayInput, setDayInput] = useState("");


    const handleDltPost = () => { };

    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleEditPost = (id) => {
        navigate(`${id}/edit`)

    };

    // Array of post data
    const instagramData = [
        {
            id: 1,
            instagramLink: 'Instagram@harsh.insta',
            createdAt: '20/03/23',
            createdBy: "Harsh",
            category: "Category 1"
        },

        // Add more post objects as needed
    ];

    const filteredData = instagramData.filter((item) => {
        const matchesSearch = item.instagramLink.toLowerCase().includes(searchQuery.toLowerCase());

        const createdAtParts = item.createdAt.split('/');
        const createdAtDate = new Date(`20${createdAtParts[2]}`, createdAtParts[1] - 1, createdAtParts[0]);

        const isWithinDateRange = (!startDate || createdAtDate >= new Date(startDate)) &&
            (!endDate || createdAtDate <= new Date(endDate));

        return matchesSearch && isWithinDateRange;
    });
    const handleSaveDay = () => {
        // Implement your logic here for saving the day input
        // For example, you can update the startDate or endDate state with the day input
        // You might need to format the day input as required

        // Close the dialog
        setOpenDialog(false);
    };


    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex  justify-between items-center">
                        {/* <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Instagram</p> */}
                        <div className="flex items-center">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 border rounded-md  "
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 border rounded-md  ml-2"
                            />
                        </div>
                        <div className="flex space-x-4  items-center">


                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-3 py-2 border rounded-md "
                            />
                            <button
                                className="px-3 py-2 border rounded-md bg-[#452a72] text-white"
                                onClick={() => setOpenDialog(true)}
                            >
                                Day Limit
                            </button>
                            <button
                                className="px-3 py-2 border rounded-md bg-[#452a72] text-white"
                                onClick={() =>navigate("add/category")}
                            >
                                Add Category
                            </button>

                        </div>

                    </div>
                </div>
                <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Instagram Link</th>
                                <th className="font-normal text-left pl-12">Creator</th>
                                <th className="font-normal text-left pl-12">Category</th>
                                <th className="font-normal text-left pl-12">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {filteredData.map((cur) => (
                                <tr
                                    key={cur.id}
                                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                >

                                    <td className="pl-4">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.instagramLink}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.createdBy}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.category}
                                        </p>
                                    </td>

                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.createdAt}
                                        </p>
                                    </td>

                                    <td className="px-7 2xl:px-0">
                                        <Tooltip content="Edit Post">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleEditPost(cur.id)}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete Post">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleDltPost(cur.id)}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Add Day Input</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Enter Day"
                                variant="outlined"
                                value={dayInput}
                                onChange={(e) => setDayInput(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)} sx={{background:"#452a72",color:"#fff"}}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveDay} sx={{background:"#452a72",color:"#fff"}}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        </>
    );
}

export default AdminInstagram;


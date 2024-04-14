
import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';


function AdminQuickNotes() {
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [dayInput, setDayInput] = useState("");

    const navigate = useNavigate()


    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const handleDltNote = () => { };

    const handleEditNote = (id) => {
        navigate(`${id}/edit`)

    };
    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    // Array of post data
    const notes = [
        {
            id: 1,
            imageSrc: 'https://cdn.tuk.dev/assets/templates/olympus/projects.png',
            title: 'How to treat himself',
            category: 'Category 1',
            creator: "Harsh",
            status: 'Pending',
            description: 'Heart disease a lorem jasbfasd ashjd ahj sdhjas dhja shjdashjd ahjsdhjas',
            createdAt: '20/03/23'
        },

        // Add more post objects as needed
    ];

    const filteredData = notes.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()) || item.creator.toLowerCase().includes(searchQuery.toLowerCase());


        const createdAtParts = item.createdAt.split('/');
        const createdAtDate = new Date(`20${createdAtParts[2]}`, createdAtParts[1] - 1, createdAtParts[0]);

        const isWithinDateRange = (!startDate || createdAtDate >= new Date(startDate)) &&
            (!endDate || createdAtDate <= new Date(endDate));

        return matchesSearch && isWithinDateRange;
    });

    const handleSaveDay = () => {

        setOpenDialog(false);
    };

    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
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
                                onClick={() => navigate("add/category")}
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
                                <th className="font-normal text-left pl-12">Quick Note</th>
                                <th className="font-normal text-left pl-8">Creator</th>
                                <th className="font-normal text-left pl-8">Category</th>
                                <th className="font-normal text-left pl-12">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {filteredData.map((note) => (
                                <tr
                                    key={note.id}
                                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                >

                                    <td className="px-0 2xl:px-0 mt-4 flex justify-center items-center">
                                        <div className="w-10 h-10 mr-2">
                                            <LazyLoadImage
                                                effect="blur"
                                                width="100%"
                                                height="100%"
                                                className="w-full h-full"
                                                src={note.imageSrc}
                                            />
                                        </div>
                                        <p className="font-medium">{note.description.slice(0, 15)}...</p>
                                        <Tooltip content="View Description">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => {
                                                    setSelectedNote(note.id);
                                                    handleToggleDialog();
                                                }}
                                            >
                                                <InfoIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {note.creator}
                                        </p>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {note.category}
                                        </p>
                                    </td>
                                    
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {note.createdAt}
                                        </p>
                                    </td>

                                    <td className="px-7 2xl:px-0">
                                        <Tooltip content="Edit Post">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleEditNote(note.id)}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete Post">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleDltNote(note.id)}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Dialog open={isDialogOpen} onClose={handleToggleDialog}>
                        <DialogTitle>{selectedNote && notes.find(note => note.id === selectedNote).title}</DialogTitle>
                        <DialogContent>
                            {selectedNote && notes.find(note => note.id === selectedNote).description}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleToggleDialog}>Close</Button>
                        </DialogActions>
                    </Dialog>
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
                            <Button onClick={() => setOpenDialog(false)} sx={{ background: "#452a72", color: "#fff" }}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveDay} sx={{ background: "#452a72", color: "#fff" }}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    );
}

export default AdminQuickNotes;

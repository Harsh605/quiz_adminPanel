import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {  TrashIcon } from "@heroicons/react/24/solid";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import {

    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router';

const AllPosts = () => {
    const [show, setShow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [currentFilter, setCurrentFilter] = useState('all'); // 'all', 'pending', 'confirm', 'rejected'
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;


    const handleDltPost = () => {

    }
    const handleRejectPost = () => {

    }
    const handleConfirmPost = () => {

    }


    // Sample data
    const posts = [
        {
            id: 1,
            title: 'UX Design & Visual Strategy',
            user: 'Harsh@gmail.com',
            status: 'Pending',
            createdAt: '20/03/23',
            updatedAt: '23/03/23',
        },
        {
            id: 4,
            title: 'UX Design & Visual Strategy',
            user: 'Harsh@gmail.com',
            status: 'Pending',
            createdAt: '24/03/23',
            updatedAt: '23/03/23',
        },
        {
            id: 2,
            title: 'UX Design & Visual Strategy',
            user: 'Harsh@gmail.com',
            status: 'Confirm',
            createdAt: '23/03/23',
            updatedAt: '23/03/23',
        },
        {
            id: 3,
            title: 'UX Design & Visual Strategy',
            user: 'Harsh@gmail.com',
            status: 'Rejected',
            createdAt: '24/03/23',
            updatedAt: '23/03/23',
        },
        // ... more sample data ...
    ];

    // Filter and sort posts based on search query, sort order, and current filter
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedPosts = filteredPosts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.createdAt.localeCompare(b.createdAt);
        } else {
            return b.createdAt.localeCompare(a.createdAt);
        }
    });

    let displayedPosts = sortedPosts;
    if (currentFilter !== 'all') {
        displayedPosts = sortedPosts.filter(
            (post) => post.status.toLowerCase() === currentFilter
        );
    }

    // Pagination
    const totalPages = Math.ceil(displayedPosts.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = displayedPosts.slice(startIndex, endIndex);

    const handleFilter = (filter) => {
        setCurrentFilter(filter);
        setCurrentPage(1); // Reset to first page when changing filters
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const navigate = useNavigate()

    return (
        <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <div style={{ rowGap: '20px' }} className="flex justify-center md:justify-between items-center flex-wrap mb-4">
                <div className="flex">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'all' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } rounded-l-md focus:outline-none`}
                        onClick={() => handleFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'pending' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } focus:outline-none`}
                        onClick={() => handleFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'confirm' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } focus:outline-none`}
                        onClick={() => handleFilter('confirm')}
                    >
                        Confirm
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'rejected' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } rounded-r-md focus:outline-none`}
                        onClick={() => handleFilter('rejected')}
                    >
                        Rejected
                    </button>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                    />
                    <button
                        className="ml-2 px-4 py-2 text-sm font-medium bg-[#452a72] text-white rounded-md focus:outline-none"
                        onClick={handleSortOrder}
                    >
                        {sortOrder === 'asc' ? 'Latest' : 'Oldest'}
                    </button>
                </div>
            </div>

            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <th className="font-normal text-left pl-4">Posts</th>
                        <th className="font-normal text-left pl-12">User</th>
                        <th className="font-normal text-left pl-12">Status</th>
                        <th className="font-normal text-left pl-12">Created At</th>
                        <th className="font-normal text-left pl-12">Updated At</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {currentPosts.map((post) => (
                        <tr
                            key={post.id}
                            className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                        >
                            <td className="pl-4 cursor-pointer">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 cursor-pointer" onClick={()=>navigate(`${post.id}`)}>
                                        <LazyLoadImage
                                            effect="blur"
                                            width="100%"
                                            height="100%"
                                            className="w-full h-full"
                                            src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                                        />
                                    </div>
                                    <div className="pl-4">
                                        <p className="font-medium">{post.title}</p>
                                        <p className="text-xs leading-3 text-gray-600 pt-2">
                                            Category
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.user}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.status}
                                </p>
                            </td>
                        
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.createdAt}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">{post.updatedAt}</p>
                            </td>

                            <td className="px-7 2xl:px-0">

                                {post.status === "Pending" ?
                                    (
                                        <>
                                            <Tooltip content="reject Post" >
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleRejectPost(post.id)}>
                                                    <ClearIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Confirm Post">
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleConfirmPost(post.id)}>
                                                    <DoneIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </>

                                    )
                                    : post.status === "Confirm" ?
                                        (
                                            <Tooltip content="delete Post">
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleDltPost(post.id)}>
                                                    <TrashIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>

                                        ) : null
                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-5">
                <div className="flex">
                    <p className='text-[#452a72]'>Total Pages -</p>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${currentPage === index + 1
                                ? 'bg-[#452a72] text-white'
                                : 'text-[#452a72]'
                                }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;

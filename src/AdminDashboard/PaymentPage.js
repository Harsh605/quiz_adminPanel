import React, { useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import img1 from "../Images/Doctors/doctor2.jpeg"

const PaymentPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    const itemsPerPage = 5;

    const handleMakeAdmin = (id) => {
        // Handle making member admin
    };

    const handleDltMember = (id) => {
        // Handle deleting member
    };

    const payments = [
        {
            id: 1,
            image: img1,
            name: "John Doe",
            email: "johndoe@example.com",
            currentPlan: "Pro version 1",
            paypal: "guptah605@paypal",
            paymentId: "Od-37bdssfs",
            createdAt: "25/04/2021",
        },
        {
            id: 2,
            image: img1,
            name: "John Doe",
            email: "johndoe@example.com",
            currentPlan: "Pro version 1",
            paypal: "guptah605@paypal",
            paymentId: "Od-37bdssfs",
            createdAt: "26/04/2021",
        },
        // Add more payment objects as needed
    ];

    // Filter payments based on search query and date range
    const filteredPayments = payments.filter((payment) =>
        payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.currentPlan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paypal.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter((payment) => {
        if (fromDate && toDate) {
            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(toDate);
            const paymentDate = new Date(payment.createdAt.split('/').reverse().join('-'));
            return paymentDate >= fromDateObj && paymentDate <= toDateObj;
        } else {
            return true;
        }
    });

    // Sort payments based on created at in ascending or descending order
    const sortedPayments = filteredPayments.sort((a, b) => {
        const dateA = new Date(
            a.createdAt.split('/').reverse().join('-')
        );
        const dateB = new Date(
            b.createdAt.split('/').reverse().join('-')
        );

        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    // Paginate the sorted payments based on the current page and items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedPayments = sortedPayments.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Calculate total pages
    const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle sort order change
    const handleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="w-full px-0 md:px-6 py-2">
            <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                <div className="sm:flex items-center justify-between">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">Payments</p>
                    <div>
                    </div>
                </div>
            </div>

            <div className="lg:w-[80vw] bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <div style={{ rowGap: '20px' }} className="flex justify-center md:justify-between items-center flex-wrap mb-4">
                    <div className="flex">
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            placeholder="From Date"
                            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-[#bdbdbd] focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            placeholder="To Date"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-[#bdbdbd] focus:ring-[#452a72] focus:border-[#452a72]"
                        />
                    </div>
                    <div className="mb-4 flex justify-end">

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Payments..."
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
                            <th className="font-normal text-left pl-4">User</th>
                            <th className="font-normal text-left pl-12">Current Plan</th>
                            <th className="font-normal text-left pl-12">Paypal</th>
                            <th className="font-normal text-left pl-12">Payment ID</th>
                            <th className="font-normal text-left pl-16">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {paginatedPayments.map((payment) => (
                            <tr
                                key={payment.id}
                                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                            >
                                <td className="pl-4 cursor-pointer">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10"
                                            onClick={() => navigate(`${payment.id}/doctor`)}
                                        >
                                            <LazyLoadImage
                                                effect="blur"
                                                width="100%"
                                                height="100%"
                                                className="w-full h-full"
                                                src={payment.image}
                                            />
                                        </div>
                                        <div className="pl-4">
                                            <p className="font-medium">{payment.name}</p>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">
                                                {payment.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {payment.currentPlan}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {payment.paypal}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {payment.paymentId}
                                    </p>
                                </td>
                                <td className="pl-16">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {payment.createdAt}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-5">
                    <div className="flex">
                        <p className="text-[#452a72]">Total Pages -</p>
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
        </div>
    );
}

export default PaymentPage;

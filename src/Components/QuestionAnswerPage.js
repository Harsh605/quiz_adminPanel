import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router';

const QuestionAnswerPage = ({ userData }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };


    const questions = [
        {
            id: 1,
            question: 'How to treat himself ?',
            category: "category 1",
            status: 'On',
            AskedBy: "Harsh",
            createdAt: '20/03/23',
            answers: [
                {
                    answerBy: "Harsh",
                    answer: "Don't know why are u asking  with different font weights and colors for different parts of the content. Make sure to adjust the colors, margins, and other styles according to your design preferences.",
                    createdAt: '22/03/23',
                    showUser: "On"
                },
                {
                    answerBy: "Priyansh",
                    answer: "Don't know why .",
                    createdAt: '25/03/23',
                    showUser: "Off"
                },

            ]
        },
        {
            id: 2,
            question: 'How to treat himself2 ?',
            category: "category 2",
            status: 'Off',
            AskedBy: "Harsh",
            createdAt: '20/03/23',
            answers: [
                {
                    answerBy: "Harsh",
                    answer: "Don't know why are u asking.",
                    createdAt: '22/03/23',
                    showUser: "On"
                },
                {
                    answerBy: "Priyansh",
                    answer: "Don't know why .",
                    createdAt: '25/03/23',
                    showUser: "Off"
                },

            ]
        },
        {
            id: 3,
            question: 'How to treat himself2 ?',
            category: "category 3",
            status: 'Off',
            AskedBy: "Harsh",
            createdAt: '20/03/23',
            answers: [
                {
                    answerBy: "Harsh",
                    answer: "Don't know why are u asking.",
                    createdAt: '22/03/23',
                    showUser: "On"
                },
                {
                    answerBy: "Priyansh",
                    answer: "Don't know why .",
                    createdAt: '25/03/23',
                    showUser: "Off"
                },

            ]
        },
        {
            id: 4,
            question: 'How to treat himself2 ?',
            category: "category 1",
            status: 'Off',
            AskedBy: "Harsh",
            createdAt: '20/03/23',
            answers: [
                {
                    answerBy: "Harsh",
                    answer: "Don't know why are u asking.",
                    createdAt: '22/03/23',
                    showUser: "On"
                },
                {
                    answerBy: "Priyansh",
                    answer: "Don't know why .",
                    createdAt: '25/03/23',
                    showUser: "Off"
                },

            ]
        },

        // Add more post objects as needed
    ];
    const navigate = useNavigate()

    const filteredQuestions = questions.filter((question) => {
        const matchesSearchQuery = question.question.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || question.category === selectedCategory;
        const matchesDateRange =
            (!startDate || new Date(question.createdAt) >= startDate) &&
            (!endDate || new Date(question.createdAt) <= endDate);

        return matchesSearchQuery && matchesCategory && matchesDateRange;
    });

    // ... Render the filteredQuestions instead of questions in the map functions

    return (

        <div className='px-5 mb-20'>
            <div className='my-10 flex justify-between items-center w-[80%] m-auto'>
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {[...new Set(filteredQuestions.map((cur) => cur.category))].map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-3 py-2 border rounded-md ml-2"
                    />
                </div>
            </div>






            <div className="accordion w-[90%] m-auto">
                <div className='flex sm:flex-row flex-col'>
                    <div className='md:p-10 sm:w-1/2 w-full'>
                        {filteredQuestions?.slice(0, Math.floor(questions.length / 2)).map((cur) => (
                            <div key={cur.id}>
                                <Accordion
                                    sx={{ borderRadius: ".25rem", margin: "5px" }}
                                    expanded={expanded === `panel${cur.id}`}
                                    onChange={handleChange(`panel${cur.id}`)}
                                >
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls={`panel${cur.id}bh-content`}
                                        id={`panel${cur.id}bh-header`}
                                    >
                                        <Typography
                                            className="smallHeading"
                                            sx={{ fontFamily: "Clash Display", fontWeight: "500" }}
                                        >
                                            Q: {cur.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="restContent" sx={{ fontSize: "16px", fontFamily: "Cabin" }}>
                                            {cur.answers.map((curAnswer, index) => (
                                                <div key={index}>{index + 1}. {curAnswer.answer} <span className='' style={{ fontSize: "15px", fontWeight: "600" }}>{curAnswer.answerBy}</span><span>,{curAnswer.createdAt}</span> </div>
                                            ))}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ))}
                    </div>
                    <div className='md:p-10 sm:w-1/2 w-full'>
                        {filteredQuestions?.slice(Math.ceil(questions.length / 2)).map((cur) => (
                            <div key={cur.id}>
                                <Accordion
                                    sx={{ borderRadius: ".25rem", margin: "5px" }}
                                    expanded={expanded === `panel${cur.id}`}
                                    onChange={handleChange(`panel${cur.id}`)}
                                >
                                    <AccordionSummary
                                        expandIcon={<AddIcon />}
                                        aria-controls={`panel${cur.id}bh-content`}
                                        id={`panel${cur.id}bh-header`}
                                    >
                                        <Typography
                                            className="smallHeading"
                                            sx={{ fontFamily: "Clash Display", fontWeight: "500" }}
                                        >
                                            Q: {cur.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="restContent" sx={{ fontSize: "16px", fontFamily: "Cabin" }}>
                                            {cur.answers.map((curAnswer, index) => (
                                                <div key={index}>{index + 1}. {curAnswer.answer} <span className='' style={{ fontSize: "15px", fontWeight: "600" }}>{curAnswer.answerBy}</span><span>,{curAnswer.createdAt}</span> </div>
                                            ))}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {userData && userData.role === "patient" && (
                <div className="fixed-button" onClick={() => navigate("/patient/questions/create")}>
                    Ask Me
                </div>
            )}

        </div>


    );
}

export default QuestionAnswerPage
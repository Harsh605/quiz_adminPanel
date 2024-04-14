import React, { useState, useEffect } from "react";

const Alert = ({ flag, setFlag, errorType, message }) => {
    // const [flag, setFlag] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFlag(false);
        }, 50000);

        return () => clearTimeout(timeout);
    }, []);

    
    return (
        <div>
            <div style={{ zIndex: "10000" }} role="alert" className={flag ? "sm:mr-6 sm:mt-16 sm:mt-6 mb-6 sm:mb-0 top-5  xl:w-5/12 mx-auto absolute left-0 sm:left-auto right-0 sm:top-0 sm:w-6/12 md:w-3/5 justify-between w-11/12 bg-white dark:bg-gray-800 shadow-lg rounded flex sm:flex-row flex-col transition duration-150 ease-in-out translate-show" : "translate-hide"}>
                <div className="flex ">
                    <div className={errorType==="success" ? "sm:px-6 p-0 flex mt-4 sm:mt-0 ml-4 sm:ml-0 items-center justify-center bg-green-400 sm:rounded-tl sm:rounded-bl w-12 h-12 sm:h-auto sm:w-auto text-white" : "sm:px-6 p-0 flex mt-4 sm:mt-0 ml-4 sm:ml-0 items-center justify-center bg-red-400 sm:rounded-tl sm:rounded-bl w-12 h-12 sm:h-auto sm:w-auto text-white"}>
                        {
                            errorType === "success" ?
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="currentColor">
                                        <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                                    </svg>
                                ) :
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="M15 9l-6 6M9 9l6 6" />
                                </svg>
                                

                                )
                        }

                    </div>
                    <div className="flex flex-col justify-center xl:ml-4 pl-4 px-2 xl:pl-1 sm:w-3/5 pt-4 sm:pb-4 pb-2">
                        <p className="text-md text-gray-800 dark:text-gray-100 font-semibold pb-1">Action {errorType}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">{message}</p>
                    </div>

                    <button
                        className="absolute top-2 right-2 sm:right-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setFlag(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path
                                fillRule="evenodd"
                                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <style>
                {`
                .translate-show{
                    transform : translateX(0%);
                }
                .translate-hide{
                    transform : translateX(150%);
                }
                `}
            </style>
        </div>
    );
};

export default Alert;

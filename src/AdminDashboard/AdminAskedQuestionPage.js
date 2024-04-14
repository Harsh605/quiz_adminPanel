import React, { useState } from "react";
import { useNavigate } from 'react-router'
import AddCat from "./Components/AddCat";
import AskedQuestionTable from "./Components/QuestionTable";

function AdminAskedQuestionPage() {
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
   
    return (
        <>
        <AddCat open={open} setOpen={setOpen}/>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">Asked Questions</p>
                        <div>
                            {/* <button  onClick={()=>setOpen(true)} className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-[#452a72]  border border-[#452a72]  focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none">Add Category</p>
                            </button> */}
                        </div>
                    </div>
                </div>
                <AskedQuestionTable/>
            </div>
        </>
    );
}

export default AdminAskedQuestionPage;

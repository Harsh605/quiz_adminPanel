import React, { useState } from 'react';

const Pricing = () => {
    // State variables for inputs and form content
    const [pricingFirstHeading, setPricingFirstHeading] = useState('');
    const [pricingFirstParagraph, setPricingFirstParagraph] = useState('');

    return (
        <>
            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    First Heading
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={pricingFirstHeading}
                        onChange={(e) => setPricingFirstHeading(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Pricing Page 1st heading Content
            </p>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    1st Paragraph Content
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={pricingFirstParagraph}
                        onChange={(e) => setPricingFirstParagraph(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Pricing Page 1st paragraph Content
            </p>
        </>
    );
};

export default Pricing;

import React, { useState } from 'react';

const Home = () => {
    // State variables for inputs and form content
    const [logo, setLogo] = useState('');
    const [heroImage, setHeroImage] = useState('');
    const [firstHeading, setFirstHeading] = useState('');
    const [secondHeading, setSecondHeading] = useState('');
    const [firstParagraph, setFirstParagraph] = useState('');

    return (
        <>
            <div className="pt-6 border-gray-300 mt-2 px-7">
                <div>
                    <p className="text-base font-medium leading-none text-gray-800">
                        Website Logo
                    </p>
                    <input
                        accept="image/*"
                        type="file"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                    />
                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Change Website Logo
                    </p>
                </div>
            </div>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <div>
                    <p className="text-base font-medium leading-none text-gray-800">
                        Hero Image
                    </p>
                    <input
                        accept="image/*"
                        type="file"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        value={heroImage}
                        onChange={(e) => setHeroImage(e.target.value)}
                    />
                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Change Hero image
                    </p>
                </div>
            </div>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    First Heading
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={firstHeading}
                        onChange={(e) => setFirstHeading(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Home Page 1st Welcome Heading Content
            </p>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    Second Heading
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={secondHeading}
                        onChange={(e) => setSecondHeading(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Home Page 2nd heading Content
            </p>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    1st Paragraph Content
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={firstParagraph}
                        onChange={(e) => setFirstParagraph(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Home Page 1st paragraph Content
            </p>
        </>
    );
};

export default Home;

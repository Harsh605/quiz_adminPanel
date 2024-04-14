import React, { useState } from 'react';

const Contact = () => {
  // State variables for inputs and form content
  const [contactFirstHeading, setContactFirstHeading] = useState('');
  const [contactFirstParagraph, setContactFirstParagraph] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

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
            value={contactFirstHeading}
            onChange={(e) => setContactFirstHeading(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type Contact Page 1st heading Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          1st Paragraph Content
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={contactFirstParagraph}
            onChange={(e) => setContactFirstParagraph(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type Contact Page 1st paragraph Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-medium leading-none text-gray-800">
          Address
        </p>
        <input
          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          value={contactAddress}
          onChange={(e) => setContactAddress(e.target.value)}
        />
        <p className="mt-3 text-xs leading-3 text-gray-600">
          Update Your Address
        </p>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-medium leading-none text-gray-800">
          Email
        </p>
        <input
          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <p className="mt-3 text-xs leading-3 text-gray-600">
          Update Your Email
        </p>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-medium leading-none text-gray-800">
          Contact No
        </p>
        <input
          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <p className="mt-3 text-xs leading-3 text-gray-600">
          Update Your Phone No
        </p>
      </div>
    </>
  );
};

export default Contact;

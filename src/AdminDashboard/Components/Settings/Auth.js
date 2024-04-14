import React, { useState } from 'react';

const Auth = () => {
  // State variables for images
  const [authProSignUpImage, setAuthProSignUpImage] = useState('');
  const [authFreeSignUpImage, setAuthFreeSignUpImage] = useState('');
  const [authLoginImage, setAuthLoginImage] = useState('');

  return (
    <>
      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Pro SignUp Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            value={authProSignUpImage}
            onChange={(e) => setAuthProSignUpImage(e.target.value)}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Pro Signup image
          </p>
        </div>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Free Signup Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            value={authFreeSignUpImage}
            onChange={(e) => setAuthFreeSignUpImage(e.target.value)}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Free Signup image
          </p>
        </div>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Login Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            value={authLoginImage}
            onChange={(e) => setAuthLoginImage(e.target.value)}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Login image
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;

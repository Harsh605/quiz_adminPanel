import React from "react";

const KycImagesPage = ({ kycs }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4">
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${kycs?.adhaarFront}`}
          alt=""
        />
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${kycs?.adhaarBack}`}
          alt=""
        />
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${kycs?.adhaarFront}`}
          alt=""
        />
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${kycs?.adhaarFront}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default KycImagesPage;

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{ height: "calc(100vh - 56px)" }}
      className="bg-dark text-white d-flex justify-content-center flex-column align-items-center"
    >
      <h2 className="fw-bolder text-center" style={{ fontSize: "70px" }}>
        Not Found Page
      </h2>
      <button className="btn btn-danger mt-3">
        <Link to="/" className="text-white">
          Go To Home Page
        </Link>
      </button>
    </div>
  );
};

export default NotFound;

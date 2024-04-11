import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaClockRotateLeft } from "react-icons/fa6";

export const Appbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogoutClick = () => {
    // Handle logout click action
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logout clicked");
    toast.success("Logout successful");
  };

  return (
    <div className="shadow h-14 flex justify-between px-4 py-8">
      <div className="flex flex-col justify-center h-full ml-4 font-semibold text-xl">
        <Link to="/dashboard">Payzz</Link>
      </div>
      <div className="flex items-center">
        <div
          className="flex flex-row justify-center h-full mr-4 items-center pr-5 hover:cursor-pointer"
          onClick={() => {
            navigate("/transactions");
          }}
        >
          <FaClockRotateLeft className="mr-1" />
          <h3> Transactions</h3>
        </div>
        <button
          className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2"
          onClick={toggleDropdown}
        >
          <div className="text-xl">U</div>
        </button>
        {dropdownVisible && (
          <div className="absolute  right-4   mt-36 bg-white border rounded-lg shadow-lg">
            <button className="block w-full py-2 px-4 text-left border-t">
              <h1
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </h1>
            </button>

            <button
              className="block w-full py-2 px-4 text-left border-t"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

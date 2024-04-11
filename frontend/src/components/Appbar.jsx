import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        <a href="/dashboard">Payzz app</a>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col justify-center h-full mr-4 items-center">
          Hello
        </div>
        <button
          className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2"
          onClick={toggleDropdown}
        >
          <div className="text-xl">U</div>
        </button>
        {dropdownVisible && (
          <div className="absolute  right-4   mt-48 bg-white border rounded-lg shadow-lg">
            <button className="block w-full py-2 px-4 text-left border-t">
              <a href="/profile">Profile</a>
            </button>
            <button className="block w-full py-2 px-4 text-left border-t">
              <a href="/transactions">Transactions</a>
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

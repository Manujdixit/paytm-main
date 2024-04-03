import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogoutClick = () => {
    // Handle logout click action
    localStorage.removeItem("token");
    navigate("/signin");
    console.log("Logout clicked");
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        <a href="/dashboard">Payzz app</a>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <button
          className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2"
          onClick={toggleDropdown}
        >
          <div className="text-xl">U</div>
        </button>
        {dropdownVisible && (
          <div className="absolute right-0 mt-14 bg-white border rounded-lg shadow-lg">
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

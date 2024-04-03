import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Appbar } from "../components/Appbar";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state && location.state.amount; // Check if location.state exists before accessing amount

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the dashboard route
  };

  return (
    <>
      <Appbar />
      <div className="flex justify-center h-screen bg-gray-100 text-center">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-5xl mx-auto"
              />
              <h2 className="text-3xl font-bold text-center">
                Payment Successful
              </h2>
            </div>
            <div className="">
              {amount ? (
                <p className="text-lg font-semibold text-center">
                  Amount Sent: Rs {amount}
                </p>
              ) : (
                <p className="text-red-500 text-lg font-semibold text-center">
                  Amount not available
                </p>
              )}
              <div className="mt-4 pt-6">
                <button
                  onClick={handleGoBack}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;

import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SendMoney = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const initiateTransfer = async () => {
    try {
      await axios.post(
        `${BASE_URL}/account/transfer`,
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // If the axios request is successful, redirect to success page
      console.log("Amount before navigation:", amount); // Log the amount before navigation
      navigate("/paymentsuccess", { state: { amount } }); // Pass amount as state object

      toast.success("Transfer initiated successfully!");
    } catch (error) {
      // Handle error
      console.error("Error occurred:", error);
      toast.error("Error occurred while initiating transfer");
    }
  };

  return (
    <>
      <Appbar />
      <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {name[0].toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <button
                  onClick={initiateTransfer}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SendMoney;

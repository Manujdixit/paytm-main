import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import TransactionCard from "../components/TransactionCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Transactions = () => {
  const [transactions, settransactions] = useState([]);
  const [userId, setUserId] = useState(null); // State to store userId

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Decode the token to extract userId
          const decodedToken = jwtDecode(token);
          const userIdFromToken = decodedToken.userId;
          setUserId(userIdFromToken); // Set userId in state
          // console.log("userId:", userIdFromToken); // Log userId

          const response = await axios.get(`${BASE_URL}/account/transactions`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("transactions:", response.data.transactions); // Log transactions

          settransactions(response.data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="w-full min-h-screen  bg-slate-300 p-20">
        <div className="w-full bg-slate-100 min-h-screen p-10 rounded-lg">
          <h1 className="text-3xl underline underline-offset-1 mb-8">
            Transactions
          </h1>
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              userId={userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setbalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        );
        // balance = response.balance;
        console.log("balance", response);
        setbalance(response.data.balance);
      } catch (error) {
        console.log("error fetching balance", error);
      }
    };

    fetchBalance();
  });

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL", BASE_URL);

const Dashboard = () => {
  const [balance, setbalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/account/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        // balance = response.balance;
        console.log("balance", response);
        setbalance(response.data.balance);
      } catch (error) {
        console.log("error fetching balance", error);
        toast.error("Error fetching balance");
      }
    };

    fetchBalance();
  }, []);

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

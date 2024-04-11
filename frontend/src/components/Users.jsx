import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [userId, setUserId] = useState(""); // State to store userId

  useEffect(() => {
    //decode token to extract userId
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdFromToken = decodedToken.userId;
      setUserId(userIdFromToken);
    }

    console.log("Fetching users with filter:", filter);
    axios
      .get(`${BASE_URL}/user/bulk?filter=` + filter)
      .then((response) => {
        console.log("Response data:", response.data); // Log the entire response data to inspect its structure
        const userData = response.data; // Update to access the correct property
        if (userData && userData.users) {
          console.log("Users fetched successfully:", userData.users); // Log fetched user data
          setUsers(userData.users);
        } else {
          console.error("Error: Unexpected response format"); // Log error if response format is unexpected
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [filter]);

  console.log("Users state:", users); // Add this console log

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users &&
          users.map((user) => {
            // Check if the user id matches the token user id
            if (user._id !== userId) {
              return (
                <User
                  user={user}
                  key={user._id}
                  // navigate={navigate}
                />
              );
            }
            return null; // Skip rendering the user if it matches the token user id
          })}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

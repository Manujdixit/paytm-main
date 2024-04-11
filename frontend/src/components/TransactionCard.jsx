import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { GoArrowDownLeft } from "react-icons/go";

function TransactionCard({ transaction, userId }) {
  const timestamp = transaction.date;
  const parsedDate = new Date(timestamp);
  const time = parsedDate.toLocaleTimeString();
  const date = parsedDate.toLocaleDateString();
  const isSent = transaction.senderId._id === userId;

  const applyColor = isSent ? "red" : "green";
  console.log(isSent);
  return (
    <>
      <div className="flex justify-between w-full bg-white p-5 rounded-lg my-4 hover:scale-110">
        <h1 className="text-base ">
          {isSent
            ? `${transaction.receiverId.username}`
            : `${transaction.senderId.username}`}
        </h1>

        <h1 className="text-sm ">TransactionId: {transaction._id}</h1>

        <h1 className="text-sm ">
          {date} {time}
        </h1>

        <div className="flex items-center ">
          {isSent ? (
            <MdOutlineArrowOutward className="text-rose-600 text-xl" />
          ) : (
            <GoArrowDownLeft className="text-green-600 text-xl" />
          )}
          <h2 className="text-base" style={{ color: applyColor }}>
            Rs {transaction.amount}
          </h2>
        </div>
      </div>
    </>
  );
}

export default TransactionCard;

"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);

  const handleReadClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT"
      });

      if (response.status === 200) {
        const { read } = await response.json();
        setIsRead(read);

        if (read) {
          toast.success("Message marked as read");
        } else {
          toast.success("Message marked as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      {!isRead && (
        <div className="absolute right-4 top-4 rounded-md bg-yellow-500 px-2 py-1 text-white">
          New
        </div>
      )}
      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Name: </strong>
          {message.sender.username}
        </li>
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-green-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-green-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {message.createdAt.toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mr-3 mt-4 rounded-md ${isRead ? "bg-gray-300" : "bg-green-500 text-white"} px-3 py-1 `}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white">
        Delete
      </button>
    </div>
  );
};

export default Message;

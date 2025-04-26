import React from "react";
import { X } from "lucide-react";

const Alert = ({ notification, toggleAlert }) => {
  const typeClass =
    notification.type === "success"
      ? "border-green-500 bg-green-100 text-green-600"
      : "border-red-500 bg-red-100 text-red-600";

  return (
    <div
      className={`flex items-center justify-between px-7 py-2 rounded-lg border ${typeClass} transition duration-300 ease-in-out fixed bottom-4 right-4 z-50`}
    >
      <p className="text-lg font-normal">{notification.message}</p>
      <X
        onClick={toggleAlert}
        size={22}
        className="cursor-pointer ml-5 p-0.5 bg-white rounded-full text-red-500"
      />
    </div>
  );
};

export default Alert;

"use client";

import { useState } from "react";
import EditProfileModal from "./EditModalProps";

type Data_type = {
  username: string;
  email: string;
  id: string | number;
  address: string;
};
// /api/orders
const DataProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const User =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [userData, setUserData] = useState<Data_type | null>(
    User ? JSON.parse(User) : null,
  );

  if (!userData) return null;

  const OnSubmit = async ({ name, email }: { name: string; email: string }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: name,
            email: email,
          }),
        },
      );

      if (!res.ok) {
        console.log("Update Error:");
        alert("Update Failed");
        return;
      }

      const updatedUser = await res.json();

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsOpen(false);

      window.location.reload();
    } catch (error) {
      console.error("Execution error:", error);
    }
  };

  return (
    <>
      <div className="bg-white/20 md:min-w-200 flex justify-between items-center rounded-xl gap-5 my-3 p-2">
        <div className="flex gap-5 items-center">
          <div className="w-20 h-20 rounded-full bg-gray-500 flex justify-center items-center text-3xl p-2 m-2 text-white">
            {userData.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{userData.username}</h1>
            <p className="text-gray-400">{userData.email}</p>
            <p className="text-gray-400 text-sm">{userData?.address}</p>
          </div>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className=" cursor-pointer bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-500 text-sm md:text-lg transition-colors"
        >
          Edit Profile
        </div>
        {isOpen && (
          <EditProfileModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            initialName={userData.username}
            initialEmail={userData.email}
            onSubmit={OnSubmit}
          />
        )}
      </div>
    </>
  );
};

export default DataProfile;

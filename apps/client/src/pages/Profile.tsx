import React from "react";
import StandardLayout from "../layouts/Standard";

interface UserInfo {
  email: string;
  fullName: string;
  phone: string;
  idCardNumber: string;
}

export const ProfilePage: React.FC = () => {
  return (
    <StandardLayout>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen px-4 text-9xl text-black">
        Profile
      </div>
    </StandardLayout>
  );
};

export default ProfilePage;

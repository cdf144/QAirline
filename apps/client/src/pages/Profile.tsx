import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import StandardLayout from "../layouts/Standard";

interface UserInfo {
  email: string;
  fullName: string;
  phone: string;
  idCardNumber: string;
}

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { email } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          new URL(
            `/v1/user/${email}`,
            import.meta.env.VITE_API_BASE_URL,
          ).toString(),
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data);
        console.log("Fetched user profile:", data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [email]);

  return (
    <StandardLayout>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen px-4 text-black">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        {user ? (
          <div className="w-full max-w-md bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">
              Full Name: <span className="font-normal">{user.fullName}</span>
            </p>
            <p className="text-lg font-semibold">
              Email: <span className="font-normal">{user.email}</span>
            </p>
            <p className="text-lg font-semibold">
              Phone: <span className="font-normal">{user.phone}</span>
            </p>
            <p className="text-lg font-semibold">
              ID Card Number:{" "}
              <span className="font-normal">{user.idCardNumber}</span>
            </p>
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    </StandardLayout>
  );
};

export default ProfilePage;

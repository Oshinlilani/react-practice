import React, { useState } from "react";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const savedData = localStorage.getItem("profileData");

    if (savedData) {
      return JSON.parse(savedData);
    }

    return {
      name: "",
      email: "",
      location: "",
    };
  });

  const handleEdit = () => {
    // Handle edit profile logic
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Handle delete profile logic

    const confirm = window.confirm(
      "Are you sure you want to delete your profile?",
    );

    if (confirm) {
      setProfileData({
        name: "",
        email: "",
        location: "",
      });
    }
  };

  const handleSave = () => {
    // Handle save profile logic
    setIsEditing(false);
    localStorage.setItem("profileData", JSON.stringify(profileData));
  };

  return (
    <div className="profile-card flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-4 m-40">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="rounded-full"
        />
        {isEditing ? (
          <div className="p-4 flex flex-col gap-3">
            <label>
              Name:
              <input
                type="text"
                className="w-full flex flex-col gap-3 border m-2 p-1"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                className="w-full flex flex-col gap-3 border m-2 p-1"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                className="w-full flex flex-col gap-3 border m-2 p-1"
                value={profileData.location}
                onChange={(e) =>
                  setProfileData({ ...profileData, location: e.target.value })
                }
              />
            </label>

            <button
              onClick={handleSave}
              className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-3 ">
            <p className="text-xl font-bold">Name : {profileData.name}</p>
            <p className="font-bold">Email : {profileData.email}</p>
            <p className="font-bold">Location : {profileData.location}</p>
            <button
              onClick={handleEdit}
              className="border rounded p-1 bg-green-200"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="border rounded p-1 bg-red-200"
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

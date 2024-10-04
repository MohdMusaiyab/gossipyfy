// components/UpdateUsernameForm.tsx
"use client"; // This ensures the component can use React hooks
import React, { useState, FormEvent } from "react";
import { updateUserName } from "../../../actions/user/updateUsername";

interface Props {
  currentUsername: string;
}

const UpdateUsernameForm: React.FC<Props> = ({ currentUsername }) => {
  const [newUsername, setNewUsername] = useState(currentUsername); // Initialize with current username
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Handle form submission and call server action to update the username
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const updatedUser = await updateUserName(newUsername); // Call server action
      setStatusMessage(`Username updated successfully to ${updatedUser.username}`);
    } catch (error) {
      setStatusMessage((error as Error).message); // Set error message if update fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        New Username
      </label>
      <input
        type="text"
        id="username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)} // Update state on input change
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Update Username
      </button>

      {/* Display success or error message */}
      {statusMessage && <p className="mt-2 text-red-500">{statusMessage}</p>}
    </form>
  );
};

export default UpdateUsernameForm;

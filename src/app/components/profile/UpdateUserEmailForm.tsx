"use client"; 
import React, { useState, FormEvent } from "react";
import { updateEmail } from "@/actions/user/updateEmail";

interface Props {
  currentEmail: string;
}

const UpdateUserEmailForm: React.FC<Props> = ({ currentEmail }) => {
  const [newEmail, setNewEmail] = useState(currentEmail); // Initialize with current email
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Handle form submission and call server action to update the email
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const updatedUser = await updateEmail(newEmail); // Call server action
      setStatusMessage(`Email updated successfully to ${updatedUser.email}`);
    } catch (error) {
      setStatusMessage((error as Error).message); // Set error message if update fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        New Email
      </label>
      <input
        type="email"
        id="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)} // Update state on input change
        className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
      />
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Update Email
      </button>

      {/* Display success or error message */}
      {statusMessage && <p className="mt-2 text-red-500">{statusMessage}</p>}
    </form>
  );
};

export default UpdateUserEmailForm;

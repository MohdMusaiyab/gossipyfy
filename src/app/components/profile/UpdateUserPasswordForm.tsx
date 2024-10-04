"use client"; // Ensure that this is a client component
import React, { useState, FormEvent } from "react";
import { updatePassword } from "@/actions/user/updatePassword";

const UpdateUserPasswordForm: React.FC = () => {
    const [newPassword, setNewPassword] = useState(""); // Initialize state for new password
    const [statusMessage, setStatusMessage] = useState<string>("");
  
    // Handle form submission and call server action to update the password
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault(); // Prevent form from refreshing the page
  
      try {
        await updatePassword(newPassword); // Call server action
        setStatusMessage("Password updated successfully");
      } catch (error) {
        setStatusMessage((error as Error).message); // Set error message if update fails
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // Update state on input change
          className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Password
        </button>
  
        {/* Display success or error message */}
        {statusMessage && <p className="mt-2 text-red-500">{statusMessage}</p>}
      </form>
    );
  };
  
  export default UpdateUserPasswordForm;


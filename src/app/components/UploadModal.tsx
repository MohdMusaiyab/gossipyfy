"use client";
import React, { useState } from "react";
import axios from "axios";

const UploadModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    category: "" 
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    
    // Append form fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });
    
    // Append file
    if (file) {
      data.append("file", file);
    }

    try {
      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Upload response:", res.data);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log("File selected:", e.target.files[0]);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={handleChange} name="title" />
        <input type="text" placeholder="Description" onChange={handleChange} name="description"/>
        <input type="text" placeholder="Language" onChange={handleChange} name="language" />
        <input type="text" placeholder="Category" onChange={handleChange} name="category"/>
        <input type="file" onChange={handleFile} name="file"/>

        <button type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadModal;
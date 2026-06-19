import API_URL from "../config";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    try {
      if (!file) {
        toast.error("Please select a PDF");
        return;
      }
      const formData = new FormData();
      formData.append("pdf", file);
      const response = await axios.post(
         `${API_URL}/api/document/upload`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      toast.success("Document Uploaded Successfully");
    } catch (error) {
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex justify-center items-center py-20">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
            Upload Document
          </h1>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">
            {file ? file.name : "No File Selected"}
          </p>
          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocument;
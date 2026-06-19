import API_URL from "../config";
 import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function UploadSignature() {
  // Store selected image
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    try {
      // Check file selected
      if (!file) {
        alert("Please select a signature image");
        return;
      }
      // Create FormData
      const formData = new FormData();
      // Add image
      formData.append("signature", file);
      // Call backend API
      const response = await axios.post(
        `${API_URL}/api/signature/upload`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      toast.success("Signature Uploaded Successfully");
    } catch (error) {
      alert("Upload Failed");
    }
  };

  return (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <div className="flex justify-center items-center py-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
          Upload Signature
        </h1>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-3 rounded-lg mb-4"
        />
        {
          file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Signature Preview"
              className="w-full h-40 object-contain border rounded-lg mb-4"
            />
          )
        }
        <p className="text-gray-600 mb-4">
          {file ? file.name : "No Signature Selected"}
        </p>
        <button
          onClick={handleUpload}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          Upload Signature
        </button>
      </div>
    </div>
  </div>
);
}

export default UploadSignature;


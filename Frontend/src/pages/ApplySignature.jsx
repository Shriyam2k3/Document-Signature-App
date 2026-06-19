import API_URL from "../config";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function ApplySignature() {
  const [pdfLink, setPdfLink] = useState("");
  const { id } = useParams();
  const handleApply = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/signature/apply`,
        {
          documentId:id,
        },
        {
          headers: {
            Authorization:
              localStorage.getItem("token")
          }
        }
      )
      const signedPdf = response.data.signedPdf;
      setPdfLink(`${API_URL}/${signedPdf}`);
      toast.success("PDF Signed Successfully");

    } catch(error) {
      toast.error("Something went wrong");
    }
  };
  return (
  <div className="min-h-screen bg-slate-100">
    <Navbar />
    <div className="flex justify-center items-center py-20">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          Apply Signature
        </h1>
        <button
          onClick={handleApply}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Sign PDF
        </button>
        {pdfLink && (
          <a
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
            className="block mt-5 text-center text-blue-600 font-semibold"
          >
            Download Signed PDF
          </a>
        )}

      </div>

    </div>

  </div>
);
}

export default ApplySignature;
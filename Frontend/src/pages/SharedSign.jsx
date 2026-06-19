import API_URL from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function SharedSign() {
  const { token } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDocument();
  }, []);
  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/document/shared/${token}`
      );
      setDocument(response.data.document);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (!document) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Document Not Found
          </h1>
          <p className="text-gray-500 mt-3">
            This shared document may have been removed.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-8 text-center">
            <h1 className="text-4xl font-bold">
              Shared Document
            </h1>
            <p className="mt-2 text-blue-100">
              View the document securely
            </p>
          </div>

          {/* Body */}
          <div className="p-10">
            <div className="bg-slate-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 break-words">
                📄 {document.title}
              </h2>
              <p className="text-gray-500 mt-3">
                This document has been shared with you.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href={`${API_URL}/${document.filePath}`}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                View Document
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedSign;
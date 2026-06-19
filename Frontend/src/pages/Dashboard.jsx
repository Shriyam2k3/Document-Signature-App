import API_URL from "../config";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";


function Dashboard() {

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/dashboard/stats`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }finally {

    setLoading(false);

  }
  };
  if (loading) {
  return (
    <>
      <Navbar />
      <Loader />
    </>
  );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-slate-800">
            Document Signature Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage, Sign and Share Documents Securely
          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600">

            <h2 className="text-gray-500 text-lg">
              Total Documents
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-3">
              {stats.totalDocuments || 0}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-600">

            <h2 className="text-gray-500 text-lg">
              Signed Documents
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-3">
              {stats.signedDocuments || 0}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-yellow-500">

            <h2 className="text-gray-500 text-lg">
              Pending Documents
            </h2>

            <p className="text-5xl font-bold text-yellow-500 mt-3">
              {stats.pendingDocuments || 0}
            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => navigate("/upload-document")}
            className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-600">
              📄 Upload Document
            </h2>

            <p className="text-gray-500 mt-2">
              Upload PDF documents for signing.
            </p>
          </button>

          <button
            onClick={() => navigate("/upload-signature")}
            className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-green-600">
              ✍ Upload Signature
            </h2>

            <p className="text-gray-500 mt-2">
              Save your digital signature securely.
            </p>
          </button>

          <button
            onClick={() => navigate("/my-documents")}
            className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-purple-600">
              📂 My Documents
            </h2>

            <p className="text-gray-500 mt-2">
              View, sign, delete and share documents.
            </p>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-orange-600">
              📜 History
            </h2>

            <p className="text-gray-500 mt-2">
              Track all signing activities.
            </p>
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function SignatureHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/signature/history`,
        {
          headers: {
            Authorization:
              localStorage.getItem("token")
          }
        }
      );
      setHistory(response.data.history);
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
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-slate-800">
            Signature History
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Track all signed documents
          </p>
          <div className="mt-4 inline-block bg-white px-5 py-2 rounded-full shadow">
            <span className="font-semibold">
              Total Records:
            </span>{" "}
            {history.length}
          </div>
        </div>

        {/* Empty State */}
        {history.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-slate-700">
              No History Found
            </h2>
            <p className="text-gray-500 mt-3">
              Sign a document to see activity here.
            </p>
          </div>
        )}

        {/* History Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  📄 Signature Record
                </h2>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Signed
                </span>
              </div>
              <div className="mt-5">
                <p className="text-gray-500 text-sm">
                  Document ID
                </p>
                <p className="font-medium break-all text-slate-800">
                  {item.documentId}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-gray-500 text-sm">
                  Signed On
                </p>
                <p className="font-medium text-slate-800">
                  {new Date(
                    item.signedAt
                  ).toLocaleString()}
                </p>
              </div>
              <div className="mt-5 border-t pt-4">
                <p className="text-green-600 font-semibold">
                  Document Signed Successfully
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignatureHistory;
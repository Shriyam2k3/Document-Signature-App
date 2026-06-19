import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";


function AuditHistory() {

  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {

    try {
         setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/audit/history`,
        {
          headers: {
            Authorization:
              localStorage.getItem("token")
          }
        }
      );

      setAudits(response.data.audits);

    } catch (error) {
      console.log(error);
    }finally {
    setLoading(false);

  }
  };

  const getBadgeColor = (action) => {

    if (action.includes("Upload"))
      return "bg-blue-100 text-blue-700";

    if (action.includes("Delete"))
      return "bg-red-100 text-red-700";

    if (action.includes("Sign"))
      return "bg-green-100 text-green-700";

    return "bg-gray-100 text-gray-700";
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
            Audit Trail
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track every activity performed in the system
          </p>

          <div className="mt-4 inline-block bg-white px-5 py-2 rounded-full shadow">
            <span className="font-semibold">
              Total Activities:
            </span>{" "}
            {audits.length}
          </div>

        </div>

        {/* Empty State */}

        {audits.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">

            <h2 className="text-3xl font-bold text-slate-700">
              No Activities Found
            </h2>

            <p className="text-gray-500 mt-3">
              Your activity logs will appear here.
            </p>

          </div>
        )}

        {/* Audit Cards */}

        <div className="grid md:grid-cols-2 gap-6">

          {audits.map((audit) => (

            <div
              key={audit._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold text-slate-800">
                  📋 Activity Log
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(audit.action)}`}
                >
                  {audit.action}
                </span>

              </div>

              <div className="mt-5">

                <p className="text-gray-500 text-sm">
                  Action Performed
                </p>

                <p className="font-semibold text-slate-800">
                  {audit.action}
                </p>

              </div>

              <div className="mt-5">

                <p className="text-gray-500 text-sm">
                  Timestamp
                </p>

                <p className="font-medium text-slate-800">
                  {new Date(
                    audit.timestamp
                  ).toLocaleString()}
                </p>

              </div>

              <div className="mt-5 border-t pt-4">

                <p className="text-blue-600 font-semibold">
                  🔍 Activity Recorded Successfully
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AuditHistory;
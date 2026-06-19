import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDocuments();
  }, []);
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/document/my-documents`,
        {
          headers: {
            Authorization:
            localStorage.getItem("token")
          }
        });
        setDocuments(response.data.documents);
    }catch(error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
         `${API_URL}/api/document/delete/${id}`,
      {
        headers: {
          Authorization:
          localStorage.getItem("token")
        }
      });
      toast.success("Document Deleted");
      fetchDocuments();
    } catch(error) {
      toast.error("Delete Failed");
    }
  };

  const generateLink = async(id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/document/share/${id}`,
        {},
        {
          headers:{
            Authorization:
            localStorage.getItem("token")
          }
        }
      );
      navigator.clipboard.writeText(
        response.data.link
      );
      toast.success("Link Copied");
    } catch(error) {
        toast.error("Failed to Generate Link");
    }
  };
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "All"
        ? true
        : doc.status === filter;
      return (
      matchesSearch &&
      matchesFilter
      );
  });
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
          My Documents
        </h1>
        <p className="text-gray-500 mt-2">
          Manage, Sign and Share your documents
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-xl w-full md:w-80"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option>All</option>
            <option>Signed</option>
            <option>Pending</option>
          </select>
        </div>
        <div className="mt-4 inline-block bg-white px-5 py-2 rounded-full shadow">
          <span className="font-semibold">
            Total Documents:
          </span>{" "}
          {documents.length}
        </div>
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-700">
            No Documents Found
          </h2>
          <p className="text-gray-500 mt-3">
            Upload your first document to get started.
          </p>
        </div>
      )}

      {/* Documents */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocuments.map((doc) => (
        <div
          key={doc._id}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-slate-800 break-words">
              {doc.title}
            </h2>
            <div className="mt-4">
              <span className="text-gray-500">
                Status:
              </span>
              <span
                className={
                  doc.status === "Signed"
                    ? "ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                    : "ml-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold"
                }
              >
                {doc.status}
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-500 mb-5">
              Uploaded Document
            </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
              window.open(
                `${API_URL}/${doc.filePath}`,
                  "_blank"
                )}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
            >
              View
            </button>
            <a
              href={`${API_URL}/${doc.filePath}`}
              download
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-center"
            >
              Download
            </a>
            <button
              onClick={() =>
              navigate(`/apply-signature/${doc._id}`)
            }
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
            >
              Sign
            </button>
          <button
            onClick={() => generateLink(doc._id)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl"
          >
            Share
          </button>

          <button
            onClick={() => handleDelete(doc._id)}
            className="col-span-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
          >
            Delete Document
          </button>

        </div>

      </div>

    </div>

  ))}

  </div>

    </div>

  </div>
);
}

export default MyDocuments;
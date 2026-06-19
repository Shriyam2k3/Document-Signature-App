import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-xl font-bold">
        Document Signature App
      </h1>

      <div className="flex gap-6 items-center">

        <Link
          to="/dashboard"
          className="hover:text-blue-400"
        >
          Dashboard
        </Link>

        <Link
          to="/my-documents"
          className="hover:text-blue-400"
        >
          My Documents
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-400"
        >
          Profile
        </Link>
        <Link to="/history">
          History
        </Link>

        <Link to="/audit">
          Audit
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;
import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      setUser(response.data.user);

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

    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Profile Card */}

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

          <div className="w-28 h-28 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold">
            {user?.name?.charAt(0)}
          </div>

          <h1 className="text-3xl font-bold mt-5 text-slate-800">
            {user?.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

          <div className="mt-5 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Active Account
          </div>

        </div>

        {/* Details */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Account Information
          </h2>

          <div className="space-y-5">

            <div className="bg-slate-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Full Name
              </p>

              <p className="text-xl font-semibold">
                {user?.name}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Email Address
              </p>

              <p className="text-xl font-semibold">
                {user?.email}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Account Status
              </p>

              <p className="text-green-600 font-semibold">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Profile;
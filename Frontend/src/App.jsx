import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";
import UploadSignature from "./pages/UploadSignature";
import ApplySignature from "./pages/ApplySignature";
import MyDocuments from "./pages/MyDocuments";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignatureHistory from "./pages/SignatureHistory";
import AuditHistory from "./pages/AuditHistory";
import SharedSign from "./pages/SharedSign";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/upload-document"element={<UploadDocument />}/>
        <Route path="/upload-signature"element={<UploadSignature />}/>
        <Route path="/apply-signature/:id" element={<ApplySignature />}/>
        <Route path="/my-documents" element={<MyDocuments />}/>
        <Route path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/history"
          element={
            <ProtectedRoute>
              <SignatureHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/audit"
          element={
            <ProtectedRoute>
              <AuditHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/shared-sign/:token"
          element={<SharedSign />}
        />
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

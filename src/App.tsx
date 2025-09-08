import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import StudentsPage from "./pages/StudentPage";
import EnrollmentsPage from "./pages/EnrollmentPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";

export default function App() {
  return (
    <Router>
      <div className="w-full flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/enrollments" element={<EnrollmentsPage />} />
            <Route path="/students/:id" element={<StudentDetailsPage />} />{" "}
            <Route path="*" element={<Navigate to="/students" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

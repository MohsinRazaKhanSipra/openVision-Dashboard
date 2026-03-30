import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Cameras } from "./pages/Cameras";
import { CameraDetail } from "./pages/CameraDetail";
import { Models } from "./pages/Models";
import { Solutions } from "./pages/Solutions";
import { Admin } from "./pages/Admin";
import { Logs } from "./pages/Logs";
import { useAuthStore } from "./store/auth";
import { Toaster } from "sonner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" theme="system" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="cameras" element={<Cameras />} />
          <Route path="cameras/:id" element={<CameraDetail />} />
          <Route path="models" element={<Models />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="admin" element={<Admin />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

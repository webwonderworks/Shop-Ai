import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./app/pages/AuthPage";
import DashboardPage from "./app/pages/DashboardPage";
import ProjectsPage from "./app/pages/ProjectsPage";
import NewProjectPage from "./app/pages/NewProjectPage";
import ProjectDetailPage from "./app/pages/ProjectDetailPage";
import DesignerPage from "./app/pages/DesignerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<DashboardPage />} />
        <Route path="/app/projects" element={<ProjectsPage />} />
        <Route path="/app/projects/new" element={<NewProjectPage />} />
        <Route path="/app/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/app/projects/:id/designer" element={<DesignerPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

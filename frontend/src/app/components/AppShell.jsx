import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ title, children }) {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <Sidebar />

        <div className="min-w-0">
          <Topbar title={title} />

          <main className="p-4 md:p-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
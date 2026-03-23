import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, FileJson, Loader2, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: projects, isLoading } = trpc.design.listProjects.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Anmeldung erforderlich</h1>
          <p className="text-lg text-gray-600">
            Bitte melden Sie sich an, um auf Ihre Design-Projekte zuzugreifen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Design-Projekte</h1>
            <p className="text-lg text-gray-600">
              Verwalten Sie Ihre Shop-Design-Projekte
            </p>
          </div>
          <Link href="/wizard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg gap-2">
              <Plus className="w-5 h-5" />
              Neues Projekt
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shop-Typ:</span>
                    <span className="font-medium text-gray-900">{project.shopType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Marke:</span>
                    <span className="font-medium text-gray-900">{project.brandProfile}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href={`/editor/${project.id}`} className="block w-full">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2">
                      + Neues Design erstellen
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Link href={`/wizard/${project.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1 rounded-lg border-gray-300">
                        <Edit2 className="w-3 h-3" />
                        Bearbeiten
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="flex-1 gap-1 rounded-lg border-gray-300">
                      <FileJson className="w-3 h-3" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Noch keine Projekte</h2>
                <p className="text-lg text-gray-600">
                  Erstellen Sie Ihr erstes Design-Projekt und beginnen Sie mit der KI-gestützten Gestaltung.
                </p>
              </div>
              <Link href="/wizard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg gap-2">
                  <Plus className="w-5 h-5" />
                  Erstes Projekt erstellen
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

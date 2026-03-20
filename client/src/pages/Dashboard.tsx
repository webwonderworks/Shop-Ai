import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, FileJson } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Anmeldung erforderlich</h1>
          <p className="text-muted-foreground mb-6">
            Bitte melden Sie sich an, um auf Ihre Design-Projekte zuzugreifen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Design-Projekte</h1>
            <p className="text-muted-foreground mt-2">
              Verwalten Sie Ihre Shop-Design-Projekte
            </p>
          </div>
          <Link href="/wizard">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Neues Projekt
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shop-Typ:</span>
                      <span className="font-medium">{project.shopType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Marke:</span>
                      <span className="font-medium">{project.brandProfile}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium capitalize">{project.status}</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-4">
                      <Link href={`/editor/${project.id}`} className="w-full">
                        <Button size="sm" className="gap-1 w-full bg-blue-600 hover:bg-blue-700">
                          + Neues Design erstellen
                        </Button>
                      </Link>
                      <div className="flex gap-2">
                        <Link href={`/wizard/${project.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="gap-1 w-full">
                            <Edit2 className="w-3 h-3" />
                            Bearbeiten
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="gap-1">
                          <FileJson className="w-3 h-3" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Sie haben noch keine Design-Projekte erstellt.
              </p>
              <Link href="/wizard">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Erstes Projekt erstellen
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

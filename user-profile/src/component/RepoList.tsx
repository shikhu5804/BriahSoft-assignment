// src/components/RepoList.tsx
import { Card, CardContent } from "@/components/ui/card";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  language: string;
};

type Props = {
  repos: Repo[];
};

export default function RepoList({ repos }: Props) {
  if (repos.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-400">No repositories found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {repos.map((repo) => (
        <Card key={repo.id} className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-semibold hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-400 mt-1">
              Language: {repo.language || "N/A"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

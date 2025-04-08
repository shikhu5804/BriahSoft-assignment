import RepoList from "@/component/RepoList";
import UsernameInput from "@/component/UserNameInput";
import { useState } from "react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  language: string;
};

type User = {
  name: string;
  avatar_url: string;
};

const UserProfile = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async (username: string) => {
    setLoading(true);
    try {
      const [reposRes, userRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/repos`),
        fetch(`https://api.github.com/users/${username}`),
      ]);

      if (!reposRes.ok || !userRes.ok) throw new Error("User not found");

      const reposData = await reposRes.json();
      const userData = await userRes.json();

      setRepos(reposData);
      setUser({
        name: userData.name || userData.login,
        avatar_url: userData.avatar_url,
      });
    } catch (error) {
      alert("Error fetching data.");
      setRepos([]);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          GitHub Profile Analyzer
        </span>
      </h1>
      <p className="text-center text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
        Discover insightful details about any GitHub user — repositories,
        contributions, and more.
      </p>

      <UsernameInput onFetchRepos={fetchRepos} />
      {loading ? (
        <div className="flex flex-col items-center mt-6">
          <p className="text-white text-lg animate-pulse">Loading...</p>
        </div>
      ) : (
        <>
          {user && (
            <div className="flex flex-col items-center mt-6 mb-4">
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
            </div>
          )}
          <RepoList repos={repos} />
        </>
      )}
    </div>
  );
};

export default UserProfile;

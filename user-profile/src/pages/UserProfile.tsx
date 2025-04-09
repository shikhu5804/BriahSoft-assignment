import RepoList from "@/component/RepoList";
import UsernameInput from "@/component/UserNameInput";
import { useState } from "react";
import ContributionGraph from "@/component/ContributionGraph";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  language: string;
};

type User = {
  name: string;
  avatar_url: string;
  login: string;
};

const UserProfile = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const fetchRepos = async (username: string) => {
    setLoading(true);
    setApiError('');

    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    console.log(GITHUB_TOKEN);

    try {
      const headers = {
        Authorization: `token ${GITHUB_TOKEN}`,
      };

      const [reposRes, userRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/repos`, { headers }),
        fetch(`https://api.github.com/users/${username}`, { headers }),
      ]);

      if (reposRes.status === 403) {
        throw new Error("API rate limit exceeded. Try again later.");
      }

      if (!reposRes.ok || !userRes.ok) {
        throw new Error("User not found or API error");
      }

      const reposData = await reposRes.json();
      const userData = await userRes.json();

      setRepos(reposData);
      setUser({
        name: userData.name || userData.login,
        avatar_url: userData.avatar_url,
        login: userData.login,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error fetching data";
      setApiError(message);
      setRepos([]);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="text-center mb-12">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
    <span className="inline-block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
      GitHub Profile Analyzer
    </span>
  </h1>

  <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
    Dive deep into any GitHub user's profile. Visualize their repositories,
    activity charts, and yearly contributions — all in one clean interface.
  </p>
</div>


      <UsernameInput onFetchRepos={fetchRepos} />

      {apiError && (
        <div className="text-center py-4 text-red-400">
          {apiError}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center mt-6">
          <p className="text-white text-lg animate-pulse">Loading...</p>
        </div>
      ) : (
        <>
          {user && (
            <>
              <div className="flex flex-col items-center mt-6 mb-4">
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
              </div>

              <ContributionGraph username={user.login} />

              <RepoList repos={repos} onRepoSelect={() => {}} />
                <h3 className="text-zinc-400 mt-10 text-center">Created by Shikhar</h3>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;

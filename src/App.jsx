import { useGitHubSearch } from "./hooks/useGithubSearch";
import { RepoList } from "./components/RepoList";
import { SearchBar } from "./components/searchBar";

function App() {
 
  const { repos, loading, error, searchRepos } = useGitHubSearch();

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Open Source Finder</h1>
        <p>Find the perfect repository and your very first issue to tackle.</p>
      </header>
      
      <SearchBar onSearch={searchRepos} isLoading={loading} />
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Scouring GitHub for beginner-friendly repos...</div>}
      
      {!loading && !error && repos.length > 0 && <RepoList repos={repos} />}

    </main>
  );
}

export default App;
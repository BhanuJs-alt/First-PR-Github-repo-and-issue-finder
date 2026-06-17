import { useState } from 'react';
import { fetchRepos } from '../services/githubApi';

export function useGitHubSearch() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRepos = async (domain, language) => {
    if (!domain) {
      setError("Please select a domain to start searching.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchRepos(domain, language);
      if (data.length === 0) {
        setError("No repositories found for this combination. Try another search!");
      }
      setRepos(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { repos, loading, error, searchRepos };
}
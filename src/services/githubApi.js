const BASE_URL = 'https://api.github.com';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  ...(TOKEN && { 'Authorization': `Bearer ${TOKEN}` })
};

export async function fetchRepos(domain, language) {
  // Construct a smart query that searches for the domain and specifically targets the language
  let query = `${domain}`;
  if (language) query += ` language:${language}`;

  // Sort by repositories that actually have help-wanted issues
  const response = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&sort=help-wanted-issues&order=desc&per_page=20`, 
    { headers }
  );
  
  if (!response.ok) throw new Error('Failed to fetch repositories. You may have hit the API rate limit.');
  const data = await response.json();
  return data.items || [];
}

export async function fetchIssues(owner, repo) {
  const response = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}/issues?state=open&sort=updated&per_page=30`, 
    { headers }
  );
  
  if (!response.ok) throw new Error('Failed to fetch issues.');
  return response.json();
}
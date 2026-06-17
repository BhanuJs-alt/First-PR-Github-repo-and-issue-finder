import './RepoCard.css';
import { useState } from 'react';
import { fetchIssues } from '../services/githubApi';

export function RepoCard({ repo }) {
  const [issues, setIssues] = useState([]);
  const [showIssues, setShowIssues] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [error, setError] = useState(null);

  
  const beginnerLabels = ["good first issue", "help wanted", "beginner friendly", "documentation", "first-timers-only"];

  async function handleIssues() {
   
    if (showIssues) {
      setShowIssues(false);
      return;
    }
   
    if (issues.length > 0) {
      setShowIssues(true);
      return;
    }

    setLoadingIssues(true);
    setError(null);

    try {
      const data = await fetchIssues(repo.owner.login, repo.name);

     
      const beginnerIssues = data.filter(issue =>
        issue.labels.some(label =>
          beginnerLabels.includes(label.name.toLowerCase())
        )
      );
      
      setIssues(beginnerIssues);
      setShowIssues(true);
    } catch (err) {
      setError("Failed to load issues. Please try again later.");
    } finally {
      setLoadingIssues(false);
    }
  }

  const lastUpdated = new Date(repo.updated_at).toLocaleDateString();

  return (
    <div className="repo-card">
      <div className="repo-header">
        <h2>{repo.name}</h2>
        <span className="last-updated">Updated: {lastUpdated}</span>
      </div>

      <p className="repo-desc">{repo.description || "No description provided."}</p>

      
      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.slice(0, 4).map(topic => (
            <span key={topic} className="topic-badge">{topic}</span>
          ))}
        </div>
      )}

      <div className="stats">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>📋 {repo.open_issues_count} open issues</span>
      </div>

      <div className="actions">
        <a className='btn-secondary' href={repo.html_url} target="_blank" rel="noreferrer">
          View on GitHub
        </a>
        <button className="btn-primary" onClick={handleIssues} disabled={loadingIssues}>
          {loadingIssues ? "Searching..." : (showIssues ? "Hide Issues" : "Find Beginner Issues")}
        </button>
      </div>

      {/* Issues Display Section */}
      {showIssues && (
        <div className="issues-container">
          {error && <p className="error-text">{error}</p>}
          
          {!error && issues.length === 0 && (
            <p className="empty-state">No beginner-friendly issues found right now. Check back later!</p>
          )}

          {issues.map(issue => (
            <a key={issue.id} href={issue.html_url} target="_blank" rel="noreferrer" className="issue-item">
              <h4>{issue.title}</h4>
              <div className="issue-labels">
                {issue.labels.map(l => (
                   <span key={l.id} className="issue-label" style={{ backgroundColor: `#${l.color}20`, color: `#${l.color}`, border: `1px solid #${l.color}` }}>
                     {l.name}
                   </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
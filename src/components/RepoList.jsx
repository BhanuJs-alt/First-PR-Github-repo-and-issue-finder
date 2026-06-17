import { RepoCard } from "./RepoCard";
import './RepoList.css'; 

export function RepoList({ repos }) {
  return (
    <div className="repo-list">
      {repos.map(repo => (
        <RepoCard
          key={repo.id}
          repo={repo}
        />
      ))}
    </div>
  );
}
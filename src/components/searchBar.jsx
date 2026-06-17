import { useState } from "react";
import './searchBar.css';

export function SearchBar({ onSearch, isLoading }) {
  const [language, setLanguage] = useState('');
  const [domain, setDomain] = useState('');

  function handleSearch() {
    onSearch(domain, language);
  }

  return (
    <div className="search-container">
      <div className="dropdown-group">
        <div className="domain-dropdown">
          <label htmlFor="domain">Select a domain</label>
          <select id="domain" value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="" disabled>Choose domain...</option>
            <option value="Web Development">Web Development</option>
            <option value="Machine Learning">AI / Machine Learning</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select> 
        </div>

        <div className="language-dropdown">
          <label htmlFor="language">Select a language (Optional)</label>
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">Any Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="rust">Rust</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="go">Go</option>
            <option value="ruby">Ruby</option>
            <option value="java">Java</option>  
            <option value="dotnet">.NET</option>
            <option value="csharp">C#</option>
          </select>
        </div>
      </div>

      <button 
        className="btn-primary search-btn" 
        onClick={handleSearch} 
        disabled={isLoading || !domain}
      >
        {isLoading ? "Searching..." : "Find Projects"}
      </button>
    </div>
  );
}
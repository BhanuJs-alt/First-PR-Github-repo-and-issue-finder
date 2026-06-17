🚀 First-PR an Open Source/Issue finder

📖 Project Overview
The Open Source Finder is a React-based web application designed to lower the barrier to entry for open-source contributors. Instead of mindlessly scrolling through GitHub, users can select their preferred domain (e.g., Web Development, Machine Learning) and programming language. The app fetches relevant, active repositories and specifically filters for beginner-friendly issues (like "good first issue" or "help wanted") so developers can make their first pull request with confidence.

🛠️ Tech Stack & Architecture
Frontend Framework: React 19 (via Vite)

Styling: CSS (Custom components)

Data Fetching: GitHub REST API v3

Architecture Pattern: Separation of Concerns (Custom Hooks for logic, Components for UI)

✨ Key Features
1. Smart Issue Filtering: Goes beyond the standard "good first issue" by simultaneously checking for multiple inclusive labels like "help wanted", "beginner friendly", and "first-timers-only".

2. Rate Limit Protection: Integrates a GitHub Personal Access Token (PAT) via environment variables to increase the API limit from 60 requests/hour to 5,000 requests/hour.

3. Optimized State Management: Uses a custom React hook (useGitHubSearch) to abstract complex asynchronous data fetching, loading states, and error handling away from the UI layer.

📁 Folder Structure

src/
├── components/
│   ├── RepoCard.jsx    # Displays individual repo stats and fetches/displays its issues
│   ├── RepoList.jsx    # Maps over the repo data to render a grid/list of RepoCards
│   └── SearchBar.jsx   # Captures user input (domain/language)
├── hooks/
│   └── useGitHubSearch.js # Custom hook managing search logic, loading, and error states
├── services/
│   └── githubService.js   # Centralized API calls (fetchRepos, fetchIssues)
├── App.jsx             # Main container tying the UI and Hooks together
└── main.jsx            # React entry point
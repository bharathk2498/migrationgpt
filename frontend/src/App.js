import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import GitHubFileBrowser from './components/GitHubFileBrowser';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [projectName, setProjectName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select a file from GitHub');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/analyze`, {
        github_url: selectedFile.download_url,
        project_name: projectName || selectedFile.name,
        file_content: selectedFile.content
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResults(response.data);
      setActiveTab('results');
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Migration<span className="highlight">GPT</span></h1>
              <p className="tagline">AI-Powered Cloud Migration Intelligence</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="icon-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <div className="user-avatar">B</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          New Analysis
        </button>
        {results && (
          <button 
            className={`nav-tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Results
          </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <LoadingScreen />
        ) : activeTab === 'upload' ? (
          <div className="upload-section">
            <div className="upload-container">
              <div className="section-header">
                <h2>Cloud Migration Assessment</h2>
                <p>Select your infrastructure files from GitHub for AI-powered analysis</p>
              </div>

              <div className="form-section">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., AWS Production Migration"
                  className="form-input"
                />
              </div>

              <GitHubFileBrowser 
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />

              {error && (
                <div className="alert alert-error">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                className="analyze-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Start AI Analysis
              </button>
            </div>
          </div>
        ) : (
          <ResultsDashboard results={results} projectName={projectName} />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2024 MigrationGPT. Built by Bharath K.</p>
          <div className="footer-links">
            <a href="#">Documentation</a>
            <a href="#">API</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GitHubFileBrowser({ onFileSelect, selectedFile }) {
  const [repos, setRepos] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('default'); // 'default', 'custom', or 'upload'
  const [customUrl, setCustomUrl] = useState('');

  const defaultRepo = {
    owner: 'bharathk2498',
    repo: 'migrationgpt',
    path: 'samples'
  };

  useEffect(() => {
    loadDefaultFiles();
  }, []);

  const loadDefaultFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${defaultRepo.owner}/${defaultRepo.repo}/contents/${defaultRepo.path}`
      );
      setFiles(response.data.filter(file => 
        file.name.endsWith('.tf') || 
        file.name.endsWith('.json') || 
        file.name.endsWith('.yaml') ||
        file.name.endsWith('.yml')
      ));
      setSelectedRepo(defaultRepo);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomRepo = async () => {
    if (!customUrl) return;
    
    setLoading(true);
    try {
      const match = customUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (match) {
        const [, owner, repo] = match;
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents`
        );
        setFiles(response.data.filter(file => 
          file.name.endsWith('.tf') || 
          file.name.endsWith('.json') || 
          file.name.endsWith('.yaml') ||
          file.name.endsWith('.yml')
        ));
        setSelectedRepo({ owner, repo, path: '' });
      }
    } catch (error) {
      console.error('Error loading custom repo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    try {
      const response = await axios.get(file.download_url);
      onFileSelect({
        ...file,
        content: response.data
      });
    } catch (error) {
      console.error('Error loading file content:', error);
    }
  };

  const handleLocalFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileSelect({
        name: file.name,
        size: file.size,
        content: content,
        download_url: null,
        sha: 'local-' + Date.now()
      });
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        onFileSelect({
          name: file.name,
          size: file.size,
          content: content,
          download_url: null,
          sha: 'local-' + Date.now()
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="github-browser">
      <div className="browser-header">
        <h3>Select Infrastructure File</h3>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${view === 'default' ? 'active' : ''}`}
            onClick={() => setView('default')}
          >
            Sample Files
          </button>
          <button 
            className={`toggle-btn ${view === 'upload' ? 'active' : ''}`}
            onClick={() => setView('upload')}
          >
            Upload File
          </button>
          <button 
            className={`toggle-btn ${view === 'custom' ? 'active' : ''}`}
            onClick={() => setView('custom')}
          >
            Custom Repo
          </button>
        </div>
      </div>

      {view === 'upload' && (
        <div 
          className="upload-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <h4>Upload Infrastructure File</h4>
            <p>Drag and drop your file here, or click to browse</p>
            <input
              type="file"
              accept=".tf,.json,.yaml,.yml"
              onChange={handleLocalFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-button">
              Browse Files
            </label>
            <div className="file-types">
              Supported: .tf, .json, .yaml, .yml
            </div>
          </div>
          {selectedFile && selectedFile.sha && selectedFile.sha.startsWith('local-') && (
            <div className="selected-file-preview">
              <div className="file-preview-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                  <polyline points="13 2 13 9 20 9"/>
                </svg>
                <span>{selectedFile.name}</span>
                <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="file-preview-info">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'custom' && (
        <div className="custom-repo-input">
          <input
            type="text"
            placeholder="https://github.com/username/repository"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="form-input"
          />
          <button onClick={loadCustomRepo} className="load-button">
            Load Repository
          </button>
        </div>
      )}

      {view !== 'upload' && (
        <div className="file-list">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading files...</p>
            </div>
          ) : (
            <>
              {files.length === 0 ? (
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                  </svg>
                  <p>No infrastructure files found</p>
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.sha}
                    className={`file-item ${selectedFile?.sha === file.sha ? 'selected' : ''}`}
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="file-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                        <polyline points="13 2 13 9 20 9"/>
                      </svg>
                    </div>
                    <div className="file-info">
                      <div className="file-name">{file.name}</div>
                      <div className="file-meta">
                        {(file.size / 1024).toFixed(1)} KB
                        {file.name.endsWith('.tf') && <span className="badge">Terraform</span>}
                        {file.name.endsWith('.json') && <span className="badge">CloudFormation</span>}
                        {(file.name.endsWith('.yaml') || file.name.endsWith('.yml')) && <span className="badge">YAML</span>}
                      </div>
                    </div>
                    {selectedFile?.sha === file.sha && (
                      <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GitHubFileBrowser;

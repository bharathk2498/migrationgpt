import React from 'react';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <h3>Analyzing Infrastructure</h3>
        <p>AI agents are processing your infrastructure files...</p>
        <div className="loading-steps">
          <div className="step active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Parsing infrastructure configuration
          </div>
          <div className="step active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Running security scans
          </div>
          <div className="step">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Generating cost estimates
          </div>
          <div className="step">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Creating migration plan
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;

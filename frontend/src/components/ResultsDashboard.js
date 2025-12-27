import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ResultsDashboard({ results, projectName }) {
  if (!results) return null;

  const riskColor = results.risk_score > 70 ? '#ef4444' : results.risk_score > 40 ? '#f59e0b' : '#10b981';
  const riskLevel = results.risk_score > 70 ? 'High' : results.risk_score > 40 ? 'Medium' : 'Low';

  const costData = [
    { name: 'Migration', value: results.estimated_cost * 0.6 },
    { name: 'Testing', value: results.estimated_cost * 0.2 },
    { name: 'Training', value: results.estimated_cost * 0.1 },
    { name: 'Contingency', value: results.estimated_cost * 0.1 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  const timelineData = [
    { phase: 'Discovery', weeks: Math.ceil(results.timeline_weeks * 0.15) },
    { phase: 'Planning', weeks: Math.ceil(results.timeline_weeks * 0.15) },
    { phase: 'Execution', weeks: Math.ceil(results.timeline_weeks * 0.4) },
    { phase: 'Testing', weeks: Math.ceil(results.timeline_weeks * 0.2) },
    { phase: 'Cutover', weeks: Math.ceil(results.timeline_weeks * 0.1) },
  ];

  return (
    <div className="results-dashboard">
      {/* Executive Summary */}
      <div className="dashboard-header">
        <div className="header-info">
          <h2>{projectName || 'Migration Assessment'}</h2>
          <p className="analysis-id">Analysis ID: {results.analysis_id}</p>
        </div>
        <div className="header-actions">
          <button className="export-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Report
          </button>
          <button className="share-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card" style={{ borderColor: riskColor }}>
          <div className="metric-icon" style={{ backgroundColor: `${riskColor}20`, color: riskColor }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-label">Risk Assessment</div>
            <div className="metric-value" style={{ color: riskColor }}>
              {results.risk_score}/100
            </div>
            <div className="metric-badge" style={{ backgroundColor: `${riskColor}20`, color: riskColor }}>
              {riskLevel} Risk
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2v20M2 12h20"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-label">Security Findings</div>
            <div className="metric-value">{results.findings_count}</div>
            <div className="metric-subtitle">Issues identified</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-label">Estimated Cost</div>
            <div className="metric-value">${(results.estimated_cost / 1000).toFixed(0)}K</div>
            <div className="metric-subtitle">Total investment</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-label">Timeline</div>
            <div className="metric-value">{results.timeline_weeks} weeks</div>
            <div className="metric-subtitle">Estimated duration</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Migration Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="phase" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="weeks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="details-grid">
        {/* Security Findings */}
        <div className="detail-card">
          <div className="detail-header">
            <h3>Security Analysis</h3>
            <span className="badge badge-critical">{results.findings_count} Findings</span>
          </div>
          <div className="findings-list">
            <div className="finding-item critical">
              <div className="finding-badge">CRITICAL</div>
              <div className="finding-content">
                <h4>Unencrypted Storage Detected</h4>
                <p>Database and S3 buckets lack encryption at rest</p>
              </div>
            </div>
            <div className="finding-item high">
              <div className="finding-badge">HIGH</div>
              <div className="finding-content">
                <h4>Public Database Access</h4>
                <p>RDS instance is publicly accessible from internet</p>
              </div>
            </div>
            <div className="finding-item high">
              <div className="finding-badge">HIGH</div>
              <div className="finding-content">
                <h4>Overly Permissive Security Groups</h4>
                <p>SSH port 22 open to 0.0.0.0/0</p>
              </div>
            </div>
            <div className="finding-item medium">
              <div className="finding-badge">MEDIUM</div>
              <div className="finding-content">
                <h4>Weak Password Management</h4>
                <p>Hardcoded credentials in infrastructure code</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="detail-card">
          <div className="detail-header">
            <h3>Key Recommendations</h3>
          </div>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <div className="recommendation-icon priority-high">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="recommendation-content">
                <h4>Enable Encryption</h4>
                <p>Implement AES-256 encryption for all storage resources</p>
                <div className="recommendation-meta">
                  <span>Impact: High</span>
                  <span>Effort: Low</span>
                  <span>Timeline: 1-2 days</span>
                </div>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="recommendation-icon priority-high">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="recommendation-content">
                <h4>Restrict Network Access</h4>
                <p>Implement VPC-only access for database resources</p>
                <div className="recommendation-meta">
                  <span>Impact: Critical</span>
                  <span>Effort: Medium</span>
                  <span>Timeline: 2-3 days</span>
                </div>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="recommendation-icon priority-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="recommendation-content">
                <h4>Implement Secrets Management</h4>
                <p>Use AWS Secrets Manager for credential storage</p>
                <div className="recommendation-meta">
                  <span>Impact: High</span>
                  <span>Effort: Medium</span>
                  <span>Timeline: 3-5 days</span>
                </div>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="recommendation-icon priority-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="recommendation-content">
                <h4>Enable Multi-AZ Deployment</h4>
                <p>Configure high availability across availability zones</p>
                <div className="recommendation-meta">
                  <span>Impact: Medium</span>
                  <span>Effort: Low</span>
                  <span>Timeline: 1 week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="action-section">
        <h3>Next Steps</h3>
        <div className="action-grid">
          <div className="action-card">
            <div className="action-number">1</div>
            <div className="action-content">
              <h4>Review Findings</h4>
              <p>Prioritize critical and high-severity issues</p>
            </div>
          </div>
          <div className="action-card">
            <div className="action-number">2</div>
            <div className="action-content">
              <h4>Create Remediation Plan</h4>
              <p>Develop timeline for addressing security gaps</p>
            </div>
          </div>
          <div className="action-card">
            <div className="action-number">3</div>
            <div className="action-content">
              <h4>Stakeholder Review</h4>
              <p>Present findings to leadership and get approval</p>
            </div>
          </div>
          <div className="action-card">
            <div className="action-number">4</div>
            <div className="action-content">
              <h4>Begin Migration</h4>
              <p>Execute phased migration with continuous validation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsDashboard;

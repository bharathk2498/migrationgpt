# MigrationGPT Architecture

## System Overview

MigrationGPT is a multi-tier application designed for cloud migration assessment using AI-powered analysis.

## Architecture Diagram

```
┌─────────────────────────────────┐
│     Frontend (React + Tailwind)    │
│   - File Upload Interface         │
│   - Results Dashboard              │
│   - Interactive Visualizations     │
└──────────────┬──────────────────┘
                │
                │ HTTP/REST
                │
┌───────────────┴──────────────────┐
│     Backend API (FastAPI)          │
│   - File Processing                │
│   - Orchestration Layer            │
│   - Response Formatting            │
└──────────────┬──────────────────┘
                │
       ┌────────┼────────┐
       │                │
┌──────┴─────┐  ┌────┴───────┐
│  Analyzers   │  │   Agents    │
│             │  │             │
│ - Infra     │  │ - Security  │
│ - Code      │  │ - Cost      │
│ - Security  │  │ - Architect │
│             │  │ - Migration │
└─────────────┘  └─────────────┘
       │                │
       └────────┬────────┘
                │
    ┌───────────┼───────────┐
    │                            │
┌───┴────────┐  ┌──────┴───────┐
│  AWS Bedrock  │  │  Pinecone    │
│  (Claude AI) │  │  (Vector DB) │
└─────────────┘  └─────────────┘
```

## Component Details

### Frontend Layer
- **Technology**: React 18, Tailwind CSS
- **Responsibilities**:
  - File upload interface
  - Real-time analysis status
  - Results visualization
  - Report downloads

### API Layer
- **Technology**: FastAPI (Python 3.11)
- **Responsibilities**:
  - Request validation
  - File processing
  - Agent orchestration
  - Response formatting

### Analyzers
1. **Infrastructure Analyzer**
   - Parses Terraform, CloudFormation
   - Extracts resource definitions
   - Identifies dependencies

2. **Code Analyzer**
   - Multi-language support
   - Complexity metrics
   - Dependency extraction

3. **Security Scanner**
   - OWASP Top 10 checks
   - CIS Benchmarks
   - Compliance validation

### AI Agents
1. **Security Agent**
   - Risk assessment
   - Vulnerability prioritization
   - Remediation recommendations

2. **Cost Agent**
   - Migration cost estimation
   - Operational cost projection
   - Optimization opportunities

3. **Architecture Agent**
   - Cloud service mapping
   - Modernization suggestions
   - IaC template generation

4. **Migration Agent**
   - Timeline calculation
   - Resource planning
   - Runbook generation

### External Services
- **AWS Bedrock**: AI model inference (Claude 3.5 Sonnet)
- **Pinecone**: Vector database for RAG
- **Redis**: Caching and session management

## Data Flow

1. User uploads infrastructure file
2. API receives and validates file
3. Infrastructure Analyzer parses configuration
4. Security Scanner identifies vulnerabilities
5. AI Agents perform deep analysis:
   - Security assessment
   - Cost estimation
   - Architecture recommendations
   - Migration planning
6. Report Generator creates outputs
7. Frontend displays results
8. User downloads detailed reports

## Security Architecture

- File upload validation
- Input sanitization
- API rate limiting
- Secure file storage
- Encrypted data transfer
- CORS protection

## Scalability

- Horizontal scaling via containers
- Async processing for large files
- Caching layer for repeated analyses
- Load balancing ready
- Database connection pooling

## Deployment Architecture

```
┌────────────────────────────────┐
│      Load Balancer / CDN          │
└────────────┬───────────────────┘
              │
     ┌────────┼────────┐
     │                │
┌────┴────┐     ┌────┴─────┐
│ Frontend │     │  Backend  │
│Container │     │Containers│
│  (ECS)   │     │  (ECS)    │
└──────────┘     └────┬─────┘
                         │
              ┌──────────┼──────────┐
              │                       │
        ┌─────┴─────┐       ┌────┴─────┐
        │    S3     │       │   Redis   │
        │  Storage  │       │   Cache   │
        └──────────┘       └──────────┘
```

## Technology Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Tailwind CSS, Axios |
| Backend | FastAPI, Python 3.11, Uvicorn |
| AI | AWS Bedrock (Claude 3.5 Sonnet) |
| Vector DB | Pinecone |
| Cache | Redis |
| Container | Docker, Docker Compose |
| IaC | Terraform (future) |

## Performance Targets

- API Response Time: < 200ms (excluding analysis)
- Analysis Time: 2-5 minutes
- Concurrent Users: 100+
- Uptime: 99.9%
- File Size Limit: 100MB

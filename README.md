# MigrationGPT

> AI-Powered Cloud Migration Assessment Tool

Transform legacy infrastructure analysis from 40+ hours to 8 minutes with intelligent automation.

## Overview

MigrationGPT uses multi-agent AI systems to analyze infrastructure, assess migration complexity, and generate production-ready proposals that would take senior architects weeks to create.

## Key Features

### Intelligent Analysis
- **Infrastructure Parsing** - Terraform, CloudFormation, ARM templates
- **Code Analysis** - .NET, Java, Python, Node.js applications
- **Security Scanning** - OWASP Top 10, CIS Benchmarks, compliance checks
- **Cost Estimation** - Accurate migration and operational cost projections

### Multi-Agent AI System
- **Security Agent** - Vulnerability detection and risk scoring
- **Cost Agent** - Financial modeling and optimization
- **Architecture Agent** - Cloud-native design recommendations
- **Migration Agent** - Detailed execution plans and timelines

### Professional Outputs
- Executive summaries for C-suite
- Technical assessments for architects
- Migration playbooks with week-by-week plans
- Client-ready PDF proposals
- Interactive dashboards

## Quick Start

### Prerequisites
- Python 3.11+
- Docker and Docker Compose
- AWS Account (for Bedrock)
- Node.js 18+ (for frontend)

### Installation

```bash
# Clone repository
git clone https://github.com/bharathk2498/migrationgpt.git
cd migrationgpt

# Configure environment
cp .env.example .env
# Edit .env with your AWS credentials

# Run with Docker
docker-compose up -d
```

### Access Points
- **Frontend Dashboard**: http://localhost:3000
- **API Endpoint**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Architecture

```
migrationgpt/
├── backend/           # FastAPI application
│   ├── agents/        # Multi-agent AI system
│   ├── analyzers/     # Infrastructure & code analysis
│   ├── generators/    # Report & proposal generation
│   └── utils/         # AI client, vector store
├── frontend/          # React dashboard
├── docker/            # Container configs
└── docs/              # Documentation
```

## Technology Stack

**Backend**
- FastAPI (Python 3.11)
- AWS Bedrock (Claude 3.5 Sonnet)
- Pinecone (Vector database)
- Docker

**Frontend**
- React 18
- Tailwind CSS 3
- Recharts
- Axios

## Usage

### API Example

```python
import requests

# Upload infrastructure files
files = {'file': open('infrastructure.tf', 'rb')}
response = requests.post(
    'http://localhost:8000/api/analyze',
    files=files,
    data={'project_name': 'my-migration'}
)

analysis = response.json()
print(f"Risk Score: {analysis['risk_score']}")
print(f"Estimated Cost: ${analysis['cost_estimate']}")
```

### Dashboard Workflow

1. Upload infrastructure files (Terraform, CloudFormation)
2. AI analyzes configuration in 2-5 minutes
3. View interactive risk assessment
4. Download professional PDF proposal
5. Export migration playbook

## Features Deep Dive

### Security Analysis
- Unencrypted storage detection
- Public exposure identification
- IAM policy validation
- Network segmentation review
- Compliance mapping (SOC2, HIPAA, PCI-DSS)

### Cost Optimization
- Right-sizing recommendations
- Reserved instance analysis
- Multi-cloud cost comparison
- 3-year TCO projections

### Migration Planning
- Dependency mapping
- Phase-by-phase roadmap
- Risk mitigation strategies
- Resource allocation
- Timeline with milestones

## API Endpoints

### Analysis
```
POST /api/analyze
- Upload infrastructure files
- Returns comprehensive analysis

GET /api/analysis/{id}
- Retrieve analysis by ID

GET /api/analysis/{id}/report
- Download PDF report
```

### Health & Monitoring
```
GET /health
- System health check

GET /metrics
- Performance metrics
```

## Configuration

### Environment Variables

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# AI Configuration
BEDROCK_MODEL=anthropic.claude-3-5-sonnet-20241022-v2:0
OPENAI_API_KEY=fallback_key

# Vector Database
PINECONE_API_KEY=your_key
PINECONE_ENVIRONMENT=us-east-1

# Application
ENVIRONMENT=production
LOG_LEVEL=INFO
```

## Performance

- **Analysis Time**: 2-5 minutes for typical infrastructure
- **Accuracy**: 85%+ in vulnerability detection
- **Throughput**: 100+ concurrent analyses
- **Uptime**: 99.9% availability target

## Roadmap

- [ ] Multi-cloud support (Azure, GCP)
- [ ] Real-time collaboration
- [ ] Integration with JIRA/ServiceNow
- [ ] Continuous monitoring post-migration
- [ ] Mobile application
- [ ] API rate limiting and authentication

## Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## License

MIT License - see LICENSE file

## Author

**Bharath K**  
AI Transformation Architect  
15+ years building production security and cloud systems

- GitHub: [@bharathk2498](https://github.com/bharathk2498)
- LinkedIn: [Bharath K](https://linkedin.com/in/bharathk2498)

## Support

For issues and questions:
- GitHub Issues: [migrationgpt/issues](https://github.com/bharathk2498/migrationgpt/issues)
- Email: bharath@example.com

---

**Built with ❤️ for cloud migration teams worldwide**

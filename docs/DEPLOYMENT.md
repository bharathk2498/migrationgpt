# Deployment Guide

## Local Development

### Prerequisites
- Docker & Docker Compose
- Python 3.11+
- Node.js 18+
- AWS Account (for Bedrock)

### Quick Start

1. Clone repository
```bash
git clone https://github.com/bharathk2498/migrationgpt.git
cd migrationgpt
```

2. Configure environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Start services
```bash
docker-compose up -d
```

4. Access application
- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Production Deployment

### AWS ECS Deployment

#### Architecture
```
ALB -> ECS Fargate -> S3/RDS/Redis
```

#### Steps

1. Build Docker images
```bash
docker build -t migrationgpt-backend:latest ./backend
docker build -t migrationgpt-frontend:latest ./frontend
```

2. Push to ECR
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker tag migrationgpt-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/migrationgpt-backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/migrationgpt-backend:latest
```

3. Create ECS Task Definition
4. Deploy ECS Service
5. Configure ALB
6. Set up Auto Scaling

---

### Environment Variables

#### Required
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
BEDROCK_MODEL=anthropic.claude-3-5-sonnet-20241022-v2:0
```

#### Optional
```
PINECONE_API_KEY=your_key
OPENAI_API_KEY=your_key
REDIS_URL=redis://localhost:6379
```

---

### Security Checklist

- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up API authentication
- [ ] Enable rate limiting
- [ ] Configure CloudWatch logging
- [ ] Set up AWS WAF
- [ ] Enable encryption at rest
- [ ] Configure VPC security groups
- [ ] Set up secrets management
- [ ] Enable backup strategy

---

### Monitoring

#### CloudWatch Metrics
- API response times
- Error rates
- Request counts
- Resource utilization

#### Logging
- Application logs -> CloudWatch Logs
- Access logs -> S3
- Error tracking -> Sentry (optional)

---

### Scaling Strategy

#### Horizontal Scaling
```yaml
service:
  desired_count: 2
  min_count: 2
  max_count: 10
  
  scaling:
    cpu_threshold: 70%
    memory_threshold: 80%
```

#### Caching
- Redis for session management
- CloudFront for static assets
- API response caching

---

### Backup & Recovery

#### Data Backup
- S3 versioning enabled
- Redis persistence
- Database snapshots (if applicable)

#### Disaster Recovery
- Multi-AZ deployment
- Automated failover
- Regular restore testing

---

### Cost Optimization

- Use Fargate Spot for non-production
- Enable auto-scaling
- S3 lifecycle policies
- Reserved instances for stable workloads
- Monitor AWS Bedrock usage

---

### Maintenance

#### Regular Tasks
- Update dependencies monthly
- Review CloudWatch alarms
- Rotate credentials quarterly
- Test disaster recovery
- Performance optimization

#### Updates
```bash
# Pull latest code
git pull origin main

# Rebuild images
docker-compose build

# Deploy with zero downtime
docker-compose up -d --no-deps --build backend
```

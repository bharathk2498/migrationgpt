# \ud83c\udf89 Zero-Configuration Setup

## MigrationGPT Works Immediately - No Setup Required!

### \u26a1 The Fastest Way to Start

**2 commands. No credentials. No configuration. Just works.**

```bash
git clone https://github.com/bharathk2498/migrationgpt.git
cd migrationgpt && ./start.sh
```

**Open:** http://localhost:3000

**Done!** \ud83d\ude80

---

## What Makes This Special?

### ✅ No AWS Account Needed
- Demo mode uses mock AI
- Realistic responses
- Full functionality
- Zero cost

### ✅ No API Keys Required
- Works out of the box
- Pre-configured
- Sample data included
- Ready to demo

### ✅ No Environment Setup
- Docker handles everything
- All dependencies included
- Cross-platform (Mac/Linux/Windows)
- One command start

---

## What You Get Instantly

### Working Application
- ✅ Web dashboard at port 3000
- ✅ REST API at port 8000
- ✅ Interactive API docs
- ✅ Sample files ready to test
- ✅ Full AI analysis (mock mode)

### Complete Features
- ✅ Infrastructure analysis
- ✅ Security scanning
- ✅ Cost estimation
- ✅ Migration planning
- ✅ Report generation

---

## Try It Now

### Method 1: Web Interface

```bash
# Start
./start.sh

# Open browser
http://localhost:3000

# Upload sample file
samples/sample-infrastructure.tf

# Click "Analyze"
# Get results in 30 seconds!
```

### Method 2: API Call

```bash
# After starting with ./start.sh

curl -X POST http://localhost:8000/api/analyze \
  -F "file=@samples/sample-infrastructure.tf" \
  -F "project_name=quick-test"
```

---

## All Access URLs

After running `./start.sh`, these URLs work immediately:

| URL | What It Does |
|-----|--------------|
| http://localhost:3000 | Main dashboard |
| http://localhost:8000 | API endpoint |
| http://localhost:8000/docs | API documentation |
| http://localhost:8000/health | Health check |
| http://localhost:8000/metrics | System metrics |

---

## Sample Files Included

Test immediately with:

```
samples/
├── sample-infrastructure.tf      # Terraform example
├── sample-cloudformation.json    # AWS CloudFormation
└── README.md                     # Details
```

Each file has intentional security issues for realistic testing.

---

## Expected Results

When you analyze the sample files, you'll see:

**Security Analysis:**
- Risk Score: 70-80/100
- 12-15 security findings
- Categorized by severity
- Remediation steps

**Cost Estimate:**
- Migration cost: $250K-$350K
- Monthly ops: $10K-$15K
- 3-year TCO projection
- Optimization opportunities

**Migration Plan:**
- Timeline: 18-22 weeks
- Phased approach
- Resource requirements
- Risk mitigation

**Architecture:**
- Cloud-native recommendations
- Modernization opportunities
- Service mappings
- IaC templates

---

## Why Demo Mode?

### Perfect For:
- ✅ Learning the tool
- ✅ Testing features
- ✅ Presentations to stakeholders
- ✅ Development and debugging
- ✅ CI/CD integration testing

### Advantages:
- ✅ Instant results (30 seconds)
- ✅ No external dependencies
- ✅ No costs
- ✅ Consistent output
- ✅ Always available

---

## Upgrade to Production Mode (Optional)

When you're ready for real AI analysis:

1. Get AWS credentials
2. Edit `docker-compose.yml`:
```yaml
environment:
  - DEMO_MODE=false
  - AWS_ACCESS_KEY_ID=your_key
  - AWS_SECRET_ACCESS_KEY=your_secret
```
3. Restart: `docker-compose restart backend`

**You get:**
- Real AWS Bedrock AI (Claude 3.5 Sonnet)
- Highly accurate analysis
- Production-grade results
- Custom insights

---

## Complete Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Detailed setup guide
- **[README.md](README.md)** - Full documentation
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design
- **[docs/API.md](docs/API.md)** - API reference
- **[samples/README.md](samples/README.md)** - Sample file guide

---

## Troubleshooting

### Docker not running?
```bash
# Start Docker Desktop, then:
./start.sh
```

### Port conflict?
```bash
# Edit docker-compose.yml
# Change ports 3000→3001, 8000→8001
```

### Need help?
```bash
# Check logs
docker-compose logs -f

# Check status
docker-compose ps

# Restart everything
docker-compose restart
```

---

## The Promise

**Clone → Run → Analyze**

No setup. No configuration. No credentials needed.

Everything works in **under 3 minutes**.

---

## Star the Project! ⭐

If this saved you time:

https://github.com/bharathk2498/migrationgpt

---

*Built with ❤️ for developers who value their time*

# 🚀 MigrationGPT - Quick Start Guide

## ⚡ 2-Minute Setup (Really!)

### Step 1: Clone
```bash
git clone https://github.com/bharathk2498/migrationgpt.git
cd migrationgpt
```

### Step 2: Start

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

**OR use Docker Compose directly:**
```bash
docker-compose up -d
```

### Step 3: Open Browser
```
http://localhost:3000
```

**Done!** 🎉

---

## ✅ What Just Happened?

1. **Docker containers started** (3 services)
2. **Demo mode activated** (no credentials needed!)
3. **Web interface ready** at port 3000
4. **API ready** at port 8000
5. **Redis cache running** at port 6379

---

## 🔗 All Access URLs

| Service | URL | What It Does |
|---------|-----|-------------|
| 📊 Dashboard | http://localhost:3000 | Upload files & view results |
| 🚀 API | http://localhost:8000 | REST API endpoint |
| 📖 API Docs | http://localhost:8000/docs | Interactive API documentation |
| ❤️ Health | http://localhost:8000/health | Check if backend is running |
| 📊 Metrics | http://localhost:8000/metrics | System performance stats |

---

## 🎯 First Analysis (3 Minutes)

### Option A: Web Interface (Easiest!)

1. Open http://localhost:3000
2. Enter project name: **"My First Analysis"**
3. Click upload area
4. Select: **`samples/sample-infrastructure.tf`**
5. Click **"Analyze Infrastructure"**
6. Wait 30 seconds
7. See results! 🎉

**You'll see:**
- Risk Score: ~72/100
- Findings: ~15 security issues
- Cost: ~$340,000
- Timeline: ~20 weeks

---

### Option B: Command Line (For Developers)

```bash
# Test with sample file
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@samples/sample-infrastructure.tf" \
  -F "project_name=cli-test" \
  -F "target_cloud=aws"
```

**Expected response:**
```json
{
  "analysis_id": "abc-123-def-456",
  "status": "completed",
  "risk_score": 72,
  "findings_count": 15,
  "estimated_cost": 340000,
  "timeline_weeks": 20
}
```

---

## 🔍 What's Running?

```bash
# Check all containers
docker-compose ps
```

**You should see:**
```
NAME                      STATUS    PORTS
migrationgpt-backend      running   0.0.0.0:8000->8000/tcp
migrationgpt-frontend     running   0.0.0.0:3000->3000/tcp
migrationgpt-redis        running   0.0.0.0:6379->6379/tcp
```

---

## 👀 View Logs

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend

# Last 50 lines
docker-compose logs --tail=50
```

---

## ⏸️ Stop/Start

```bash
# Stop (keeps data)
docker-compose stop

# Start again
docker-compose start

# Stop and remove (clean slate)
docker-compose down

# Restart specific service
docker-compose restart backend
```

---

## 🤔 Troubleshooting

### Problem: "Cannot connect to Docker"

**Solution:**
1. Start Docker Desktop
2. Wait for it to fully start
3. Try again: `./start.sh`

---

### Problem: "Port 3000 already in use"

**Solution:**
Edit `docker-compose.yml`, change port:
```yaml
frontend:
  ports:
    - "3001:3000"  # Changed from 3000 to 3001
```

Then access: http://localhost:3001

---

### Problem: "Backend not responding"

**Check logs:**
```bash
docker-compose logs backend | grep ERROR
```

**Restart:**
```bash
docker-compose restart backend
```

**Full rebuild:**
```bash
docker-compose down
docker-compose up -d --build
```

---

### Problem: "Frontend shows blank page"

**Clear cache and reload:**
- Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

**Check backend connection:**
```bash
curl http://localhost:8000/health
```

---

## 📊 Test Everything Is Working

### Quick Health Check

```bash
# 1. Backend health
curl http://localhost:8000/health
# Expected: {"status":"healthy", ...}

# 2. Frontend (should return HTML)
curl -I http://localhost:3000
# Expected: HTTP/1.1 200 OK

# 3. API docs
curl -I http://localhost:8000/docs
# Expected: HTTP/1.1 200 OK
```

### Full Test Script

Create `test.sh`:
```bash
#!/bin/bash

echo "Testing MigrationGPT..."
echo ""

echo "1. Backend Health:"
curl -s http://localhost:8000/health | python3 -m json.tool
echo ""

echo "2. Container Status:"
docker-compose ps
echo ""

echo "3. Test Analysis:"
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@samples/sample-infrastructure.tf" \
  -F "project_name=test" \
  | python3 -m json.tool

echo ""
echo "All tests completed!"
```

Run:
```bash
chmod +x test.sh
./test.sh
```

---

## 🎓 Next Steps

### 1. Try Different Files
```bash
samples/
├── sample-infrastructure.tf     # Terraform
├── sample-cloudformation.json   # CloudFormation
└── README.md                    # Details about samples
```

### 2. Explore API Documentation
Open: http://localhost:8000/docs
- Try different endpoints
- See request/response formats
- Test directly in browser

### 3. Review Architecture
Read: `docs/ARCHITECTURE.md`
- Understand the system
- See how components work
- Learn about AI agents

### 4. Enable Production Mode
Edit `docker-compose.yml`:
```yaml
environment:
  - DEMO_MODE=false  # Change this
  - AWS_REGION=us-east-1
  - AWS_ACCESS_KEY_ID=your_key
  - AWS_SECRET_ACCESS_KEY=your_secret
```

Restart:
```bash
docker-compose restart backend
```

---

## 💻 Common Use Cases

### Use Case 1: Analyze Your Own Infrastructure

1. Export your Terraform/CloudFormation
2. Upload via web interface
3. Get instant security & cost analysis
4. Download PDF report

### Use Case 2: Demo to Stakeholders

1. Use sample files (realistic results)
2. Show interactive dashboard
3. Walk through findings
4. Export professional reports

### Use Case 3: API Integration

1. Call API from your tools
2. Automate assessments
3. Integrate with CI/CD
4. Build custom workflows

---

## 🔐 Demo Mode vs Production Mode

| Feature | Demo Mode | Production Mode |
|---------|-----------|----------------|
| **Setup** | None needed | AWS credentials |
| **Speed** | 30 seconds | 2-5 minutes |
| **AI** | Mock responses | Real AWS Bedrock |
| **Cost** | Free | AWS charges apply |
| **Accuracy** | Realistic | Highly accurate |
| **Use For** | Testing, demos | Real analyses |

**Demo mode is perfect for:**
- Learning the tool
- Testing features
- Presentations
- Development

**Production mode for:**
- Real client work
- Accurate assessments
- Professional reports
- Critical decisions

---

## ❓ Getting Help

### Documentation
- **README**: Overview and features
- **ARCHITECTURE**: System design
- **API**: Endpoint reference
- **DEPLOYMENT**: Production setup

### Support
- **GitHub Issues**: https://github.com/bharathk2498/migrationgpt/issues
- **Discussions**: https://github.com/bharathk2498/migrationgpt/discussions

### Check Logs
```bash
# See what's happening
docker-compose logs -f

# Search for errors
docker-compose logs | grep ERROR

# Export logs to file
docker-compose logs > debug.log
```

---

## 🎉 Success!

You're now ready to:
- ✅ Analyze infrastructure files
- ✅ Review security findings
- ✅ Get cost estimates
- ✅ Generate migration plans
- ✅ Export professional reports

---

## 🚀 Quick Command Reference

```bash
# Start
./start.sh

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Restart
docker-compose restart

# Status
docker-compose ps

# Update
git pull && docker-compose up -d --build

# Clean everything
docker-compose down -v
```

---

## 👍 What's Next?

1. **Try the demo** with sample files
2. **Upload your own** infrastructure
3. **Explore the API** documentation
4. **Read the docs** to understand more
5. **Star the repo** if you find it useful! ⭐

---

**Happy Analyzing!** 🚀

*Built with ❤️ by Bharath K*

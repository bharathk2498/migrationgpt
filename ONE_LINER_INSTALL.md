# 🚀 One-Liner Installation

## Run MigrationGPT in One Command!

### Mac / Linux / WSL

```bash
curl -fsSL https://raw.githubusercontent.com/bharathk2498/migrationgpt/main/quick-start.sh | bash
```

**What this does:**
1. ✅ Checks Docker is running
2. ✅ Downloads MigrationGPT from GitHub
3. ✅ Extracts files
4. ✅ Starts all containers
5. ✅ Opens dashboard automatically

**Total time:** 2-3 minutes

---

### Windows (PowerShell)

```powershell
iwr -useb https://raw.githubusercontent.com/bharathk2498/migrationgpt/main/quick-start.bat | iex
```

**Or download and run:**

1. Download: [quick-start.bat](https://raw.githubusercontent.com/bharathk2498/migrationgpt/main/quick-start.bat)
2. Double-click to run
3. Wait 2-3 minutes
4. Open http://localhost:3000

---

## Alternative: Docker Run (No Installation)

### Frontend Only (Quick Demo)

```bash
docker run -d -p 3000:3000 --name migrationgpt-ui \
  -e REACT_APP_API_URL=http://localhost:8000 \
  migrationgpt-frontend:latest
```

### Full Stack (Frontend + Backend + Redis)

```bash
# Pull and run in one command
docker compose -f https://raw.githubusercontent.com/bharathk2498/migrationgpt/main/docker-compose.yml up -d
```

---

## GitHub Codespaces (Zero Local Install)

1. Go to: https://github.com/bharathk2498/migrationgpt
2. Click **Code** → **Codespaces** → **Create codespace**
3. Wait for environment to load
4. Run: `docker-compose up -d`
5. Open port 3000 when prompted

**Done!** Running in the cloud with zero local setup.

---

## StackBlitz / CodeSandbox (Browser Only)

### StackBlitz

```
https://stackblitz.com/github/bharathk2498/migrationgpt
```

Click the link → Instant dev environment in browser!

### CodeSandbox

```
https://codesandbox.io/p/github/bharathk2498/migrationgpt/main
```

---

## Gitpod (Cloud IDE)

### One-Click Launch

```
https://gitpod.io/#https://github.com/bharathk2498/migrationgpt
```

**Or add prefix to GitHub URL:**
```
gitpod.io/#https://github.com/bharathk2498/migrationgpt
```

---

## Replit (Instant Deployment)

1. Go to https://replit.com
2. Click **Import from GitHub**
3. Enter: `bharathk2498/migrationgpt`
4. Click **Import**
5. Click **Run**

**Live in 60 seconds!**

---

## Vercel / Netlify (Frontend Only)

### Vercel

```bash
npx vercel --prod
```

**Or one-click:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bharathk2498/migrationgpt)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bharathk2498/migrationgpt)

---

## Docker Hub (Pre-built Images)

### Pull and Run

```bash
# Frontend
docker pull bharathk2498/migrationgpt-frontend:latest
docker run -d -p 3000:3000 bharathk2498/migrationgpt-frontend:latest

# Backend
docker pull bharathk2498/migrationgpt-backend:latest
docker run -d -p 8000:8000 bharathk2498/migrationgpt-backend:latest
```

---

## Access URLs

Once running, access:

| Service | URL |
|---------|-----|
| **Dashboard** | http://localhost:3000 |
| **API** | http://localhost:8000 |
| **API Docs** | http://localhost:8000/docs |
| **Health Check** | http://localhost:8000/health |

---

## Requirements

### Minimum
- Docker Desktop installed
- 4GB RAM available
- 2GB disk space
- Internet connection

### Recommended
- 8GB RAM
- 5GB disk space
- Chrome/Firefox/Edge browser

---

## Troubleshooting

### "Docker is not running"
**Solution:** Start Docker Desktop and wait for it to be ready

### "Port already in use"
**Solution:** 
```bash
# Stop existing containers
docker stop $(docker ps -aq)

# Or change ports in docker-compose.yml
```

### "Download failed"
**Solution:**
```bash
# Manual clone
git clone https://github.com/bharathk2498/migrationgpt.git
cd migrationgpt
docker-compose up -d
```

---

## Quick Commands Reference

```bash
# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# Update to latest version
git pull origin main
docker-compose up -d --build

# Complete cleanup
docker-compose down -v
docker system prune -a
```

---

## Support

- **Issues:** https://github.com/bharathk2498/migrationgpt/issues
- **Discussions:** https://github.com/bharathk2498/migrationgpt/discussions
- **Email:** bharath@example.com

---

## Choose Your Method

| Method | Time | Local Install | Best For |
|--------|------|---------------|----------|
| **One-liner** | 2-3 min | Yes | Quick local setup |
| **Docker Run** | 1 min | Yes | Docker users |
| **Codespaces** | 3-4 min | No | Cloud development |
| **StackBlitz** | 30 sec | No | Instant preview |
| **Gitpod** | 2 min | No | Full cloud IDE |
| **Vercel** | 1 min | No | Frontend demo |

---

**Pick your favorite method and get started in minutes!** 🚀

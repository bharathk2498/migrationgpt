#!/bin/bash

# MigrationGPT - One-Command Installer
# Usage: curl -fsSL https://raw.githubusercontent.com/bharathk2498/migrationgpt/main/quick-start.sh | bash

set -e

echo "="
echo "  MigrationGPT - Quick Start"
echo "  AI-Powered Cloud Migration Assessment"
echo "="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "${RED}ERROR: Docker is not installed${NC}"
    echo "Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "${RED}ERROR: Docker is not running${NC}"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo "${GREEN}✓${NC} Docker is running"
echo ""

# Create temporary directory
TMP_DIR="$HOME/migrationgpt-tmp"
if [ -d "$TMP_DIR" ]; then
    echo "${YELLOW}Removing existing installation...${NC}"
    rm -rf "$TMP_DIR"
fi

mkdir -p "$TMP_DIR"
cd "$TMP_DIR"

echo "${BLUE}Downloading MigrationGPT...${NC}"
curl -L https://github.com/bharathk2498/migrationgpt/archive/refs/heads/main.zip -o migrationgpt.zip

echo "${BLUE}Extracting files...${NC}"
unzip -q migrationgpt.zip
cd migrationgpt-main

echo ""
echo "${BLUE}Starting MigrationGPT...${NC}"
echo "This will take 2-3 minutes on first run..."
echo ""

docker-compose up -d --build

echo ""
echo "${GREEN}═══════════════════════════════════${NC}"
echo "${GREEN}  MigrationGPT is now running!${NC}"
echo "${GREEN}═══════════════════════════════════${NC}"
echo ""
echo "Access the application:"
echo ""
echo "  ${BLUE}Dashboard:${NC}    http://localhost:3000"
echo "  ${BLUE}API:${NC}          http://localhost:8000"
echo "  ${BLUE}API Docs:${NC}     http://localhost:8000/docs"
echo ""
echo "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Test backend
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "${GREEN}✓${NC} Backend is ready!"
else
    echo "${YELLOW}⏳${NC} Backend is still starting (this is normal on first run)"
    echo "   It may take 1-2 more minutes"
fi

echo ""
echo "${GREEN}═══════════════════════════════════${NC}"
echo "${GREEN}  Ready to use!${NC}"
echo "${GREEN}═══════════════════════════════════${NC}"
echo ""
echo "Quick commands:"
echo "  View logs:     docker-compose logs -f"
echo "  Stop:          docker-compose down"
echo "  Restart:       docker-compose restart"
echo ""
echo "Installation directory: $TMP_DIR/migrationgpt-main"
echo ""
echo "${BLUE}Open http://localhost:3000 in your browser now!${NC}"
echo ""

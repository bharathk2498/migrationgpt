#!/bin/bash

echo "====================================="
echo "  MigrationGPT - Quick Start Script  "
echo "====================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✓ Docker is running"
echo ""

echo "Starting MigrationGPT in DEMO MODE..."
echo "(No AWS credentials needed!)"
echo ""

# Stop any existing containers
docker-compose down 2>/dev/null

# Start services
echo "Building and starting containers..."
docker-compose up -d --build

if [ $? -eq 0 ]; then
    echo ""
    echo "====================================="
    echo "  MigrationGPT is now running!       "
    echo "====================================="
    echo ""
    echo "Access the application:"
    echo ""
    echo "  Frontend:    http://localhost:3000"
    echo "  API:         http://localhost:8000"
    echo "  API Docs:    http://localhost:8000/docs"
    echo ""
    echo "Waiting for services to start..."
    sleep 10
    
    echo ""
    echo "Testing backend..."
    curl -s http://localhost:8000/health > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✓ Backend is ready!"
    else
        echo "⏳ Backend is still starting up..."
        echo "   It may take 1-2 minutes on first run"
    fi
    
    echo ""
    echo "====================================="
    echo "  DEMO MODE ACTIVE                   "
    echo "====================================="
    echo ""
    echo "The application is running with:"
    echo "  • Mock AI responses (no AWS needed)"
    echo "  • Sample data and analyses"
    echo "  • Full functionality demonstration"
    echo ""
    echo "To view logs:"
    echo "  docker-compose logs -f"
    echo ""
    echo "To stop:"
    echo "  docker-compose down"
    echo ""
    echo "Happy analyzing! 🚀"
    echo ""
else
    echo ""
    echo "ERROR: Failed to start containers"
    echo "Check the logs with: docker-compose logs"
    exit 1
fi

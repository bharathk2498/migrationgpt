@echo off
echo =====================================
echo   MigrationGPT - Quick Start Script
echo =====================================
echo.

echo Checking Docker...
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Docker is running
echo.

echo Starting MigrationGPT in DEMO MODE...
echo No AWS credentials needed!
echo.

echo Stopping any existing containers...
docker-compose down >nul 2>&1

echo Building and starting containers...
docker-compose up -d --build

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start containers
    echo Check the logs with: docker-compose logs
    pause
    exit /b 1
)

echo.
echo =====================================
echo   MigrationGPT is now running!
echo =====================================
echo.
echo Access the application:
echo.
echo   Frontend:    http://localhost:3000
echo   API:         http://localhost:8000  
echo   API Docs:    http://localhost:8000/docs
echo.
echo Waiting for services to start...
timeout /t 10 >nul

echo.
echo Testing backend...
curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo Backend is still starting up...
    echo It may take 1-2 minutes on first run
) else (
    echo Backend is ready!
)

echo.
echo =====================================
echo   DEMO MODE ACTIVE
echo =====================================
echo.
echo The application is running with:
echo   - Mock AI responses no AWS needed
echo   - Sample data and analyses
echo   - Full functionality demonstration
echo.
echo To view logs:
echo   docker-compose logs -f
echo.
echo To stop:
echo   docker-compose down
echo.
echo Happy analyzing!
echo.
pause

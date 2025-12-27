@echo off
REM MigrationGPT - One-Command Windows Installer
REM Usage: Download and run this file

echo =====================================
echo   MigrationGPT - Quick Start
echo   AI-Powered Cloud Migration
echo =====================================
echo.

REM Check Docker
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    echo.
    echo Download Docker Desktop from:
    echo https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Create temp directory
set TMP_DIR=%USERPROFILE%\migrationgpt-tmp
if exist "%TMP_DIR%" (
    echo Removing existing installation...
    rmdir /s /q "%TMP_DIR%"
)

mkdir "%TMP_DIR%"
cd /d "%TMP_DIR%"

echo Downloading MigrationGPT...
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/bharathk2498/migrationgpt/archive/refs/heads/main.zip' -OutFile 'migrationgpt.zip'"

if errorlevel 1 (
    echo ERROR: Failed to download
    pause
    exit /b 1
)

echo Extracting files...
powershell -Command "Expand-Archive -Path 'migrationgpt.zip' -DestinationPath '.' -Force"

cd migrationgpt-main

echo.
echo Starting MigrationGPT...
echo This will take 2-3 minutes on first run...
echo.

docker-compose up -d --build

if errorlevel 1 (
    echo ERROR: Failed to start containers
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
echo   Dashboard:    http://localhost:3000
echo   API:          http://localhost:8000
echo   API Docs:     http://localhost:8000/docs
echo.
echo Waiting for services to start...
timeout /t 10 >nul

curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo Backend is still starting (normal on first run)
    echo It may take 1-2 more minutes
) else (
    echo Backend is ready!
)

echo.
echo =====================================
echo   Ready to use!
echo =====================================
echo.
echo Quick commands:
echo   View logs:     docker-compose logs -f
echo   Stop:          docker-compose down
echo   Restart:       docker-compose restart
echo.
echo Installation directory: %TMP_DIR%\migrationgpt-main
echo.
echo Open http://localhost:3000 in your browser now!
echo.
pause

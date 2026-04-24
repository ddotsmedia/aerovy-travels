@echo off
REM Aerovy Travels - one-click project launcher
REM Double-click this file to open the project in VS Code and prep Claude Code.
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1"
if errorlevel 1 (
  echo.
  echo Launcher reported an error. See messages above.
  pause
)

@echo off
title Aurelia Luxe - Luxury Handmade Marketplace
color 06
echo ============================================================
echo   AURELIA LUXE - LUXURY HANDMADE MARKETPLACE
echo ============================================================
echo   Starting local marketplace server on port 5173...
echo.

start "" powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1" -Port 5173
timeout /t 2 /nobreak >nul

echo   Opening marketplace in your default browser...
start http://localhost:5173/

echo.
echo   Platform is running live at: http://localhost:5173/
echo   Close this window or the PowerShell server window to stop.
echo ============================================================
pause

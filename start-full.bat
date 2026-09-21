@echo off
setlocal

title Aurelia Luxe - Full Stack Local Deployment
color 06

echo ============================================================
echo   AURELIA LUXE - FRONTEND + BACKEND LOCAL DEPLOY
echo ============================================================
echo   Frontend URL: http://localhost:5173/
echo   Backend URL:  http://localhost:8000/
echo.

if not exist "%~dp0backend\app\main.py" (
    echo ERROR: Backend folder not found.
    pause
    exit /b 1
)

rem Start frontend
start "FRONTEND" powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1" -Port 5173

timeout /t 2 /nobreak >nul

rem Start backend using venv if present, otherwise system python
if exist "%~dp0backend\.venv\Scripts\python.exe" (
    start "BACKEND" powershell -ExecutionPolicy Bypass -NoProfile -Command "cd /d '%~dp0backend'; .\.venv\Scripts\python.exe app/main.py"
) else (
    start "BACKEND" powershell -ExecutionPolicy Bypass -NoProfile -Command "cd /d '%~dp0backend'; python app/main.py"
)

timeout /t 3 /nobreak >nul

start http://localhost:5173/

 echo.
 echo ============================================================
 echo   APPLICATION IS RUNNING
 echo   Frontend: http://localhost:5173/
 echo   Backend:  http://localhost:8000/
 echo   API Docs: http://localhost:8000/
 echo ============================================================
 echo   Close the PowerShell windows to stop the app.
 echo ============================================================

pause

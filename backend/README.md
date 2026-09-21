# Aurelia Luxe Backend

This folder contains the Python + SQL backend for Aurelia Luxe using Flask and SQLite.

## Stack

- Python
- Flask
- SQLAlchemy
- SQLite

## Start locally

1. Open PowerShell in this folder.
2. Create a virtual environment:
   py -m venv .venv
3. Activate it:
   .\.venv\Scripts\Activate.ps1
4. Install dependencies:
   pip install -r requirements.txt
5. Start the API:
   python app/main.py

## API routes

- GET /
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/shops
- POST /api/products

## Database

- SQLite file: backend/aurelia.db
- SQLAlchemy models are created automatically on app startup.

# SimpleFi - AI-Powered Accounting System

A modern accounting application that leverages AI to streamline financial operations. Built with React.js (frontend) and Python (backend).

## Features

- Accounts Payable Management
- Accounts Receivable Tracking
- Bank Reconciliation
- AI-Powered Financial Analysis
- Document Processing & OCR
- Financial Reporting

## Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI
- Redux Toolkit
- React Query

### Backend
- Python 3.9+
- FastAPI
- SQLAlchemy
- OpenAI Integration
- PostgreSQL

## Setup Instructions

### Frontend Setup
1. Navigate to the `frontend` directory
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

### Backend Setup
1. Navigate to the `backend` directory
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Start the backend server:
```bash
uvicorn main:app --reload
```

## Environment Variables

Create `.env` files in both frontend and backend directories with the following variables:

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/simplefi
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```
simplefi/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── store/        # Redux store
├── backend/               # Python backend
│   ├── app/
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
│   └── tests/            # Backend tests
``` 
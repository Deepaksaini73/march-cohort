# Travel Planning Application

This application connects a React frontend (Next.js) with a Python backend (FastAPI) to provide travel planning services.

## Features

- Search for travel destinations
- View weather forecasts
- Find hotels with pricing information
- Get restaurant recommendations
- Plan multi-day trips

## Project Structure

```
project/
├── backend/               # Python FastAPI backend
│   ├── app.py             # Main FastAPI application
│   └── requirements.txt   # Backend dependencies
│
├── frontend/              # Next.js frontend
│   ├── app/               # Next.js app directory
│   │   ├── components/    # React components
│   │   │   └── search/    # Search-related components
│   │   │       ├── SearchForm.tsx    # Search form component
│   │   │       └── SearchResults.tsx # Results display component
│   │   └── ...
│   └── ...
│
├── main.py                # Core Python functionality
├── travel_dataset.csv     # Dataset with travel information
└── requirements.txt       # Project dependencies
```

## Setup and Installation

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Install the required Python packages:

```bash
pip install -r requirements.txt
```

2. Start the FastAPI backend:

```bash
cd backend
uvicorn app:app --reload
```

The backend API will be available at http://localhost:8000.

### Frontend Setup

1. Install the Node.js dependencies:

```bash
cd frontend
npm install
# or 
yarn install
```

2. Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
```

The frontend will be available at http://localhost:3000.

## API Endpoints

- `POST /api/trip` - Generate a trip plan with weather and hotel information

## Integrations

This application integrates with:

- OpenWeatherMap API for weather forecasts
- Booking.com API via RapidAPI for hotel information
- Google Places API for restaurant data

You'll need to supply your own API keys for these services in a production environment.

## Note on API Keys

The application currently includes API keys for demonstration purposes. In a production environment, you should:

1. Create a `.env` file to store these keys securely
2. Never commit API keys to version control
3. Use environment variables to access these keys in the application 
# Tour Search API Backend

Backend service for the tour search application, providing a secure interface to the Google Places API.

## Features

- Secure API key handling
- Rate limiting to prevent abuse
- CORS configuration for secure frontend communication
- Endpoints for place search, autocomplete, details, photos, and more

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Google Places API key

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

### Running the Server

Development mode with auto-restart:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Search Places
```
GET /api/places/search
```
Query parameters:
- `query` (required): Search term
- `type` (optional): Place type (e.g., 'tourist_attraction')
- `location` (optional): Coordinates in format 'lat,lng'
- `radius` (optional): Search radius in meters (default: 50000)

### Autocomplete
```
GET /api/places/autocomplete
```
Query parameters:
- `input` (required): Partial search text
- `types` (optional): Types of results (default: 'establishment')

### Place Details
```
GET /api/places/details
```
Query parameters:
- `placeId` (required): Google Places ID

### Photos
```
GET /api/places/photos
```
Query parameters:
- `photoReference` (required): Google Places photo reference
- `maxWidth` (optional): Maximum width of the photo (default: 400)

### Popular Destinations
```
GET /api/places/popular
```
Returns a selection of popular tourist destinations.

### Category Search
```
GET /api/places/category
```
Query parameters:
- `category` (required): Category name (e.g., 'adventure', 'cultural', 'beach')

## Security

- The server implements rate limiting to prevent abuse
- API keys are kept secure and never exposed to the client
- Helmet.js is used for setting secure HTTP headers

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (invalid parameters)
- 429: Too Many Requests (rate limit exceeded)
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2023-06-16T12:34:56.789Z"
}
```

## Caching

The API implements in-memory caching to reduce the number of calls to the Google Places API. Default cache durations:
- Regular searches: 1 hour
- Autocomplete: 30 minutes 
- Popular destinations: 24 hours 
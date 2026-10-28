# IMovies — Movie Ticket Booking

A React + Express + MongoDB starter for browsing movies, choosing showtimes, selecting seats, and booking tickets.

## Requirements
- Node.js 18+ (Node.js 16 may work with compatible dependency versions)
- npm
- MongoDB local instance or MongoDB Atlas connection string

## Run the backend
```bash
cd server
cp .env.example .env
# Set MONGO_URI and JWT_SECRET in .env
npm install
npm run dev
```
Backend default: http://localhost:5000

## Run the frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Vite prints the local URL, usually http://localhost:5173.

## Included features
- Movie listing and search
- Movie details and showtime selection
- Interactive seat selection and price total
- Demo booking confirmation in the frontend
- Express API routes for movies, authentication, showtimes, and bookings
- Mongoose models and JWT authentication middleware

## Important notes
This is a college-project starter/demo. Real-time seat availability and booking persistence require the backend endpoints to be connected to the UI and tested with your MongoDB instance. Do not treat a frontend demo booking as a confirmed real-world ticket. Configure secrets in `.env`; never commit `.env` to GitHub.

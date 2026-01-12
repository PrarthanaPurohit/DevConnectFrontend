# DevConnect Frontend

A modern React-based frontend application for a developer networking platform built with Vite, React, Redux Toolkit, and Tailwind CSS.

## Features

- User authentication (Login/Signup)
- User profile management
- Feed with developer cards
- Connection requests management
- View connections
- Premium membership features
- Responsive UI with DaisyUI components

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd devcfrontend
```

2. Install dependencies
```bash
npm install
```

3. Configure API endpoint (if needed)
Edit `src/utils/constants.js` to update the backend URL:
```javascript
export const BASE_URL = "http://localhost:3000";
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality

### Preview
```bash
npm run preview
```
Preview the production build locally

## Project Structure

```
src/
├── components/          # React components
│   ├── Body.jsx        # Main layout wrapper
│   ├── Login.jsx       # Authentication component
│   ├── NavBar.jsx      # Navigation bar
│   ├── Feed.jsx        # User feed
│   ├── Profile.jsx     # User profile
│   ├── EditProfile.jsx # Profile editing
│   ├── Connections.jsx # User connections
│   ├── Requests.jsx    # Connection requests
│   ├── UserCard.jsx    # User card component
│   ├── Premium.jsx     # Premium features
│   └── Footer.jsx      # Footer component
├── utils/              # Utilities and Redux store
│   ├── appStore.js     # Redux store configuration
│   ├── userSlice.js    # User state management
│   ├── feedSlice.js    # Feed state management
│   ├── connectionSlice.jsx  # Connections state
│   ├── requestSlice.js # Requests state
│   └── constants.js    # App constants
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Routes

- `/` - Feed page
- `/login` - Login/Signup page
- `/profile` - User profile
- `/connections` - View connections
- `/requests` - Manage connection requests
- `/premium` - Premium features

## API Integration

The app communicates with a backend API. Key endpoints used:

- `POST /login` - User login
- `POST /signup` - User registration
- Additional endpoints for feed, connections, and requests

All API calls include credentials for cookie-based authentication.

## State Management

Redux Toolkit is used for global state management with the following slices:

- **user** - Current user data
- **feed** - User feed data
- **connections** - User connections
- **requests** - Connection requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is private and not licensed for public use.
=======



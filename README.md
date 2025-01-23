# GKJ Website

## Overview
Modern web application for GKJ (Gereja Kristen Jawa) built with React, TypeScript, and Go. This application manages church information, bulletins, announcements, and administrative functions.

## Features
- 📱 Responsive modern UI with TailwindCSS
- 📄 PDF generation for church bulletins and documents
- 📰 News and announcements management
- 🗓️ Church schedule and event management
- 💰 Offerings management
- 📊 Media content management
- 📱 Mobile-friendly design

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, HeadlessUI, RadixUI
- **Backend**: Go
- **PDF Generation**: react-pdf/renderer, jspdf
- **State Management**: React Context
- **Routing**: React Router v6
- **Animation**: Framer Motion

## Getting Started

### Prerequisites
- Node.js >= 18
- Go >= 1.19
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-org/gkj-website.git
cd gkj-website
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
go mod tidy
```

4. Set up environment variables
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### Development

1. Start frontend development server
```bash
cd frontend
npm run dev
```

2. Start backend server
```bash
cd backend
go run main.go
```

### Building for Production

1. Build frontend
```bash
cd frontend
npm run build
```

2. Build backend
```bash
cd backend
go build
```

## Project Structure

```
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   ├── styles/        # Global styles
│   │   └── types/         # TypeScript definitions
│   └── public/            # Static assets
│
├── backend/                # Backend application
│   ├── internal/          # Internal packages
│   ├── pkg/               # Public packages
│   └── main.go            # Entry point
│
└── docs/                  # Documentation
```

## Documentation
- [Development Guidelines](./docs/DEVELOPMENT.md)
- [API Documentation](./docs/API.md)
- [Component Documentation](./docs/COMPONENTS.md)
- [Version History](./docs/CHANGELOG.md)

## Contributing
Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

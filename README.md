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

## Setup Instructions
1. Clone the repository: `git clone https://github.com/your-org/gkj-website.git`
2. Navigate to the project directory: `cd gkj-website`
3. Install dependencies: 
    - Frontend: `cd frontend` then `npm install`
    - Backend: `cd backend` then `go mod tidy`
4. Start the development server: 
    - Frontend: `cd frontend` then `npm run dev`
    - Backend: `cd backend` then `go run main.go`
5. Open your browser and go to: `http://localhost:3000`

## Project Structure
- **/frontend**: Contains the source code for the frontend application.
- **/frontend/src**: 
    - **/components**: Reusable UI components.
    - **/pages**: Page components
    - **/lib**: Shared libraries and utilities.
    - **/styles**: Global styles
    - **/types**: TypeScript definitions
- **/backend**: Contains the source code for the backend application.
- **/backend/internal**: Internal packages
- **/backend/pkg**: Public packages
- **/backend/main.go**: Entry point

## Documentation
- [Development Guidelines](./docs/DEVELOPMENT.md)
- [API Documentation](./docs/API.md)
- [Component Documentation](./docs/COMPONENTS.md)
- [Version History](./docs/CHANGELOG.md)

## Contributing
We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

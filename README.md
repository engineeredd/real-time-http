# HTTP Monitoring Application

This repository contains an HTTP monitoring application built using NestJS for the backend and Next.js for the frontend. It includes a CI/CD pipeline for automated testing, linting, and deployment.

## CI/CD Overview

The CI/CD pipeline for this application is implemented using GitHub Actions. The pipeline automatically runs tests, performs linting checks, and generates coverage reports whenever changes are pushed to the repository.

## Setup Instructions

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- GitHub Account
- Git

### Backend Setup (NestJS)

1. Clone the repository:
    ```bash
   git clone https://github.com/engineeredd/real-time-http.git

2. Navigate to the backend directory:
    ```bash
    cd http-monitoring-app

3. Install dependencies:
    ```bash
    npm install

4. Start the backend server:
    ```bash
    npm run start

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
    ```bash
    cd http-monitoring-frontend

2. Install dependencies:
    ```bash
    npm install

3. Start the frontend development server:
    ```bash
    npm run dev

## CI/CD Pipeline Configuration

### GitHub Actions

The CI/CD pipeline is defined in the .github/workflows/ci.yml file. Below is an example of how to set up the pipeline:

    name: CI Pipeline

    on:
    push:
        branches:
        - main
    pull_request:
        branches:
        - main

    jobs:
    lint-backend:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout code
            uses: actions/checkout@v2

        - name: Set up Node.js for Backend
            uses: actions/setup-node@v2
            with:
            node-version: '20'

        - name: Install backend dependencies
            run: cd http-monitoring-app && npm install

        - name: Run backend linting
            run: cd http-monitoring-app && npm run lint

    test-backend:
        runs-on: ubuntu-latest
        needs: lint-backend
        steps:
        - name: Checkout code
            uses: actions/checkout@v2

        - name: Set up Node.js for Backend
            uses: actions/setup-node@v2
            with:
            node-version: '20'

        - name: Install backend dependencies
            run: cd http-monitoring-app && npm install

        - name: Run backend tests
            run: cd http-monitoring-app && npm test

        - name: Generate backend coverage report
            run: cd http-monitoring-app && npm run test:cov

        - name: Upload backend coverage report
            uses: actions/upload-artifact@v2
            with:
            name: backend-coverage-report
            path: http-monitoring-app/coverage

    lint-frontend:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout code
            uses: actions/checkout@v2

        - name: Set up Node.js for Frontend
            uses: actions/setup-node@v2
            with:
            node-version: '20'

        - name: Install frontend dependencies
            run: cd http-monitoring-frontend && npm install

        - name: Run frontend linting
            run: cd http-monitoring-frontend && npm run lint

    test-frontend:
        runs-on: ubuntu-latest
        needs: lint-frontend
        steps:
        - name: Checkout code
            uses: actions/checkout@v2

        - name: Set up Node.js for Frontend
            uses: actions/setup-node@v2
            with:
            node-version: '20'

        - name: Install frontend dependencies
            run: cd http-monitoring-frontend && npm install

        - name: Run frontend tests
            run: cd http-monitoring-frontend && npm test

        - name: Upload frontend coverage report
            uses: actions/upload-artifact@v2
            with:
            name: frontend-coverage-report
            path: http-monitoring-frontend/coverage
          
### Explanation of the CI Pipeline

- Triggers: The pipeline runs on every push or pull request to the main branch.
- Jobs:
    - Backend: Installs backend dependencies, runs tests, performs linting checks, and generates coverage reports.
    - Frontend: Installs frontend dependencies, runs tests, performs linting checks, and generates coverage reports.

## Architecture Overview

The application follows a client-server architecture where the NestJS backend serves as an API that communicates with the PostgreSQL database and the Next.js frontend.

- Backend (NestJS):
    - RESTful API to handle HTTP requests.
    - WebSocket for real-time updates.
    - Data stored in a PostgreSQL database.

- Frontend (Next.js):
    - Server-side rendering for better SEO and performance.
    - Dynamic fetching of data from the backend.
    - Real-time UI updates via WebSocket.

## Choice of Technologies and Reasoning

- NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It offers a modular architecture, built-in support for TypeScript, and a rich ecosystem for building APIs.

- Next.js: A React framework for building server-side rendered applications. It provides excellent performance, SEO capabilities, and a great developer experience with features like hot module replacement.

- PostgreSQL: An open-source relational database known for its reliability and robustness. It supports complex queries and is suitable for applications requiring structured data storage.

- Jest: A delightful JavaScript testing framework that works well with both NestJS and Next.js, allowing for unit and integration testing with minimal configuration.

## Assumptions Made

- Users have a basic understanding of Node.js and JavaScript frameworks.
- PostgreSQL is set up and running locally for development purposes.
- The application will be hosted on a cloud provider (e.g., AWS, Heroku) in the future, so configurations are adaptable to different environments.

## Future Improvements

- Enhanced Error Handling: Implement comprehensive error handling and logging to better manage application failures.
- User Authentication: Add user authentication and authorization to secure the API endpoints.
- UI Improvements: Improve the user interface for better usability and accessibility.
- Containerization: Use Docker for both backend and frontend to streamline deployment and development processes.

## Testing Strategy and Core Component Identification

### Testing Strategy
- Unit Testing: Each component and service will have dedicated unit tests using Jest to ensure functionality and reliability.
- Integration Testing: Tests to verify the interaction between different modules of the application.
- End-to-End Testing: Consider using a tool like Cypress to simulate user interactions and test the application flow.

### Core Components
- Backend:
    - Controllers: Handle incoming requests and responses.
    - Services: Contain business logic and interact with the database.
    - WebSocket Gateway: Manage real-time communication with the frontend.

- Frontend:
    - Pages: Main views of the application (e.g., dashboard).
    - Components: Reusable UI elements (e.g., tables, charts).
    - API Hooks: Functions to fetch data from the backend and manage WebSocket connections.

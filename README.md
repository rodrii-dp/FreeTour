# FreeTour

FreeTour is a full-stack project with a **mobile app (React Native)** and a **backend API (NestJS)**.

## Repository structure

- `frontend/` — React Native mobile application
- `backend/` — NestJS backend API

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm or Yarn

### Install

Clone the repo and install dependencies for each package:

```bash
git clone https://github.com/rodrii-dp/FreeTour.git
cd FreeTour

# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

### Run

#### Backend

```bash
cd backend
npm run start:dev
```

#### Frontend (React Native)

```bash
cd frontend
npm start
```

Then run the app on a simulator/device:

```bash
# Android
npm run android

# iOS
npm run ios
```

## Scripts

Common scripts (may vary per package):

- `npm run start:dev` — start in development/watch mode
- `npm run start` — start
- `npm run test` — run tests

## Contributing

Issues and pull requests are welcome. Please describe the change and include steps to reproduce/test.

## License

Add a license file (e.g. `LICENSE`) and update this section accordingly.
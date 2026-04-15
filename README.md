# ChitFund Calculator

A comprehensive chit fund calculator built with React, TypeScript, and Capacitor for cross-platform mobile deployment. This application helps users calculate and analyze chit fund withdrawals, loans, and member returns with IRR (Internal Rate of Return) analysis.

## Features

- **Chit Fund Calculations**: Calculate monthly pools, commissions, and withdrawal schedules
- **IRR Analysis**: Internal Rate of Return calculation using Newton-Raphson method for accurate member return analysis
- **Loan Management**: Track loans given from remaining pool with interest calculations
- **Bilingual Support**: Available in English and Kannada (ಕನ್ನಡ)
- **Indian Number Formatting**: Displays amounts in Lakhs (L), Crores (Cr), and Thousands (K)
- **Mobile Ready**: Built with Capacitor for Android deployment
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| Total Members | Number of members in the chit fund |
| Monthly Contribution | Amount each member contributes per month |
| First Withdrawal Amount | Withdrawal amount in the first month |
| Monthly Increment | Increment in withdrawal amount each month |
| Loan Interest Rate | Monthly interest rate for loans (%) |
| Commission Type | Monthly rate (%) or one-time amount (₹) |

## Calculated Results

- Monthly Pool Amount
- Commission Per Month / Total Commission
- Duration (Months)
- Total Loans Given
- Total Interest Earned
- Member Returns with IRR Analysis
- Withdrawal Schedule
- Loan Schedule

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **Charts**: Recharts 3
- **Icons**: Lucide React
- **Mobile**: Capacitor 8 (Android)
- **Linting**: ESLint 9

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Android Studio (for Android development)
- JDK 17+ (for Android builds)

## Installation

```bash
# Clone the repository
git clone https://github.com/poornachandrasdev/chit-fund-calculator.git

# Navigate to project directory
cd chit-fund-calculator

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Android Development

```bash
# Build and sync with Android
npm run android

# Build, sync, and open in Android Studio
npm run android:open

# Open Android project in Android Studio
npm run cap:open
```

## Project Structure

```
chit-fund-calculator/
├── src/
│   ├── components/        # UI Components
│   │   ├── ChitFundInputs.tsx    # Input form section
│   │   └── ChitFundResults.tsx   # Calculation results and tables
│   ├── constants/         # Static data
│   │   └── translations.ts       # Bilingual strings & default values
│   ├── utils/             # Business logic & helpers
│   │   ├── calculations.ts       # Core financial engine & IRR logic
│   │   └── formatters.ts         # Currency formatting helpers
│   ├── ChitFundApp.tsx    # Main orchestrator component
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── assets/            # Static assets
├── android/               # Android native project
├── public/                # Public assets
├── resources/             # App icons and graphics
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
├── capacitor.config.ts    # Capacitor configuration
└── package.json           # Dependencies and scripts
```

## Key Components

### Core Architecture

The application follows a modular architecture to separate concerns:

- **`ChitFundApp.tsx`**: Orchestrates the state (inputs, language) and coordinates the UI.
- **`calculateChitDetails()`**: (in `utils/calculations.ts`) The core engine that computes the chit fund schedules and returns.
- **`calculateIRR()`**: (in `utils/calculations.ts`) Computes the Internal Rate of Return using Newton-Raphson and bisection methods.
- **`formatIndianCurrency()`**: (in `utils/formatters.ts`) Formats numbers in Indian numbering system (Lakhs, Crores).
- **`translations`**: (in `constants/translations.ts`) Handles English and Kannada (ಕನ್ನಡ) language support.

## IRR Calculation

The application uses a two-phase approach for IRR calculation:

1. **Newton-Raphson Method**: Fast convergence for most cases
2. **Bisection Method**: Fallback for edge cases where Newton-Raphson doesn't converge

This ensures accurate IRR calculations for all cash flow patterns.

## License

This project is private and proprietary.

## Author

Developed by Poornachandra Siddanayaka
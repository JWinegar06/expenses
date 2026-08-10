# Final Fantasy XV Expense Tracker

A Final Fantasy XV-inspired expense tracker built with Next.js, Firebase, Tailwind CSS, and Chart.js.

The application uses a **Royal Treasury of Lucis** theme inspired by the menus and visual style of Final Fantasy XV.

## Features

- Google sign-in
- Add income
- Add expenses
- Create custom expense categories
- Delete income and expense entries
- Track current balance
- View expense history
- Expense breakdown chart
- FFXV-inspired Royal Treasury interface
- Responsive design

## Built With

- Next.js
- React
- Tailwind CSS
- Firebase / Firestore
- Firebase Authentication
- Chart.js
- React Chart.js 2
- React Icons
- React Toastify

## Getting Started

Install the project dependencies:

npm install

Start the development server:

npm run dev

Open the application in your browser:

http://localhost:3000

## Firebase

This project uses Firebase for:

- Google Authentication
- Income storage
- Expense storage
- Expense categories

Make sure your Firebase configuration is set up in the project before running the application.

## Royal Treasury

The dashboard tracks:

- Available Funds
- Income / Deposits
- Expenditures
- Expense Categories
- Expense History
- Treasury Analysis

Categories with a balance of `$0.00` remain visible in the ledger but are excluded from the expense chart until spending is recorded.

## Disclaimer

This is a fan-made project inspired by **Final Fantasy XV**.

Final Fantasy XV and related names and properties belong to Square Enix. This project is not affiliated with or endorsed by Square Enix.
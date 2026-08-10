# Royal Treasury

A Final Fantasy XV-inspired expense tracker built with Next.js, React, Firebase, Tailwind CSS, and Chart.js.

The application transforms a traditional expense tracker into the **Royal Treasury of Lucis**, using a dark Insomnia-inspired interface with royal blue, silver, and gold styling.

## Features

- Google authentication
- Track available funds
- Add income
- Add expenditures
- Create custom expense categories
- View expense history
- Delete income and expense entries
- Delete expense categories
- Expense percentage calculations
- Category spending progress bars
- Doughnut chart expenditure report
- Responsive FFXV-inspired interface

## Royal Treasury Dashboard

The main dashboard includes:

### Available Funds

Displays the current balance after income and expenditures are calculated.

**Available Funds = Total Income - Total Expenditures**

### Expenditure Ledger

Each expense category displays:

- Category name
- Amount spent
- Percentage of total spending
- Spending progress bar
- Custom category color

Selecting a category opens its expense history.

### Expenditure Report

The Royal Treasury Analysis section contains a doughnut chart showing how recorded expenditures are distributed between active categories.

Categories with `$0.00` in spending remain in the ledger but are excluded from the chart until an expenditure is recorded.

## Built With

- Next.js
- React
- Tailwind CSS
- Firebase Authentication
- Cloud Firestore
- Chart.js
- React Chart.js 2
- React Icons
- React Toastify

## Getting Started

Install dependencies:

npm install

Start the development server:

npm run dev

Then open:

http://localhost:3000

## Firebase

Firebase is used for authentication and financial data storage.

The application stores:

- User income
- Expense categories
- Individual expenditures
- Category totals

Financial records are associated with the authenticated user's Firebase UID.

## Project Structure

app/
  globals.css
  layout.js
  page.js

components/
  ExpenseCategoryItem.js
  Modal.js
  Navigation.js
  SignIn.js

components/modals/
  AddExpensesModal.js
  AddIncomeModal.js
  ViewExpenseModal.js

lib/store/
  auth-context.js
  finance-context.js

## Theme

The interface is inspired by the visual style of Final Fantasy XV and the Crown City of Insomnia.

The design uses:

- Dark navy backgrounds
- Lucian blue highlights
- Gold accents
- Angular menu elements
- Royal Treasury terminology
- RPG-style expenditure indicators
- Minimal menu-style typography

## Disclaimer

This is a fan-made project created for educational and portfolio purposes.

Final Fantasy XV, Lucis, Insomnia, and related properties belong to Square Enix.

This project is not affiliated with or endorsed by Square Enix.
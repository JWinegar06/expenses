"use client";

import { useContext, useMemo, useState } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  const totalIncome = useMemo(
    () => income.reduce((total, item) => total + Number(item.amount || 0), 0),
    [income],
  );

  const totalExpenses = useMemo(
    () =>
      expenses.reduce(
        (total, expense) => total + Number(expense.total || 0),
        0,
      ),
    [expenses],
  );

  const balance = totalIncome - totalExpenses;

  const activeExpenses = useMemo(
    () =>
      expenses
        .filter((expense) => Number(expense.total || 0) > 0)
        .sort((a, b) => Number(b.total || 0) - Number(a.total || 0)),
    [expenses],
  );

  const getPercentage = (amount) => {
    if (!totalExpenses) return 0;
    return (Number(amount || 0) / totalExpenses) * 100;
  };

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      <main className="treasury-shell">
        <section className="treasury-hero">
          <p className="eyebrow">Crown City of Insomnia</p>
          <h1>Royal Treasury</h1>

          <div className="royal-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>

          <div className="balance-layout">
            <div>
              <p className="eyebrow">Available Funds</p>

              <div className="balance-value">
                {currencyFormatter(balance)}
                <span>GIL</span>
              </div>

              <p className="balance-description">
                Current balance after recorded income and expenditures
              </p>
            </div>

            <div className="treasury-actions">
              <button
                className="royal-action expenditure"
                onClick={() => setShowAddExpenseModal(true)}
              >
                + Expenditure
              </button>

              <button
                className="royal-action funds"
                onClick={() => setShowAddIncomeModal(true)}
              >
                + Funds
              </button>
            </div>
          </div>
        </section>

        <section className="royal-panel">
          <header className="panel-header">
            <div>
              <span className="eyebrow">Ledger</span>
              <h2>Expenditures</h2>
            </div>

            <span className="category-count">
              {expenses.length}{" "}
              {expenses.length === 1 ? "Category" : "Categories"}
            </span>
          </header>

          <div className="ledger-list">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <ExpenseCategoryItem
                  key={expense.id}
                  expense={expense}
                  totalExpenses={totalExpenses}
                />
              ))
            ) : (
              <div className="treasury-empty">
                No expenditure categories have been recorded.
              </div>
            )}
          </div>
        </section>

        <section id="stats" className="royal-panel">
          <header className="panel-header">
            <div>
              <span className="eyebrow">Royal Treasury Analysis</span>
              <h2>Expenditure Report</h2>
            </div>

            <div className="report-total">
              <span>Total Recorded</span>
              <strong>{currencyFormatter(totalExpenses)}</strong>
            </div>
          </header>

          {activeExpenses.length > 0 ? (
            <div className="analysis-chart-only">
              <div className="chart-wrapper">
                <Doughnut
                  data={{
                    labels: activeExpenses.map((expense) => expense.title),
                    datasets: [
                      {
                        data: activeExpenses.map((expense) => expense.total),
                        backgroundColor: activeExpenses.map(
                          (expense) => expense.color,
                        ),
                        borderColor: "#07111f",
                        borderWidth: 4,
                        hoverOffset: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: "68%",
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        displayColors: false,
                        callbacks: {
                          label(context) {
                            const value = Number(context.raw || 0);
                            const percent = getPercentage(value);
                            return `${currencyFormatter(value)} • ${percent.toFixed(1)}%`;
                          },
                        },
                      },
                    },
                  }}
                />

                <div className="chart-center">
                  <span>Total Spent</span>
                  <strong>{currencyFormatter(totalExpenses)}</strong>
                  <small>GIL</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="treasury-empty">
              Record an expenditure to unlock treasury analysis.
            </div>
          )}
        </section>
      </main>
    </>
  );
}

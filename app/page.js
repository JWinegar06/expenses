"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  const totalIncome = income.reduce((total, item) => total + item.amount, 0);
  const totalSpent = expenses.reduce(
    (total, expense) => total + Number(expense.total || 0),
    0,
  );

  // A category with a zero balance stays in the ledger, but is omitted from
  // the doughnut chart until money is actually spent in that category.
  const chartExpenses = expenses.filter(
    (expense) => Number(expense.total || 0) > 0,
  );

  useEffect(() => {
    setBalance(totalIncome - totalSpent);
  }, [totalIncome, totalSpent]);

  if (!user) return <SignIn />;

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

      <main className="container max-w-4xl px-6 py-10 mx-auto">
        <header className="mb-8 text-center">
          <p className="ff-kicker text-xs mb-3">Crown City of Insomnia</p>
          <h1 className="ff-title text-3xl md:text-4xl font-light uppercase">
            Royal Treasury
          </h1>
          <div className="ff-divider max-w-md mx-auto mt-5" />
        </header>

        <section className="ff-panel rounded-lg p-6 md:p-8 mb-6">
          <p className="ff-kicker text-xs mb-2">Available Funds</p>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                {currencyFormatter(balance)}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Current balance after recorded income and expenditures
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="btn btn-primary"
              >
                + Expenditure
              </button>
              <button
                onClick={() => setShowAddIncomeModal(true)}
                className="btn btn-primary-outline"
              >
                + Funds
              </button>
            </div>
          </div>
        </section>

        <section className="ff-panel rounded-lg p-6 md:p-8 mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="ff-kicker text-xs mb-2">Ledger</p>
              <h3 className="text-2xl font-light tracking-wide">
                Expenditures
              </h3>
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-500">
              {expenses.length} categories
            </span>
          </div>

          <div className="ff-divider my-5" />

          <div className="flex flex-col gap-4">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <ExpenseCategoryItem key={expense.id} expense={expense} />
              ))
            ) : (
              <p className="py-6 text-center text-slate-500">
                No expenditures have been entered into the royal ledger.
              </p>
            )}
          </div>
        </section>

        <section id="stats" className="ff-panel rounded-lg p-6 md:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ff-kicker text-xs mb-2">Royal Treasury Analysis</p>
              <h3 className="text-2xl font-light tracking-wide">
                Expenditure Report
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Total Recorded
              </p>
              <p className="mt-1 text-xl font-light text-slate-100">
                {currencyFormatter(totalSpent)}
              </p>
            </div>
          </div>

          <div className="ff-divider my-5" />

          {chartExpenses.length > 0 ? (
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
              <div className="relative w-full max-w-md mx-auto">
                <Doughnut
                  data={{
                    labels: chartExpenses.map((expense) => expense.title),
                    datasets: [
                      {
                        label: "Expenditures",
                        data: chartExpenses.map((expense) => expense.total),
                        backgroundColor: chartExpenses.map(
                          (expense) => expense.color,
                        ),
                        borderColor: "#0d1422",
                        borderWidth: 4,
                        hoverBorderColor: "#d9e7ff",
                        hoverBorderWidth: 3,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: "58%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const value = Number(context.raw || 0);
                            const percent = totalSpent
                              ? ((value / totalSpent) * 100).toFixed(1)
                              : "0.0";

                            return `${context.label}: ${currencyFormatter(
                              value,
                            )} (${percent}%)`;
                          },
                        },
                      },
                    },
                  }}
                />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="ff-kicker text-[10px] sm:text-xs">
                    Total Spent
                  </span>
                  <span className="mt-2 text-xl sm:text-2xl font-light tracking-wide text-slate-100">
                    {currencyFormatter(totalSpent)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                  <p className="ff-kicker text-xs">Category Breakdown</p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    Share of spending
                  </span>
                </div>

                {chartExpenses
                  .slice()
                  .sort((a, b) => b.total - a.total)
                  .map((expense) => {
                    const percentage = totalSpent
                      ? (expense.total / totalSpent) * 100
                      : 0;

                    return (
                      <div
                        key={expense.id}
                        className="border border-slate-700/50 bg-slate-950/20 px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className="h-3 w-3 rotate-45 shrink-0 shadow-[0_0_10px_currentColor]"
                              style={{
                                backgroundColor: expense.color,
                                color: expense.color,
                              }}
                            />
                            <div className="min-w-0">
                              <p className="capitalize text-slate-100 truncate">
                                {expense.title}
                              </p>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                Ledger allocation
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-medium text-slate-100">
                              {currencyFormatter(expense.total)}
                            </p>
                            <p className="text-xs text-slate-400">
                              {percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-px w-full overflow-hidden bg-slate-800">
                          <div
                            className="h-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: expense.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                {expenses.some(
                  (expense) => Number(expense.total || 0) === 0,
                ) && (
                  <p className="pt-2 text-xs leading-relaxed text-slate-500">
                    Empty ledger categories remain listed above and will appear
                    in this analysis once an expenditure is recorded.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-400">No expenditure data to analyze.</p>
              <p className="mt-2 text-sm text-slate-500">
                Categories with a balance of 0 remain in the ledger until funds
                are recorded against them.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

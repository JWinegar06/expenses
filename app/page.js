"use client";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Uniforms",
    color: "yellow",
    total: 2000,
  },
  {
    id: 2,
    title: "Weapons",
    color: "Blue",
    total: 5000,
  },
  {
    id: 3,
    title: "Food",
    color: "Green",
    total: 500,
  },
  {
    id: 4,
    title: "Supplies",
    color: "Purple",
    total: 200,
  },
];

export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-white text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* Expense Section */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {DUMMY_DATA.map((expense) => (
            <ExpenseCategoryItem
              key={expense.id}
              color={expense.color}
              title={expense.title}
              total={expense.total}
            />
          ))}
        </div>
      </section>

      {/* Stats Chart */}
      <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut
            data={{
              labels: DUMMY_DATA.map((expense) => expense.title),
              datasets: [
                {
                  label: "Expenses",
                  data: DUMMY_DATA.map((expense) => expense.total),
                  backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                  borderColor: ["black"],
                  borderWidth: 2,
                },
              ],
            }}
          />
        </div>
      </section>
    </main>
  );
}

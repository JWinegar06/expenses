import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

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

      {/* Expenses */}
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
    </main>
  );
}

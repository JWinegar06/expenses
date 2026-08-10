"use client";

import { useState, useContext, useRef } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);
  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => e.id === selectedCategory);
    if (!expense) return;

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + Number(expenseAmount),
      items: [
        ...(expense.items || []),
        { amount: Number(expenseAmount), createdAt: new Date(), id: uuidv4() },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      onClose(false);
      toast.success("Expenditure recorded.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value.trim();
    const color = colorRef.current.value;
    if (!title) return toast.error("Enter a category title.");

    try {
      await addCategory({ title, color, total: 0, items: [] });
      titleRef.current.value = "";
      setShowAddExpense(false);
      toast.success("Ledger category created.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div>
        <p className="ff-kicker text-[10px]">Expenditure Entry</p>
        <h2 className="ff-title mt-1 text-3xl">Record Expense</h2>
      </div>

      <div className="input-group mt-6">
        <label className="ff-label">Amount</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
      </div>

      {Number(expenseAmount) > 0 && (
        <div className="mt-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-medium text-slate-200">
              Select ledger category
            </h3>
            <button
              type="button"
              onClick={() => setShowAddExpense(true)}
              className="text-xs uppercase tracking-wider text-amber-200 hover:text-amber-100"
            >
              + New category
            </button>
          </div>

          {showAddExpense && (
            <div className="mt-4 grid gap-3 border border-sky-200/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto]">
              <input type="text" placeholder="Category title" ref={titleRef} />
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400">Color</label>
                <input
                  type="color"
                  className="h-10 w-14 p-1"
                  ref={colorRef}
                  defaultValue="#6fb7ff"
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="button"
                  onClick={addCategoryHandler}
                  className="btn btn-primary-outline"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
            {expenses.map((expense) => (
              <button
                key={expense.id}
                type="button"
                onClick={() => setSelectedCategory(expense.id)}
                className={`ff-list-item ${expense.id === selectedCategory ? "ff-list-item-selected" : ""}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rotate-45 border border-white/30"
                    style={{ backgroundColor: expense.color }}
                  />
                  <span className="capitalize">{expense.title}</span>
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-500">
                  {expense.id === selectedCategory ? "Selected" : "Select"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {Number(expenseAmount) > 0 && selectedCategory && (
        <div className="mt-6 flex justify-end">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Record expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;

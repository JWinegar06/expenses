import { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense }) {
  const [showViewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setViewExpenseModal}
        expense={expense}
      />
      <button
        type="button"
        onClick={() => setViewExpenseModal(true)}
        className="ff-list-item group w-full text-left"
      >
        <span className="flex items-center gap-3">
          <span
            className="h-3 w-3 rotate-45 border border-white/30 shadow-[0_0_12px_currentColor]"
            style={{ backgroundColor: expense.color, color: expense.color }}
          />
          <span>
            <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
              Ledger
            </span>
            <span className="capitalize text-slate-100 group-hover:text-white">
              {expense.title}
            </span>
          </span>
        </span>
        <span className="font-semibold tabular-nums text-slate-200">
          {currencyFormatter(expense.total)}
        </span>
      </button>
    </>
  );
}

export default ExpenseCategoryItem;

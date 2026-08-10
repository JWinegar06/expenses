import { useState } from "react";

import { currencyFormatter } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense, totalExpenses }) {
  const [showViewExpenseModal, setViewExpenseModal] = useState(false);

  const percentage =
    totalExpenses > 0 ? (expense.total / totalExpenses) * 100 : 0;

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setViewExpenseModal}
        expense={expense}
      />

      <button
        className="ledger-row"
        onClick={() => setViewExpenseModal(true)}
      >
        <div
          className="ledger-gem"
          style={{ "--category-color": expense.color }}
        />

        <div className="ledger-info">
          <div className="ledger-heading">
            <div>
              <span className="ledger-label">Ledger Allocation</span>
              <h4>{expense.title}</h4>
            </div>

            <div className="ledger-value">
              <strong>{currencyFormatter(expense.total)}</strong>
              <span>{percentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="allocation-track">
            <div
              className="allocation-value"
              style={{
                width: `${percentage}%`,
                background: expense.color,
              }}
            />
          </div>
        </div>

        <span className="ledger-arrow">›</span>
      </button>
    </>
  );
}

export default ExpenseCategoryItem;

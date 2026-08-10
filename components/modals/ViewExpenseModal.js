import { useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import Modal from "@/components/Modal";
import { currencyFormatter } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function formatDate(value) {
  const date = value?.toDate
    ? value.toDate()
    : value?.toMillis
      ? new Date(value.toMillis())
      : new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString();
}

function ViewExpenseModal({ show, onClose, expense }) {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      onClose(false);
      toast.success("Ledger category deleted.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenseItemHandler = async (item) => {
    try {
      const updatedItems = expense.items.filter((i) => i.id !== item.id);
      await deleteExpenseItem(
        { items: updatedItems, total: expense.total - item.amount },
        expense.id,
      );
      toast.success("Expenditure removed.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="ff-kicker text-[10px]">Expense Ledger</p>
          <h2 className="ff-title mt-1 text-3xl capitalize">{expense.title}</h2>
          <p className="mt-2 text-sm text-slate-400">
            Total recorded:{" "}
            <span className="text-slate-200">
              {currencyFormatter(expense.total)}
            </span>
          </p>
        </div>
        <button onClick={deleteExpenseHandler} className="btn btn-danger">
          Delete category
        </button>
      </div>

      <div className="ff-divider my-7" />
      <h3 className="text-lg font-medium text-slate-200">
        Expenditure History
      </h3>
      <div className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
        {expense.items.length === 0 && (
          <p className="py-5 text-center text-sm text-slate-500">
            No expenditures recorded.
          </p>
        )}
        {expense.items.map((item) => (
          <div key={item.id} className="ff-history-row">
            <small className="text-xs text-slate-500">
              {formatDate(item.createdAt)}
            </small>
            <div className="flex items-center gap-3">
              <span className="tabular-nums text-slate-200">
                {currencyFormatter(item.amount)}
              </span>
              <button
                type="button"
                onClick={() => deleteExpenseItemHandler(item)}
                className="ff-trash"
                aria-label="Delete expense"
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;

import { useRef, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "@/components/Modal";
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

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);
  const { user } = useContext(authContext);

  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: Number(amountRef.current.value),
      description: descriptionRef.current.value.trim(),
      createdAt: new Date(),
      uid: user.uid,
    };

    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      toast.success("Funds added to the treasury.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
      toast.success("Income record removed.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <p className="ff-kicker text-[10px]">Treasury Deposit</p>
      <h2 className="ff-title mt-1 text-3xl">Add Funds</h2>

      <form onSubmit={addIncomeHandler} className="mt-6 grid gap-4">
        <div className="input-group">
          <label htmlFor="amount" className="ff-label">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className="ff-label">
            Source / Description
          </label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Salary, quest reward, deposit..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary-outline">
          Add funds
        </button>
      </form>

      <div className="ff-divider my-7" />
      <h3 className="text-lg font-medium text-slate-200">Deposit History</h3>
      <div className="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
        {income.length === 0 && (
          <p className="py-5 text-center text-sm text-slate-500">
            No deposits recorded.
          </p>
        )}
        {income.map((i) => (
          <div className="ff-history-row" key={i.id}>
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-200">
                {i.description}
              </p>
              <small className="text-xs text-slate-500">
                {formatDate(i.createdAt)}
              </small>
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular-nums text-amber-100">
                {currencyFormatter(i.amount)}
              </span>
              <button
                type="button"
                onClick={() => deleteIncomeEntryHandler(i.id)}
                className="ff-trash"
                aria-label={`Delete ${i.description}`}
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

export default AddIncomeModal;

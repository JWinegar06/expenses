function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="ff-modal relative w-full max-w-2xl p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between border-b border-sky-200/10 pb-4">
          <div>
            <p className="ff-kicker text-[10px]">Lucian Treasury Interface</p>
            <p className="mt-1 text-xs text-slate-500">
              Crown City of Insomnia
            </p>
          </div>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="ff-close"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;

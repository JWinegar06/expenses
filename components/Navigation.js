import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { ImStatsBars } from "react-icons/im";

function Nav() {
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container mx-auto max-w-2xl px-6 pt-5">
      <div className="ff-panel flex min-h-16 items-center justify-between px-4 py-3">
        {user && !loading ? (
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-sky-200/30 bg-slate-900">
              <img
                className="h-full w-full object-cover"
                src={user.photoURL}
                alt={user.displayName || "User"}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <p className="ff-kicker text-[9px]">Royal Account</p>
              <p className="truncate text-sm text-slate-200">
                {user.displayName}
              </p>
            </div>
          </div>
        ) : (
          <div />
        )}

        {user && !loading && (
          <nav className="flex items-center gap-2">
            <a
              href="#stats"
              className="ff-icon-button"
              aria-label="View statistics"
              title="Archives"
            >
              <ImStatsBars className="text-lg" />
            </a>
            <button onClick={logout} className="btn btn-danger">
              Sign out
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Nav;

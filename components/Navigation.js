import { useContext } from "react";

import { authContext } from "@/lib/store/auth-context";
import { ImStatsBars } from "react-icons/im";

function Nav() {
  const { user, loading, logout } = useContext(authContext);

  if (!user || loading) return null;

  return (
    <header className="royal-nav">
      <div className="royal-nav-inner">
        <div className="account-info">
          <div className="account-avatar">
            <img
              src={user.photoURL}
              alt={user.displayName || "Royal Account"}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="account-copy">
            <span>Royal Account</span>
            <strong>{user.displayName}</strong>
          </div>
        </div>

        <nav className="royal-nav-actions">
          <a className="nav-stats" href="#stats" aria-label="Treasury analysis">
            <ImStatsBars />
          </a>

          <button onClick={logout} className="btn btn-danger">
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Nav;

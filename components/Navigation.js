import { ImStatsBars } from "react-icons/im";

function Nav() {
  return (
    <header className="container max-w-2xl px-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-2">
          {/* img */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              className="object-cover h-full w-full"
              src="https://s4.anilist.co/file/anilistcdn/character/large/n134384-yskpdM3N2wKa.png"
              alt="user pic"
            />
          </div>

          {/* name */}
          <small>Hello, Nyx</small>
        </div>

        {/* Sign In */}
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;

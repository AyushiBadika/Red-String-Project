import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-primaryText ">My</span>
            <span className="text-SecondaryText ">Events</span>
          </h1>
        </Link>

        <div className="flex gap-8 font-semibold">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link to="/create-event" className="hover:underline">
            Post Event
          </Link>
          <Link to="/profile" className="hover:underline">
            {currentUser ? <img src={currentUser.avatar} alt="profile" className="rounded-full w-7 h-7 object-cover" /> : "Sign In"}
          </Link>
        </div>
      </div>
    </header>
  );
}

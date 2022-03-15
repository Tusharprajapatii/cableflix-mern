import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../services/appSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/user/authSlice";
import { MdOutlineWatchLater } from "react-icons/md";
import { useAlert } from "react-alert";
function Header() {
  const alert = useAlert();
  const location = useLocation();
  const { search, watchLater } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nav, setNav] = React.useState(false);
  const [logouts, setLogout] = React.useState(false);

  const onScrollNav = () => {
    if (window.scrollY > 60) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScrollNav);
    if (!user) {
      navigate("/");
    }

    return () => {
      window.removeEventListener("scroll", onScrollNav);
    };
  }, [nav, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/${search}`);
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full text-slate-400 z-10 hover:bg-black">
      <div className={`md:flex  md:items-center ${nav ? "bg-black" : ""}`}>
        <div className="flex basis-9/12">
          <div>
            <Link to="/home">
              <h1 className="text-slate-100 text-shadow px-4 py-2 text-xl font-extrabold">
                CABLEFLIX
              </h1>
            </Link>
          </div>
          {location.pathname !== "/" ? (
            <div className="flex-1 m-auto text-right pr-6 relative">
              <span className="px-2  mr-2">
                <Link to={`/account/watchlater`}>
                  <button>
                    <MdOutlineWatchLater
                      className={`inline-block ${
                        watchLater.length > 0
                          ? "text-blue-600"
                          : "text-slate-100"
                      }  md:mr-4 text-[1.6rem] md:text-[2.2rem]`}
                    />{" "}
                  </button>
                </Link>
              </span>
              <span className="text-center  text-shadow font-extrabold text-slate-100">
                {user?.user.name}
              </span>
              <span onClick={() => setLogout(!logouts)} className="pl-3">
                <CgProfile className="inline-block text-shadow text-xl cursor-pointer text-slate-100" />
              </span>
              <button
                onClick={() => {
                  dispatch(logout());
                  setLogout(false);
                  alert.success("logged out successfully");
                }}
                className={
                  logouts
                    ? "absolute border-2 p-2 ring-4 bg-black rounded-lg top-8 right-4"
                    : "hidden"
                }
              >
                logout
              </button>
            </div>
          ) : null}
        </div>

        {location.pathname !== "/" ? (
          <div className="md:flex-1 mx-2 ">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="border-2 flex justify-between rounded-md shadow-black shadow-lg md:w-80%fdswq22 xl:w-3/5 md:ml-6"
            >
              <input
                className="border-none w-4/5 text-black outline-none bg-slate-50 "
                type="text"
                placeholder="Search movies.."
                id="search"
                // value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
              <button className="pr-1 flex-1  inline-block bg-slate-50">
                <AiOutlineSearch className="m-auto" />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeWatchLater } from "../services/appSlice";
import { useDispatch } from "react-redux";
function WatchLater() {
  const { watchLater } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  if (watchLater.length === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-slate-200">
          Nothing here, add some movies to watch later
        </h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-left font-semibold text-2xl md:text-3xl mt-20 ml-4 text-slate-100">
        Watch Later
      </h1>
      <div className="md:flex md:flex-wrap md:justify-center ">
        {watchLater.map((item) => {
          const { id, title, poster_path, backdrop_path } = item;
          const img = `http://image.tmdb.org/t/p/original/${
            backdrop_path || poster_path
          }`;
          return (
            <div
              className="flex flex-col items-center border-2 md:max-w-sm md:mx-2 text-slate-200 my-4 py-2"
              key={id}
            >
              <Link to={`/${title}/${id}`}>
                <img
                  className="h-[220px] w-[300px]"
                  src={
                    img ||
                    `https://wikireviews.com/blog/wp-content/uploads/2015/06/Movies-where-nothing-happens.jpg`
                  }
                  alt=""
                />
              </Link>

              <div className="px-4">
                <h5 className="text-center text-xl md:text-2xl font-extrabold">
                  {title}
                </h5>
                <p>{`${item.overview.substring(0, 100)}...`}</p>
              </div>
              <div className="my-2">
                <button
                  onClick={() => dispatch(removeWatchLater(id))}
                  className="m-auto text-red-500"
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchLater;

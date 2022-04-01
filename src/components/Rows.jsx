import React, { useRef } from "react";
import SWR from "swr";
import "tippy.js/dist/tippy.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getItem, setVideoId } from "../services/appSlice";
import { useDispatch } from "react-redux";
function Rows({ url, title, isLargeRow, Num }) {
  const dispatch = useDispatch();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = SWR(url, fetcher);
  const listRef = useRef();
  // const [isMoved, setIsMoved] = React.useState(false);
  // const [slideNumber, setSlideNumber] = React.useState(0);
  // const handleClick = (direction) => {
  //   setIsMoved(true);

  //   let distance = listRef.current.getBoundingClientRect().x;
  //   console.log(distance);
  //   if (direction === "left" && slideNumber > 0) {
  //     setSlideNumber((slideNumber) => slideNumber - 1);
  //     listRef.current.style.transform = `translateX(${680 + distance}px)`;
  //   }
  //   if (direction === "right" && slideNumber < Num) {
  //     setSlideNumber((slideNumber) => slideNumber + 1);

  //     listRef.current.style.transform = `translateX(${-680 + distance}px)`;
  //   }
  // };

  if (!data && !error) {
    return <div className="bg-black"></div>;
  }
  return (
    <div className="flex flex-col  ">
      <h1 className="text-center font-extrabold text-3xl mb-1 md:my-2 text-slate-300">
        {title}
      </h1>

      <div className="flex flex-row  overflow-y-auto no-scrollbar  ">
        {/* <div
          onClick={() => handleClick("left")}
          className=" z-10 left-0 absolute hidden xl:inline-block text-shadow-lg cursor-pointer"
        >
          {" "}
          <AiOutlineLeft
            style={{ strokeWidth: 40, display: !isMoved && "none" }}
            className="text-4xl mx-3 my-5 text-slate-300"
          />{" "}
        </div> */}

        {data?.results.map((item) => {
          const { backdrop_path, id, title, poster_path } = item;
          return (
            <div
              className="m-1 relative"
              key={id}
              onClick={() => {
                dispatch(setVideoId(id));
                dispatch(getItem(item));
              }}
            >
              <Link to={`/${title}/${id}`}>
                <img
                  className={`${
                    isLargeRow ? `h-32 w-48` : `h-28 w-40`
                  } ease-in duration-300 ${
                    isLargeRow ? `md:h-56 md:w-96` : `md:h-44 md:w-80`
                  } object-cover max-w-none rounded-lg  hover:scale-110`}
                  src={`${
                    data
                      ? `http://image.tmdb.org/t/p/original/${
                          backdrop_path || poster_path
                        }`
                      : `https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg `
                  }`}
                  alt=""
                />
              </Link>
              <p className="text-slate-100 text-[9px] font-bold text-center md:text-sm">
                {title}
              </p>
            </div>
          );
        })}

        {/* <div
          onClick={() => handleClick("right")}
          className=" z-10 rounded-xl bg-black absolute right-0 hidden xl:inline-block cursor-pointer text-shadow-lg"
        >
          {" "}
          <AiOutlineRight
            style={{ strokeWidth: 40 }}
            className="text-[40px] mx-1 my-2 text-slate-300"
          />{" "}
        </div> */}
      </div>
    </div>
  );
}

export default Rows;

import React from "react";
import axios from "axios";
import { apikey } from "../utils/requests";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdStarRate, MdWatchLater } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addWatchLater } from "../services/appSlice";
import { NoVideo } from "./NoVideo";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAlert } from "react-alert";
import ReactPlayer from "react-player/lazy";
import { AiOutlineClose } from "react-icons/ai";
function SingleMovie() {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [video, setVideo] = React.useState([]);
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`
      );
      const data = await res.data.results;
      setVideo(data);
      setLoading(false);
    } catch (error) {}
  };

  const index = video.findIndex(
    (element) => element.type === "Trailer" || "Teaser"
  );

  const { item, watchLater } = useSelector((state) => state.app);
  React.useEffect(() => {
    fetch();
  }, [id]);
  const {
    title,
    overview,
    release_date,
    vote_average,
    poster_path,
    backdrop_path,
  } = item;
  //   const vide = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  if (loading) return <div></div>;
  if (!id || video.length === 0) {
    return <NoVideo />;
  }

  return (
    <div className="relative">
      <div className={`relative `}>
        <img
          src={`https://image.tmdb.org/t/p/original/${
            backdrop_path || poster_path
          }`}
          alt=""
          className="object-cover w-full h-screen"
        />
      </div>
      <div className="absolute text-slate-100 inset-y-56 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-shadow">
          {title}
        </h1>
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
            <span className="uppercase font-medium tracking-wide">Play</span>
          </button> */}

          <button
            onClick={() => setShowPlayer(true)}
            className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
          >
            <span className="uppercase font-medium tracking-wide">
              Play Trailer
            </span>
          </button>
          <Tippy content="add to watch later">
            <div
              onClick={() => {
                dispatch(addWatchLater(item));
                if (watchLater.every((i) => i.id !== id)) {
                  alert.success("Added to watch later");
                } else {
                  alert.show("Already in watch later");
                }
              }}
              className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60"
            >
              <MdWatchLater className="h-6" />
            </div>
          </Tippy>
          <div className="md:text-2xl text-shadow font-semibold">
            <MdStarRate className="inline-block relative bottom-1" />{" "}
            {vote_average}
          </div>
        </div>

        <p className="text-xs md:text-sm">{release_date}</p>
        <h4 className="text-base md:text-lg text-shadow max-w-4xl">
          {overview}
        </h4>
      </div>

      <div
        className={`absolute bg-black transition duration-700  ease-linear h-[50%] md:h-[85%]  ${
          showPlayer ? "opacity-100 z-50" : "opacity-0"
        } inset-x-[7%] top-[20%] md:top-6 text-slate-200`}
      >
        <div className="flex justify-between py-2 px-4">
          <span className="text-base md:text-2xl font-bold">Trailer</span>
          <button onClick={() => setShowPlayer(false)}>
            <AiOutlineClose className="text-base md:text-xl" />
          </button>
        </div>
        <div className="h-full relative">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video?.[index]?.key}`}
            width="100%"
            height="100%"
            controls={true}
            playing={showPlayer}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;

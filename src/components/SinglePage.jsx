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
function SinglePage() {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [videoId, setVideoId] = React.useState("");
  const fetch = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`
      );
      console.log(res);
      const data = await res.data.results[0].key;
      setVideoId(data);
      console.log(videoId);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetch();
  }, [videoId]);
  const { item, watchLater } = useSelector((state) => state.app);
  const { title, overview, release_date, vote_average } = item;
  const video = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  if (!id) {
    return <NoVideo />;
  }

  return (
    <div className="text-slate-100 mx-8 pb-4">
      <iframe
        title="videos"
        src={video}
        height="480px"
        width="100%"
        allow="autoplay"
        frameBorder="0"
      ></iframe>
      <div className="flex justify-between  mx-3 items-center">
        <h1 className="font-bold text-xl md:text-3xl md:my-2">{title}</h1>
        <div>
          <span className="pr-4 md:pr-8">
            <Tippy content="add to watch later">
              <button
                onClick={() => {
                  dispatch(addWatchLater(item));
                  if (watchLater.every((i) => i.id !== id)) {
                    alert.success("Added to watch later");
                  } else {
                    alert.show("Already in watch later");
                  }
                }}
              >
                <MdWatchLater className="inline-block text-xl md:text-[2.5rem]" />
              </button>
            </Tippy>
          </span>
          <span className={`mr-12 md:text-xl `}>
            <MdStarRate className={"inline-block md:text-3xl"} /> {vote_average}
          </span>
        </div>
      </div>
      <p className="text-left ml-4"> release date: {release_date}</p>
      <p className="my-2 mx-2 md:text-lg">{overview}</p>
    </div>
  );
}

export default SinglePage;

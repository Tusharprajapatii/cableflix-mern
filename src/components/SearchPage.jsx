import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getItem, setVideoId } from "../services/appSlice";
import { Link } from "react-router-dom";
import { apikey } from "../utils/requests";
import { MdStarRate } from "react-icons/md";
import axios from "axios";
import { Nosearch } from "./NoVideo";
function SearchPage() {
  const [results, setResults] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const { videoId, search } = useSelector((state) => state.app);

  const fetch = async () => {
    if (search.length > 0) {
      setLoad(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${search}&language=en-US&page=1&include_adult=false`
      );
      const data = res.data.results;
      console.log(data);
      setResults(data);
      setLoad(false);
    }
  };
  React.useEffect(() => {
    fetch();
  }, [search]);
  const dispatch = useDispatch();
  if (load) return <div className="h-screen w-full"></div>;

  if (!search || results.length === 0) return <Nosearch />;
  return (
    <div className="mt-20 flex flex-col items-center text-slate-200">
      {results?.map((item) => {
        const {
          id,
          backdrop_path,
          title,
          poster_path,
          name,
          overview,
          release_date,
          vote_average,
        } = item;
        const img =
          poster_path &&
          `https://image.tmdb.org/t/p/original/${backdrop_path || poster_path}`;
        results.poster_path = img;
        return (
          <div
            className="flex  flex-col md:flex-row w-full my-4 items-center "
            key={id}
            onClick={() => {
              dispatch(setVideoId(id));
              dispatch(getItem(item));
            }}
          >
            <Link to={`/${title}/${videoId}`}>
              <img
                className="h-48 md:w-[30rem] md:h-[18rem] w-72 flex-1 rounded-lg"
                src={
                  img ||
                  `https://wikireviews.com/blog/wp-content/uploads/2015/06/Movies-where-nothing-happens.jpg`
                }
                alt={name}
              />
            </Link>
            <div className="my-[4px] flex-1 mx-4">
              <h5 className="text-center text-3xl font-extrabold">{title}</h5>
              <p>
                {`${overview.substring(0, 150)}...`}
                <Link
                  className="px-[4px] ml-2 rounded-md ring-4"
                  to={`/${title}/${id}`}
                >
                  View
                </Link>{" "}
              </p>
              <div className="flex justify-center items-center my-1">
                <span className="mx-2 ">
                  <MdStarRate className="inline-block relative bottom-[2.5px]" />
                  {vote_average ? vote_average : "-"}
                </span>
                <span className="mx-2">
                  release-date: {release_date ? release_date : "-"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchPage;

import React from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../services/appSlice";
import { Link } from "react-router-dom";
import { requests } from "../utils/requests";
import axios from "axios";

function Banner() {
  const [banner, setBanner] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  // const { banner, error } = useBanner();
  const fetch = async () => {
    setLoad(true);
    const res = await axios.get(requests.fetchNetflixOriginals);
    const data = res.data?.results;
    setBanner(data[Math.floor(Math.random() * data.length)]);
    setLoad(false);
  };

  // const fetchBanner = async () => {
  //   const res = await fetch(requests.fetchToprated);
  //   const data = await res.json();
  //   setBanner(data.results);
  //   console.log(banner);
  // };

  React.useLayoutEffect(() => {
    fetch();
  }, []);

  const dispatch = useDispatch();
  const backdrop_path = banner?.backdrop_path;
  const poster_path = banner?.poster_path;
  const img = `url(https://image.tmdb.org/t/p/original/${
    backdrop_path || poster_path
  })`;
  if (load) {
    return <div className="h-[50vh] md:h-[75vh] bg-black "></div>;
  }
  return (
    <section
      className={` h-[50vh] md:h-[60vh] xl:h-[75vh] bg-cover w-full object-contain bg-center relative top-0 left-0 `}
      style={{
        backgroundImage:
          img || "url(https://image.tmdb.org/t/p/original/noimage)",
      }}
    >
      <div className="absolute bottom-12 md:bottom-10  w-full text-slate-200 font-extrabold text-xl">
        <div
          className=" ml-6 md:ml-12 my-2 w-16 ring-4 rounded-lg py-2 text-center bg-black rountext-center"
          onClick={() => {
            dispatch(getItem(banner));
          }}
        >
          <Link to={`/${banner?.title}/${banner?.id}`}>
            <button className=" hover:text-shadow-white ">PLAY</button>
          </Link>
        </div>
        <div className="ml-6 md:ml-12 md:text-2xl md:font-extrabold text-shadow">
          {banner?.title}
        </div>
        <p className="text-lg hidden md:block mx-8 my-2 text-shadow ">{`${
          banner.overview && banner.overview.substring(0, 150)
        }....`}</p>
      </div>
    </section>
  );
}

export default React.memo(Banner);

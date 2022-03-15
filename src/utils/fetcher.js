import { useSelector } from "react-redux";
import { apikey } from "./requests";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

export const useSearch = () => {
  const { search } = useSelector((state) => state.app);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${search}&language=en-US&page=1&include_adult=false`,
    fetcher
  );
  console.log(data);

  return {
    searchResults: data.results,
    isError: error,
    isLoading: !data && !error,
  };
};

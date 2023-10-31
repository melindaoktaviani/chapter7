// import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../../redux/actions/movieActions";
import CardMovie from "../../components/CardMovie";
import Navbar from "../../components/Navbar";
// import { IMAGE_URL_CARD } from "../../constants/config";
// import { convertDate } from "../../utils";

const SearchMovie = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  // const [isLoading, setIsLoading] = useState(false);

  const { search } = useSelector((state) => state.movie);

  console.log(search);

  useEffect(() => {
    dispatch(getSearchMovie(query, page));
  }, [dispatch, query, page, searchParams]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">
          Search Movie :{" "}
          <span className="font-semibold italic">"{search}"</span>
        </h1>
        <button
          className="rounded-md bg-red-600 px-3 py-2 transition-colors hover:bg-red-800"
          // onClick={handleClearSearch}
        >
          Clear seach result
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {search.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default SearchMovie;

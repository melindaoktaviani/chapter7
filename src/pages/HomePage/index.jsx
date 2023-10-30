import { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";
import HomeSkeleton from "./skeleton";
import CarauselSection from "./section/CarauselSection";
import CardMovie from "../../components/CardMovie";
import Navbar from "../../components/Navbar";
import { useSearch } from "../../contexts/SearchContext";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovie } from "../../redux/actions/movieActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const [carauselMovieList, setCarauselMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { popular } = useSelector((state) => state.movie);

  const {
    isSearch,
    search,
    isSearchLoading,
    searchResults,
    handleClearSearch,
  } = useSearch();

  useEffect(() => {
    dispatch(getPopularMovie(setCarauselMovieList, setIsLoading));
  }, [dispatch, setCarauselMovieList, setIsLoading]);

  return (
    <>
      <Navbar />
      <div className=" bg-slate-950 text-white">
        {isSearch ? (
          <section className="container min-h-[100vh] pb-10 pt-28">
            <div className="flex items-center justify-between pb-4">
              <h1 className="text-2xl font-bold">
                Search Movie :{" "}
                <span className="font-semibold italic">"{search}"</span>
              </h1>
              <button
                className="rounded-md bg-red-600 px-3 py-2 transition-colors hover:bg-red-800"
                onClick={handleClearSearch}
              >
                Clear seach result
              </button>
            </div>
            {isSearchLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                {searchResults.length === 0 ? (
                  <p>Movies not found</p>
                ) : (
                  searchResults.map((movie) => (
                    <CardMovie key={movie.id} movie={movie} />
                  ))
                )}
              </div>
            )}
          </section>
        ) : isLoading ? (
          <HomeSkeleton />
        ) : (
          <>
            <CarauselSection carauselMovieList={carauselMovieList} />

            <section className="container  py-10">
              <h1 className="pb-4 text-2xl font-bold">Popular Movies</h1>
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                {popular.map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

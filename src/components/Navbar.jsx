import { useSearch } from "../contexts/SearchContext";
import { BsSearch } from "react-icons/bs";
import { axiosInstance } from "../lib/axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../assets/search2.svg";
import axios from "axios";
import { token } from "../constants/config";
import Profile from "../assets/profile.svg";
import Down from "../assets/down.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const [arrowRotation, setArrowRotation] = useState("rotate-0");

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
    setArrowRotation(openProfile ? "rotate-0" : "rotate-180");
  };

  const logout = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    window.location.replace("/login");
  };

  const {
    search,
    setSearch,
    setSearchResults,
    setIsSearch,
    setIsSearchIsLoading,
    handleClearSearch,
  } = useSearch();

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    navigate("/");
    setIsSearch(true);
    setIsSearchIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/search/movie?page=1&query=${search}`,
      );
      const { data } = response.data;
      setIsSearch(true);
      setSearchResults(data);
      setIsSearchIsLoading(false);

      console.log(data.data);

      console.log(data);
    } catch (error) {
      console.log(error);
      setIsSearch(false);
    }
  };

  //get me
  const getMe = async () => {
    try {
      if (!token) return;
      const response = await axiosInstance.get("/auth/me");
      const { data } = response.data;
      setUser(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="absolute left-0 right-0 top-0 z-40 w-full items-center bg-transparent">
      <nav className="mx-auto flex items-center justify-between  gap-5 px-4 py-6 lg:px-10">
        <button onClick={handleClearSearch}>
          <h1 className="text-2xl font-extrabold text-red-600 md:text-6xl">
            MovieList
          </h1>
        </button>

        {user && (
          <>
            <div
              className=" d cursor-pointer lg:hidden"
              onClick={() => setOpenSearch(openSearch ? false : true)}
            >
              <img src={Search} className="h-6 w-6" />
            </div>

            <div className="hidden lg:block">
              <form
                onSubmit={handleSubmitSearch}
                className="relative flex w-[800px] items-center justify-center"
              >
                <input
                  placeholder="Seach any movies"
                  id="search_movie"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border-2 border-red-600 bg-transparent px-5 py-2 text-white outline-none backdrop-blur-md focus:border-red-800"
                />
                <button
                  type="submit"
                  className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-full bg-slate-300 p-2 transition-colors"
                >
                  <BsSearch className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        )}
        <div className="relative flex cursor-default flex-row items-center  justify-center gap-4">
          {user ? (
            <>
              <div className="flex w-40 flex-row items-center gap-1 rounded-lg bg-slate-100 pl-2">
                <img src={Profile} />
                <div className=" border-red-700 px-3 py-2 text-lg font-bold text-red-700 ">
                  {user.name.split(" ")[0]}
                </div>
                <button
                  className={`absolute right-2 transform ${arrowRotation}`}
                  onClick={toggleProfile}
                >
                  <img src={Down} />
                </button>
              </div>

              {openProfile && (
                <div className=" absolute left-0 top-14 flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-4">
                  <Link
                    className="text-center text-lg font-semibold"
                    as={Link}
                    to="/profile"
                  >
                    Profile Saya
                  </Link>
                  <h1 className="cursor-pointer text-center text-lg font-semibold">
                    Pengaturan
                  </h1>
                  <Link
                    className="rounded-lg border-2 border-red-700 bg-red-700 px-3 py-2 text-center font-bold text-white"
                    as={Link}
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                className="rounded-lg border-2 border-red-700 px-2 py-1 font-semibold text-red-700 hover:bg-white md:px-3 md:py-2 md:font-bold"
                as={Link}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="rounded-lg border-2 border-red-700 bg-red-700 px-2 py-1 font-semibold text-white md:px-3 md:py-2 md:font-bold"
                as={Link}
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className={`${openSearch ? "block" : "hidden"} lg:hidden`}>
        <div className="flex w-full items-center justify-center px-4">
          <form
            onSubmit={handleSubmitSearch}
            className="relative flex w-full items-center justify-center"
          >
            <input
              placeholder="Seach any movies"
              id="search_movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-2 border-red-600 bg-transparent px-5 py-2 text-white outline-none backdrop-blur-md focus:border-red-800"
            />
            <button
              type="submit"
              className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-full bg-slate-300 p-2 transition-colors"
            >
              <BsSearch className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

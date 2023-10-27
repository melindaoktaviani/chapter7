// import React from 'react'
import { useEffect, useState } from "react";
import { token } from "../../constants/config";
import { axiosInstance } from "../../lib/axios";
import axios from "axios";
import BinarLogo from "../../assets/binar.jpeg";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { toastify } from "../../lib/toastify";

const Profile = () => {
  const [profile, setProfile] = useState([]);

  const getMe = async () => {
    try {
      if (!token) return;
      const response = await axiosInstance.get("/auth/me");
      const { data } = response.data;
      setProfile(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
        return;
      }
      alert(error?.message);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" flex h-screen items-center justify-center ">
        <div className=" w-full justify-center px-6 md:w-[900px] md:border-2 md:px-20 md:py-8">
          <div className="flex w-full flex-row items-center justify-between border-b-2 border-slate-300 pb-4 ">
            <h1 className="text-2xl font-bold md:text-4xl">Profile Saya</h1>
            <Link className="text-2xl font-bold md:text-4xl" as={Link} to="/">
              X
            </Link>
          </div>
          <div className="flex flex-col-reverse items-center justify-between gap-10 py-4 md:flex-row">
            <div className="flex flex-row gap-8  font-bold md:text-xl">
              <div className="flex flex-col items-end gap-8 ">
                <h1 className="w-max">Nama</h1>
                <h1 className="w-max">Email</h1>
                <h1 className="w-max">Bergabung</h1>
              </div>

              <div className="flex flex-col gap-8  md:border-r-2 md:pr-20">
                <div>{profile.name}</div>
                <div>
                  {"*".repeat(profile?.email?.split("@")[0].length - 1) +
                    "@" +
                    profile?.email?.split("@")[1]}
                </div>
                <div>{profile?.createdAt?.split("T")[0]}</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={BinarLogo} className="h-40 w-full rounded-full" />
              <button className="rounded-lg border-2 border-black px-2 py-2 font-bold">
                Pilih Gambar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

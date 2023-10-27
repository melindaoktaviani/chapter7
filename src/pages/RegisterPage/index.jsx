import axios from "axios";
import { useState } from "react";
import { VITE_API_URL } from "../../constants/config";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../../components/SpinnerLoading";
import { toastify } from "../../lib/toastify";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import IconShow from "../../assets/show.svg";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (form.password !== form.confirmPassword) {
      toastify({
        message: "Password tidak sama",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_API_URL}/auth/register`, {
        email: form.email,
        name: form.firstName + " " + form.lastName,
        password: form.password,
      });
      toastify({
        message: "Register berhasil",
        type: "success",
      });

      // Setelah berhasil register, langsung redirect ke halaman home
      const result = response.data;
      localStorage.setItem("token", result.data.token);
      // navigate("/");

      // // Setelah berhasil register, langsung redirect ke halaman login
      navigate("/login");
    } catch (error) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" flex h-screen  items-center justify-center pt-10 ">
        <div className="px-20 py-10  sm:w-[600px] md:border-2 ">
          <h1 className="flex w-full justify-center pb-8 text-center text-2xl font-bold md:text-4xl">
            CREATE ACCOUNT{" "}
          </h1>

          {/* Form inputan dan button register */}
          <div className="flex flex-col gap-5 ">
            <div>
              <h2 className="mb-2 text-lg font-bold">First Name</h2>
              <input
                id="firstName"
                className="h-10 w-full rounded-md border-2 pl-2 text-lg"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => {
                  setForm({ ...form, firstName: e.target.value });
                }}
              />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Last Name</h2>
              <input
                id="lastName"
                className="h-10 w-full rounded-md border-2 pl-2 text-lg"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => {
                  setForm({ ...form, lastName: e.target.value });
                }}
              />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Email Address</h2>
              <input
                id="email"
                className="h-10 w-full rounded-md border-2 pl-2 text-lg"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Password</h2>
              <div className="relative flex flex-row">
                <input
                  className="h-10 w-full rounded-md border-2 pl-2 text-lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                />
                <button
                  className="absolute bottom-1/2 right-2 translate-y-1/2 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={IconShow} />
                </button>
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Confirm Password</h2>
              <div className="relative flex flex-row">
                <input
                  className="h-10 w-full rounded-md border-2 pl-2 text-lg"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                  }}
                />
                <button
                  className="absolute bottom-1/2 right-2 translate-y-1/2 "
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img src={IconShow} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-3 flex items-center justify-center rounded-xl border-2 bg-red-600 py-3 font-bold text-white "
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <SpinnerLoading /> : <span>Register Now</span>}
            </button>
          </div>

          {/* login ketika sudah memiliki akun  */}
          <div className="mt-6 flex flex-col items-center gap-2 md:flex-row md:justify-center">
            <p>Have already an account?</p>
            <Link
              className="border-b-2 border-black font-bold"
              as={Link}
              to="/login"
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

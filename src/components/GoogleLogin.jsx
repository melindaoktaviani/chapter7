import axios from "axios";
import { VITE_API_URL } from "../constants/config";
import { useGoogleLogin } from "@react-oauth/google";
import Google from "../assets/google.svg";

const GoogleLogin = () => {
  const LoginWithGoogle = async (accessToken) => {
    try {
      const data = JSON.stringify({
        access_token: accessToken,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${VITE_API_URL}/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => LoginWithGoogle(responseGoogle.access_token),
  });
  return (
    <button onClick={() => loginGoogle()}>
      <img src={Google} />
    </button>
  );
};


export default GoogleLogin;

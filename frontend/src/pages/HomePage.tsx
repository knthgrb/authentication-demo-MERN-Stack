import React, { useEffect } from "react";
import { useDataLayer } from "../store/useDataLayer";
import * as UserApi from "../services/authentication";
import { isAxiosError, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { user } = useDataLayer();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await UserApi.logOut();
      window.location.reload();
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<UserApi.ErrorResponse>;
        alert(axiosError);
      }
    }
  };

  // REDIRECT IF THERE IS NO USER
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <>
      <div>
        Hi this is <span className="text-blue-500">{user?.username}</span>
      </div>
      <button className="text-red-500" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default HomePage;

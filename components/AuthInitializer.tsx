import { accessToken, logout } from "@/libs/redux/authSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import {
  getAllConcepts,
  getAllRestaurants,
} from "@/libs/redux/masterDataSlice";
import { useEffect } from "react";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenLoginWithGmail = urlParams.get("accessToken");
    const token =
      localStorage.getItem("accessToken") ||
      (accessTokenLoginWithGmail as string);

    if (!token) {
      dispatch(logout());
    }

    dispatch(accessToken({ accessToken: token }));
    dispatch(getAllConcepts());
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;

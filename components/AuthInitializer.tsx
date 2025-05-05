import { accessToken, logout } from "@/libs/redux/authSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import { useEffect } from "react";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    if (!token) {
      dispatch(logout());
    }

    dispatch(accessToken({ accessToken: token }));
  }, [dispatch]);

  return null;
};

export default AuthInitializer;

import socket from "@/features/notification/socket";
import { accessToken, logout } from "@/libs/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getAllConcepts,
  getAllNotifications,
  getAllRestaurants,
  unReadNotifications,
} from "@/libs/redux/masterDataSlice";
import { useEffect, useMemo } from "react";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  );

  const allNotificationsUnRead = useMemo(() => {
    return (
      allNotifications?.data.data.filter((item) => item.read === false) || []
    );
  }, [allNotifications]);

  useEffect(() => {
    const handleConnect = () => {
      const socketId = socket.id;
      if (socketId) {
        localStorage.setItem("socketId", socketId);
      }
    };

    const handleDisconnect = () => {
      localStorage.removeItem("socketId");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      unReadNotifications({
        unReadNotificationsQuantity: allNotificationsUnRead.length,
      })
    );
  }, [dispatch, allNotificationsUnRead]);

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
    dispatch(getAllNotifications());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;

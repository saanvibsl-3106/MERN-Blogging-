
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};

// auth is obj and contain useAuth hook !
 //useEffect it will run the effect only when that dependency changes
  // here we have dependency as auth object as soon as auth object changes it will run the effect
  //in the useEffect hook, the dependency is actually LogoutUser , not the auth
  //The useEffect hook will run the effect only when the ][LogoutUser] object changes.

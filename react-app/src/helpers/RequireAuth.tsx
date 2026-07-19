import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const jwt = localStorage.getItem("data");

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

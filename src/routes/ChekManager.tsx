import   { type JSX } from "react";
import { useAuth } from "../hooks/useTokens";
import { Navigate } from "react-router-dom";

const ChekManager = ({ children }: { children: JSX.Element }) => {
  const manager = useAuth((state) => state.role);
  if (manager !=='manager') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ChekManager;

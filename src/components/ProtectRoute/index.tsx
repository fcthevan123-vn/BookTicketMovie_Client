import { useAuthenticate } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLogin] = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/register");
    }
  }, [isLogin, navigate]);

  if (!isLogin) {
    return <></>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

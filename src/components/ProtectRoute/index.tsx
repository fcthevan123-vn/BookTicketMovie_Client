import { useAuthenticate } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  checkAdmin: boolean | null | undefined;
}

function ProtectedRoute({ children, checkAdmin }: ProtectedRouteProps) {
  const [isLogin, , dataUser] = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }

    if (checkAdmin) {
      if (dataUser.type !== "admin") {
        navigate("/error");
      }
    }
  }, [checkAdmin, dataUser.type, isLogin, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;

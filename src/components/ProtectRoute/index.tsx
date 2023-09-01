import { useAuthenticate } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import LoaderPage from "../Loaders/LoaderPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLogin] = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  // if (!isLogin) {
  //   return (
  //     <>
  //       <LoaderPage></LoaderPage>
  //     </>
  //   );
  // }

  return <>{children}</>;
}

export default ProtectedRoute;

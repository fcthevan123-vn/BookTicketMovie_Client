import { useState, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userServices } from "../../services";
import { userSlice } from "../../redux/reducers";

type ProviderGetProfileProps = {
  children: React.ReactNode;
};

function ProviderGetProfile({ children }: ProviderGetProfileProps) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const res = await userServices.getProfile();
      console.log("res", res);
      if (res.err === 0) {
        const { token } = res;

        const resInfo = await userServices.getUserById(token.id);
        if (resInfo.err === 0) {
          dispatch(
            userSlice.actions.handleLogin({
              _id: resInfo.dataUser._id,
              email: resInfo.dataUser.email,
              type: resInfo.dataUser.type,
              fullName: resInfo.dataUser.fullName,
              avatar: resInfo.dataUser.avatar,
              emailVerified: resInfo.dataUser.emailVerified,
            })
          );
        } else {
          dispatch(
            userSlice.actions.handleLogin({
              _id: token.id,
              email: token.email,
              type: token.type,
              fullName: token.fullName,
              avatar: token.avatar,
              emailVerified: resInfo?.dataUser?.emailVerified || false,
            })
          );
        }
        setLogin(true);
      } else {
        navigate("/register");
      }
    };
    getProfile();
  }, [dispatch, navigate]);

  if (!login) {
    return <div className="my-3">Logging ... </div>;
  } else {
    return <>{children}</>;
  }
}

export default ProviderGetProfile;

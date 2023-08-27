import { ReactNode, useCallback, useEffect } from "react";
import "./GlobalStyles.scss";
import { userServices } from "../../services";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";
import { useAuthenticate } from "../../hooks";

type GlobalStylesProps = {
  children: ReactNode;
};

function GlobalStyles({ children }: GlobalStylesProps) {
  const dispatch = useDispatch();
  const [isLogged] = useAuthenticate();

  const checkAuthenticate = useCallback(async () => {
    try {
      const res = await userServices.getProfile();
      if (res.statusCode !== 0) {
        dispatch(userSlice.actions.toggleLogin({}));
      }
    } catch (error) {
      if (isLogged === true) {
        dispatch(userSlice.actions.toggleLogin({}));
      }
    }
  }, [dispatch, isLogged]);

  useEffect(() => {
    if (isLogged === true) {
      checkAuthenticate();
    }
  }, [checkAuthenticate, isLogged]);

  return <>{children}</>;
}

export default GlobalStyles;

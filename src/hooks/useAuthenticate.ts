import { userSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

interface curUserI {
  type: string;
}

export default function () {
  const isLogged = useSelector(userSelector.isLoginSelector);
  const dataUser = useSelector(userSelector.dataUser);
  const type = dataUser?.type || null;

  return [isLogged, type, dataUser];
}

import { ReactNode } from "react";
import "./GlobalStyles.scss";
type GlobalStylesProps = {
  children: ReactNode;
};

function GlobalStyles({ children }: GlobalStylesProps) {
  return <>{children}</>;
}

export default GlobalStyles;

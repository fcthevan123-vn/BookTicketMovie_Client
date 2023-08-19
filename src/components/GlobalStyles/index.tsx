import { ReactNode } from "react";
import "./GlobalStyles.css";
type GlobalStylesProps = {
  children: ReactNode;
};

function GlobalStyles({ children }: GlobalStylesProps) {
  return <>{children}</>;
}

export default GlobalStyles;

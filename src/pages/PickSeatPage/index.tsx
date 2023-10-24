import React from "react";
import { PickSeatProvider } from "../../components/Provider/PickSeatProvider";
import PickSeatPage from "./PickSeatPage";

type Props = {};

function ProviderWrapper({}: Props) {
  return (
    <div>
      <PickSeatProvider>
        <PickSeatPage></PickSeatPage>
      </PickSeatProvider>
    </div>
  );
}

export default ProviderWrapper;

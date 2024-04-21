import { PickSeatProvider } from "../../components/Provider/PickSeatProvider";
import PickSeatPage from "./PickSeatPage";

function ProviderWrapper() {
  return (
    <div>
      <PickSeatProvider>
        <PickSeatPage></PickSeatPage>
      </PickSeatProvider>
    </div>
  );
}

export default ProviderWrapper;

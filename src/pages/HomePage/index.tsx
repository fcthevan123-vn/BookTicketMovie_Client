import { TrendingMovie } from "../../components/Sections/TrendingMovie";
import { StatusMovie } from "../../components/Sections/StatusMovie";

function HomePage() {
  return (
    <div className="">
      <TrendingMovie></TrendingMovie>
      <StatusMovie></StatusMovie>
    </div>
  );
}

export default HomePage;

import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { TrendingMovie } from "../../components/Sections/TrendingMovie";

function HomePage() {
  return (
    <div className="">
      <TrendingMovie></TrendingMovie>
    </div>
  );
}

export default HomePage;

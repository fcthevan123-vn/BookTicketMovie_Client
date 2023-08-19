import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="container flex gap-3 mt-3 flex-col justify-center items-center h-full">
      Home page
      <Link to={"/"}>
        {" "}
        <button className="btn btn-primary">Login</button>
      </Link>
      <Link to={"/register"}>
        <button className="btn btn-secondary">Register</button>
      </Link>
    </div>
  );
}

export default HomePage;

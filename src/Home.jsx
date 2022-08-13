import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="authentication" className="btn">Click to view our auth page</Link>
    </div>
  );
}

export default Home;

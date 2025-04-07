import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Home Page</h1>
        <button onClick={() => navigate("/theater")}>Go to Theater</button>
      </div>
    </>
  );
}

export default App;

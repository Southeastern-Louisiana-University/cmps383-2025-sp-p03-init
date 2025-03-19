import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface UserDto {
  userName: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState<UserDto | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR!!!!!
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      {!currentUser ? (
        <form action="/api/theaters" method="post" className="form-example" onSubmit={(e) => saveData(e)}>
          <div className="form-example">
            <label htmlFor="name">Enter your username!: </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="password">Enter your password: </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginError ? <p style={{ color: "red" }}>{loginError}</p> : null}
          <div className="form-example">
            <input type="submit" value={loading ? "Loading..." : "Login"} disabled={loading} />
          </div>
        </form>
      ) : (
        <p>some other form thing</p>
      )}
    </>
  );

  function saveData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoginError("");
    setLoading(true);
    fetch("/api/authentication/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data: UserDto) => setCurrentUser(data))
      .catch(() => {
        setLoginError("Wrong username or password");
      })
      .finally(() => {
        setLoading(false);
      });
  }
}

export default App;

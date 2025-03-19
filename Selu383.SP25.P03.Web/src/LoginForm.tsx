import React, { useState } from "react";
import { UserDto } from "./UserDto";

interface LoginFormProps {
  onLoginSuccess: (user: UserDto) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form className="form-example" onSubmit={(e) => login(e)}>
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
      {formError ? <p style={{ color: "red" }}>{formError}</p> : null}
      <div className="form-example">
        <input type="submit" value={loading ? "Loading..." : "Login"} disabled={loading} />
      </div>
    </form>
  );

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }

    setFormError("");
    setLoading(true);
    fetch("/api/authentication/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data: UserDto) => onLoginSuccess(data))
      .catch(() => {
        setFormError("Wrong username or password");
      })
      .finally(() => {
        setLoading(false);
      });
  }
}

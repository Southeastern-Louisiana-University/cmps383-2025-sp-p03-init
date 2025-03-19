import React, { useState } from "react";
import { TheaterDto } from "./TheaterDto";

interface AddTheaterFormProps {
  onAddTheaterSuccess: (theater: TheaterDto) => void;
}

export function AddTheaterForm({ onAddTheaterSuccess }: AddTheaterFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form className="form-example" onSubmit={(e) => AddTheater(e)}>
      <div className="form-example">
        <label htmlFor="name">Enter the theater name: </label>
        <input type="text" name="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-example">
        <label htmlFor="address">Enter address: </label>
        <textarea name="address" id="address" required value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      {formError ? <p style={{ color: "red" }}>{formError}</p> : null}
      <div className="form-example">
        <input type="submit" value={loading ? "Loading..." : "AddTheater"} disabled={loading} />
      </div>
    </form>
  );

  function AddTheater(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }

    setFormError("");
    setLoading(true);
    fetch("/api/theaters", {
      method: "POST",
      body: JSON.stringify({ name, address, seatcount: 12, managerId: null }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data: TheaterDto) => onAddTheaterSuccess(data))
      .catch(() => {
        setFormError("Invalid theater");
      })
      .finally(() => {
        setLoading(false);
      });
  }
}

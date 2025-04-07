import { useState } from "react";

function TheaterPost() {
  const [theaterName, setTheaterName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const theaterData = { name: theaterName, location: location };

    try {
      const response = await fetch("http://localhost:5000/api/theaters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
        },
        body: JSON.stringify(theaterData),
      });

      if (!response.ok) throw new Error("Failed to add theater");

      setMessage("Theater added successfully!");
      setTheaterName("");
      setLocation("");
    } catch (error) {
      setMessage("Error adding theater");
    }
  };

  return (
    <div>
      <h2>Add Theater</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Theater Name"
          value={theaterName}
          onChange={(e) => setTheaterName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TheaterPost;

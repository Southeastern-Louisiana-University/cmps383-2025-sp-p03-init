import { useEffect, useState } from "react";
import { Card, CardMedia, Typography } from "@mui/material";

type Showtime = {
  showtime: string;
};

type Movie = {
  id: number;
  title: string;
  description: string;
  genre: string;
  runtimeMinutes: number;
  showtimes: Showtime[];
};

function MovieCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://localhost:7027/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);
  const scroll = (scrollOffset: number) => {
    const container = document.getElementById("carousel");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };
  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn left" onClick={() => scroll(-300)}>
        &#8592;
      </button>

      <div className="carousel-container" id="carousel">
        {movies.map((movie) => (
          <Card key={movie.id} variant="outlined">
            <CardMedia
              component="img"
              alt="green iguana" // movie.name/movie.description
              height="140" //probably convert to viewport
              image={movie.ImageUrl} // movie.imgURL
            />
            <div className="movie-info">
              <Typography gutterBottom variant="h5" component="div">
                {movie.title}
              </Typography>
              <p>{movie.description}</p>
              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p>
                <strong>Runtime:</strong> {movie.runtimeMinutes} min
              </p>
              <p>
                <strong>Showtimes:</strong>
              </p>
              <ul>
                {movie.showtimes.map((st, index) => (
                  <li key={index}>
                    {new Date(st.showtime).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
      <button className="carousel-btn right" onClick={() => scroll(300)}>
        &#8594;
      </button>
    </div>
  );
}

export default MovieCarousel;

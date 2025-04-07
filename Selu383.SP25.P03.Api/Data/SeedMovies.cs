using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Selu383.SP25.P03.Api.Features.Movies;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Selu383.SP25.P03.Api.Data
{
    public static class SeedMovies
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
            {
                context.Movies.RemoveRange(context.Movies);
                context.SaveChanges();
                var movies = new List<Movie>
                {
                    new Movie
                    {
                        Title = "Iron Man",
                        Description = "Tony Stark becomes Iron Man",
                        Genre = "Action",
                        RuntimeMinutes = 126,
                        ImageUrl = "https://i.imgur.com/UfjpniJ.jpeg",
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(1) },
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(4) }
                        }
                    },
                    new Movie
                    {
                        Title = "The Incredible Hulk",
                        Description = "Bruce Banner transforms into the Hulk",
                        Genre = "Action",
                        RuntimeMinutes = 112,
                        ImageUrl = "https://i.imgur.com/ETeowyI.jpeg",
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(2) }
                        }
                    },
                    new Movie
                    {
                        Title = "Iron Man 2",
                        Description = "Tony Stark faces new challenges",
                        Genre = "Action",
                        RuntimeMinutes = 124,
                        ImageUrl = "https://i.imgur.com/zhIg0Ga.jpeg",
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(3) }
                        }
                    },
                    new Movie
                    {
                        Title = "Alien Covenant",
                        Description = "Aliens taking over",
                        Genre = "Horror",
                        RuntimeMinutes = 115,
                        ImageUrl = "https://i.imgur.com/54EwN2G.jpeg",
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(5) }
                        }
                    },
                    new Movie
                    {
                        Title = "IT",
                        Description = "Scary clown",
                        Genre = "Horror",
                        RuntimeMinutes = 124,
                        ImageUrl = "https://i.imgur.com/8Sp97cp.jpeg",
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(6) }
                        }
                    },
                    new Movie
                    {
                        Title = "Titanic",
                        Description = "Ship goes out and sinks",
                        Genre = "Action",
                        RuntimeMinutes = 143,
                        ImageUrl = "https://i.imgur.com/pMCrpy9.jpeg",
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(7) }
                        }
                    },
                };
                context.Movies.AddRange(movies);
                context.SaveChanges();
            }
        }
    }
}

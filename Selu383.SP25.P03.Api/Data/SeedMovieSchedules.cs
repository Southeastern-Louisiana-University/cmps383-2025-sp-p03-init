using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Selu383.SP25.P03.Api.Features.Movies;
using Selu383.SP25.P03.Api.Features.Theaters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Selu383.SP25.P03.Api.Data
{
    public static class SeedMovieSchedules
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>());
            context.MovieShowtimes.RemoveRange(context.MovieShowtimes);
            context.SaveChanges();

            var movies = context.Movies.ToList();
            var screens = context.Screens.Include(s => s.Theater).ToList();
            var showtimes = new List<MovieShowtime>();

            foreach (var movie in movies)
            {
                foreach (var screen in screens)
                {
                    showtimes.Add(new MovieShowtime { MovieId = movie.Id, ScreenId = screen.Id, Showtime = new TimeSpan(12, 0, 0) });
                    showtimes.Add(new MovieShowtime { MovieId = movie.Id, ScreenId = screen.Id, Showtime = new TimeSpan(15, 0, 0) });
                    showtimes.Add(new MovieShowtime { MovieId = movie.Id, ScreenId = screen.Id, Showtime = new TimeSpan(18, 0, 0) });
                }
            }

            context.MovieShowtimes.AddRange(showtimes);
            context.SaveChanges();
        }
    }
}




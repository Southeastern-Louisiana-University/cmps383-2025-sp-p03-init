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
            using (var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
            {
                context.MovieSchedules.RemoveRange(context.MovieSchedules);
                context.SaveChanges();
                var movies = context.Movies.ToList();
                var theaters = context.Theaters.ToList();
                var schedules = new List<MovieSchedule>();
                foreach (var movie in movies)
                {
                    foreach (var theater in theaters)
                    {
                        schedules.Add(new MovieSchedule { MovieId = movie.Id, TheaterId = theater.Id, Showtime = DateTime.Today.AddHours(12) });
                        schedules.Add(new MovieSchedule { MovieId = movie.Id, TheaterId = theater.Id, Showtime = DateTime.Today.AddHours(15) });
                        schedules.Add(new MovieSchedule { MovieId = movie.Id, TheaterId = theater.Id, Showtime = DateTime.Today.AddHours(18) });
                    }
                }
                context.MovieSchedules.AddRange(schedules);
                context.SaveChanges();
            }
        }
    }
}
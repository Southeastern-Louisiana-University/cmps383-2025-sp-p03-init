using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Selu383.SP25.P03.Api.Features.Movies;
using Selu383.SP25.P03.Api.Features.Tickets;
using Selu383.SP25.P03.Api.Features.Theaters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Selu383.SP25.P03.Api.Data
{
    public static class SeedTickets
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
            {
                context.Tickets.RemoveRange(context.Tickets);
                context.SaveChanges();
                int minSeats = 30;
                var schedules = context.MovieShowtimes.Include(ms => ms.Screen).ThenInclude(s => s.Theater).ToList();
                var tickets = new List<Ticket>();
                foreach (var schedule in schedules)
                {
                    int seatCount = schedule.Screen?.SeatCount ?? minSeats;
                    if (seatCount < minSeats)
                        seatCount = minSeats;
                    for (int i = 1; i <= seatCount; i++)
                    {
                        tickets.Add(new Ticket
                        {
                            MovieShowtimeId = schedule.Id,
                            SeatNumber = i.ToString(),
                            SeatType = "Premium",
                            IsPurchased = false,
                            ConfirmationCode = "",
                            MovieName = "",
                            TheaterLocation = "",
                            ShowTime = null
                        });
                    }
                }
                context.Tickets.AddRange(tickets);
                context.SaveChanges();
            }
        }
    }
}



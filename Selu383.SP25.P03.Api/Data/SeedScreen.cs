using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Selu383.SP25.P03.Api.Features.Theaters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Selu383.SP25.P03.Api.Data
{
    public static class SeedScreens
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
            {
                context.Set<Screen>().RemoveRange(context.Set<Screen>());
                context.SaveChanges();
                var theaters = context.Theaters.ToList();
                var screens = new List<Screen>();
                foreach (var theater in theaters)
                {
                    screens.Add(new Screen { Name = theater.Name + " - Screen 1", SeatCount = theater.SeatCount > 0 ? theater.SeatCount : 50, TheaterId = theater.Id });
                    screens.Add(new Screen { Name = theater.Name + " - Screen 2", SeatCount = theater.SeatCount > 0 ? theater.SeatCount : 50, TheaterId = theater.Id });
                }
                context.Set<Screen>().AddRange(screens);
                context.SaveChanges();
            }
        }
    }
}

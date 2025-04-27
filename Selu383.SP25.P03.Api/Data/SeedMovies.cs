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

                var theaters = context.Theaters.ToList();

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
                        Rating = "PG-13",
                        TrailerUrl = "https://www.youtube.com/embed/8ugaeA-nMTc?si=5i8SHBdvpZX1s3JA"
                    },
                    new Movie
                    {
                        Title = "The Incredible Hulk",
                        Description = "Bruce Banner transforms into the Hulk",
                        Genre = "Action",
                        RuntimeMinutes = 112,
                        ImageUrl = "https://i.imgur.com/ETeowyI.jpeg",
                        Rating = "PG-13",
                        TrailerUrl = "https://www.youtube.com/embed/xbqNb2PFKKA?si=vYU58mV-Ns4G7aWA"
                    },
                    new Movie
                    {
                        Title = "Iron Man 2",
                        Description = "Tony Stark faces new challenges",
                        Genre = "Action",
                        RuntimeMinutes = 124,
                        ImageUrl = "https://i.imgur.com/zhIg0Ga.jpeg",
                        Rating = "PG-13",
                        TrailerUrl = "https://www.youtube.com/embed/BoohRoVA9WQ?si=7qSDSqPCtwPiORG8"
                    },
                    new Movie
                    {
                        Title = "Alien: Covenant",
                        Description = "Aliens taking over",
                        Genre = "Horror",
                        RuntimeMinutes = 115,
                        ImageUrl = "https://i.imgur.com/54EwN2G.jpeg",
                        Rating = "R",
                        TrailerUrl = "https://www.youtube.com/embed/svnAD0TApb8?si=8I7gkNzL6xXreBU6"
                    },
                    new Movie
                    {
                        Title = "IT",
                        Description = "Scary clown",
                        Genre = "Horror",
                        RuntimeMinutes = 124,
                        ImageUrl = "https://i.imgur.com/8Sp97cp.jpeg",
                        Rating = "R",
                        TrailerUrl = "https://www.youtube.com/embed/xKJmEC5ieOk?si=yDGphllGAGH53Niw"
                    },
                    new Movie
                    {
                        Title = "Titanic",
                        Description = "Ship goes out and sinks",
                        Genre = "Action",
                        RuntimeMinutes = 143,
                        ImageUrl = "https://i.imgur.com/pMCrpy9.jpeg",
                        Rating = "TV-PG",
                        TrailerUrl = "https://www.youtube.com/embed/kVrqfYjkTdQ?si=x0aADl3GwwNwVuQT"
                    },
                    new Movie
                    {
                        Title = "The Evil Dead",
                        Description = "Five college students vacationing in an isolated cabin in the woods, where they find an audio tape that, when played, releases a legion of demons and spirits. Four members of the group suffer from demonic possession, forcing the fifth member, Ash Williams (Campbell), to survive an onslaught of increasingly gory mayhem. ",
                        Genre = "Horror",
                        RuntimeMinutes = 85,
                        ImageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Foriginal%2FuJ2gzKLY8ZFBfn5SvsnFs8BnPmg.jpg&f=1&nofb=1&ipt=44496198776dee73e673f6a053d664b6d4e499fc31752c01b3f97d1e311d7422&ipo=images",
                        Rating = "NC-17",
                        TrailerUrl = "https://www.youtube.com/embed/NL6mioAlpJk?si=3aTEj0IAe_Jetwcg"
                    },
                    new Movie
                    {
                        Title = "The Wizard Of Oz",
                        Description = "Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others' wishes.",
                        Genre = "Fantasy",
                        RuntimeMinutes = 102,
                        ImageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Foriginal%2F7gGXeoGycQUUokMfgnwmsqw5pKo.jpg&f=1&nofb=1&ipt=087bbc968110b5dcae6015c3ffdedfa1fdb111f5b330184649949ff3d8416c1d&ipo=images",
                        Rating = "G",
                        TrailerUrl = "https://www.youtube.com/embed/i2zdYIF5DAY?si=9TAH3X0WHL0zIpwB"
                    },
                };
                context.Movies.AddRange(movies);
                context.SaveChanges();
            }
        }
    }
}

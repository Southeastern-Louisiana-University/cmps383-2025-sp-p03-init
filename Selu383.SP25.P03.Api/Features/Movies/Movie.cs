using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class Movie
    {
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Genre { get; set; }
        public int RuntimeMinutes { get; set; }
        public ICollection<MovieShowtime> Showtimes { get; set; } = new List<MovieShowtime>();

        public string? ImageUrl { get; set; }
    }
}

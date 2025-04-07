using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class MovieShowtime
    {
        public int Id { get; set; }
        public DateTime Showtime { get; set; }
        public int MovieId { get; set; }

        [ForeignKey("MovieId")]
        [JsonIgnore] // <-- Add this
        public Movie? Movie { get; set; }
    }
}
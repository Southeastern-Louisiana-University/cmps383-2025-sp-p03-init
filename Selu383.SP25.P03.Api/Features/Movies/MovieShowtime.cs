using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Selu383.SP25.P03.Api.Features.Theaters;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class MovieShowtime
    {
        public int Id { get; set; }
        public TimeSpan Showtime { get; set; }
        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        [JsonIgnore]
        public Movie? Movie { get; set; }
        public int ScreenId { get; set; }
        [ForeignKey("ScreenId")]
        public Screen? Screen { get; set; }
    }
}


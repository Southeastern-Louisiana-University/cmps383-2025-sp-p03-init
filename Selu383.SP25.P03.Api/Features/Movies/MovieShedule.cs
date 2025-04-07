using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP25.P03.Api.Features.Theaters;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class MovieSchedule
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        public Movie? Movie { get; set; }
        public int TheaterId { get; set; }
        [ForeignKey("TheaterId")]
        public Theater? Theater { get; set; }
        public DateTime Showtime { get; set; }
    }
}
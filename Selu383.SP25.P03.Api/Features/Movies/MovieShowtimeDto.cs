using System;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class MovieShowtimeDto
    {
        public int Id { get; set; }
        public TimeSpan Showtime { get; set; }
        public int ScreenId { get; set; }
    }
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Theaters
{
    public class Screen
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        public int SeatCount { get; set; }
        public int TheaterId { get; set; }
        public Theater? Theater { get; set; }
    }
}

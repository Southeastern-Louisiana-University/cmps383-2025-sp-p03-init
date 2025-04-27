using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP25.P03.Api.Features.Movies;

namespace Selu383.SP25.P03.Api.Features.Tickets
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int MovieShowtimeId { get; set; }
        [ForeignKey("MovieShowtimeId")]
        public MovieShowtime? MovieShowtime { get; set; }
        public string CustomerName { get; set; } = "";
        [Required]
        public string SeatNumber { get; set; } = "";
        public DateTime? PurchaseTime { get; set; }
        public bool IsPurchased { get; set; }
        [Required]
        public string ConfirmationCode { get; set; } = "";
        [Required]
        public string MovieName { get; set; } = "";
        [Required]
        public string TheaterLocation { get; set; } = "";
        public TimeSpan? ShowTime { get; set; }
        [Required]
        public string SeatType { get; set; } = "Premium";
    }
}

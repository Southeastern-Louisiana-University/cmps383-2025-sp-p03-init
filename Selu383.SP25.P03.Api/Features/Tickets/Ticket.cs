using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP25.P03.Api.Features.Movies;

namespace Selu383.SP25.P03.Api.Features.Tickets
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int MovieScheduleId { get; set; }
        [ForeignKey("MovieScheduleId")]
        public MovieSchedule? MovieSchedule { get; set; }
        [Required]
        public required string CustomerName { get; set; }
        [Required]
        public required string SeatNumber { get; set; }
        public DateTime PurchaseTime { get; set; }
    }
}

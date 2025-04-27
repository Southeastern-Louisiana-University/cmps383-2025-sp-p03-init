using System;

namespace Selu383.SP25.P03.Api.Features.Tickets
{
    public class TicketDto
    {
        public int Id { get; set; }
        public int MovieShowtimeId { get; set; }
        public string SeatNumber { get; set; } = "";
        public bool IsPurchased { get; set; }
        public string ConfirmationCode { get; set; } = "";
        public string CustomerName { get; set; } = "";
        public DateTime? PurchaseTime { get; set; }
        public string MovieName { get; set; } = "";
        public string TheaterLocation { get; set; } = "";
        public TimeSpan? ShowTime { get; set; }
    }
}

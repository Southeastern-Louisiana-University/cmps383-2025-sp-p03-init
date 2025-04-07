using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Tickets;

namespace Selu383.SP25.P03.Api.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly DataContext _context;
        public TicketsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("movieschedule/{movieScheduleId}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketsByMovieSchedule(int movieScheduleId)
        {
            var tickets = await _context.Tickets.Where(t => t.MovieScheduleId == movieScheduleId).ToListAsync();
            return tickets;
        }

        [HttpPost]
        public async Task<ActionResult<Ticket>> PurchaseTicket(Ticket ticket)
        {
            bool seatTaken = await _context.Tickets.AnyAsync(t => t.MovieScheduleId == ticket.MovieScheduleId &&
                                                                   t.SeatNumber == ticket.SeatNumber);
            if (seatTaken)
                return BadRequest("Seat already booked.");
            ticket.PurchaseTime = DateTime.UtcNow;
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicketsByMovieSchedule), new { movieScheduleId = ticket.MovieScheduleId }, ticket);
        }
    }
}
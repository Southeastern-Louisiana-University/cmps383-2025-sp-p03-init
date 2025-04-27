using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
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
        public TicketsController(DataContext context) => _context = context;

        [HttpGet("movieshowtime/{movieShowtimeId}")]
        public async Task<ActionResult<IEnumerable<TicketDto>>> GetTicketsByMovieShowtime(int movieShowtimeId)
        {
            var dtos = await _context.Tickets
                .Where(t => t.MovieShowtimeId == movieShowtimeId)
                .Select(t => new TicketDto
                {
                    Id = t.TicketId,
                    MovieShowtimeId = t.MovieShowtimeId,
                    SeatNumber = t.SeatNumber,
                    IsPurchased = t.IsPurchased,
                    ConfirmationCode = t.ConfirmationCode,
                    CustomerName = t.CustomerName,
                    PurchaseTime = t.PurchaseTime,
                    MovieName = t.MovieName,
                    TheaterLocation = t.TheaterLocation,
                    ShowTime = t.ShowTime
                })
                .ToListAsync();
            return Ok(dtos);
        }

        [HttpPost("purchase")]
        public async Task<ActionResult<TicketDto>> PurchaseTicket([FromBody] TicketDto purchase)
        {
            var ticketEntity = await _context.Tickets.FirstOrDefaultAsync(t =>
                t.MovieShowtimeId == purchase.MovieShowtimeId &&
                t.SeatNumber == purchase.SeatNumber &&
                !t.IsPurchased);

            if (ticketEntity == null) return BadRequest("Ticket not available or already purchased.");

            var showtime = await _context.MovieShowtimes
                .Include(ms => ms.Movie)
                .Include(ms => ms.Screen).ThenInclude(s => s.Theater)
                .FirstOrDefaultAsync(ms => ms.Id == purchase.MovieShowtimeId);

            if (showtime == null) return BadRequest("Invalid movie showtime.");

            ticketEntity.IsPurchased = true;
            ticketEntity.ConfirmationCode = GenerateConfirmationCode(12);
            ticketEntity.CustomerName = purchase.CustomerName;
            ticketEntity.PurchaseTime = DateTime.UtcNow;
            ticketEntity.MovieName = showtime.Movie!.Title;
            ticketEntity.TheaterLocation = showtime.Screen!.Theater!.Address;
            ticketEntity.ShowTime = showtime.Showtime;

            await _context.SaveChangesAsync();

            var dto = new TicketDto
            {
                Id = ticketEntity.TicketId,
                MovieShowtimeId = ticketEntity.MovieShowtimeId,
                SeatNumber = ticketEntity.SeatNumber,
                IsPurchased = ticketEntity.IsPurchased,
                ConfirmationCode = ticketEntity.ConfirmationCode,
                CustomerName = ticketEntity.CustomerName,
                PurchaseTime = ticketEntity.PurchaseTime,
                MovieName = ticketEntity.MovieName,
                TheaterLocation = ticketEntity.TheaterLocation,
                ShowTime = ticketEntity.ShowTime
            };

            return CreatedAtAction(nameof(GetTicketsByMovieShowtime),
                new { movieShowtimeId = dto.MovieShowtimeId }, dto);
        }

        private string GenerateConfirmationCode(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var rand = new Random();
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[rand.Next(s.Length)]).ToArray());
        }
    }
}

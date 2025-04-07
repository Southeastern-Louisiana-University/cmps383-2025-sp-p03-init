using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Movies;

namespace Selu383.SP25.P03.Api.Controllers
{
    [Route("api/movieschedules")]
    [ApiController]
    public class MovieSchedulesController : ControllerBase
    {
        private readonly DataContext _context;
        public MovieSchedulesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieSchedule>>> GetMovieSchedules()
        {
            return await _context.MovieSchedules
                .Include(ms => ms.Movie)
                .Include(ms => ms.Theater)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieSchedule>> GetMovieSchedule(int id)
        {
            var schedule = await _context.MovieSchedules
                .Include(ms => ms.Movie)
                .Include(ms => ms.Theater)
                .FirstOrDefaultAsync(ms => ms.Id == id);
            if (schedule == null)
                return NotFound();
            return schedule;
        }

        [HttpPost]
        public async Task<ActionResult<MovieSchedule>> CreateMovieSchedule(MovieSchedule schedule)
        {
            if (!_context.Movies.Any(m => m.Id == schedule.MovieId) ||
                !_context.Theaters.Any(t => t.Id == schedule.TheaterId))
            {
                return BadRequest("Invalid MovieId or TheaterId.");
            }
            _context.MovieSchedules.Add(schedule);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMovieSchedule), new { id = schedule.Id }, schedule);
        }
    }
}
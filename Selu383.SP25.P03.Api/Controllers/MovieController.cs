using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Movies;

namespace Selu383.SP25.P03.Api.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly DataContext _context;
        public MoviesController(DataContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<List<MovieDto>>> GetMovies()
        {
            var list = await _context.Movies
                .Include(m => m.Showtimes)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    Genre = m.Genre,
                    RuntimeMinutes = m.RuntimeMinutes,
                    ImageUrl = m.ImageUrl,
                    Rating = m.Rating,
                    TrailerUrl = m.TrailerUrl,
                    Showtimes = m.Showtimes
                        .Select(s => new MovieShowtimeDto
                        {
                            Id = s.Id,
                            Showtime = s.Showtime,
                            ScreenId = s.ScreenId
                        })
                        .ToList()
                })
                .ToListAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDto>> GetMovie(int id)
        {
            var dto = await _context.Movies
                .Include(m => m.Showtimes)
                .Where(m => m.Id == id)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    Genre = m.Genre,
                    RuntimeMinutes = m.RuntimeMinutes,
                    ImageUrl = m.ImageUrl,
                    Rating = m.Rating,
                    TrailerUrl = m.TrailerUrl,
                    Showtimes = m.Showtimes
                        .Select(s => new MovieShowtimeDto
                        {
                            Id = s.Id,
                            Showtime = s.Showtime,
                            ScreenId = s.ScreenId
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (dto == null) return NotFound();
            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<MovieDto>> CreateMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            var dto = new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                Genre = movie.Genre,
                RuntimeMinutes = movie.RuntimeMinutes,
                ImageUrl = movie.ImageUrl,
                Rating = movie.Rating,
                TrailerUrl = movie.TrailerUrl,
                Showtimes = movie.Showtimes
                    .Select(s => new MovieShowtimeDto
                    {
                        Id = s.Id,
                        Showtime = s.Showtime,
                        ScreenId = s.ScreenId
                    })
                    .ToList()
            };

            return CreatedAtAction(nameof(GetMovie), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, MovieDto movieDto)
        {
            if (id != movieDto.Id) return BadRequest();
            var movie = await _context.Movies.Include(m => m.Showtimes).FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null) return NotFound();

            movie.Title = movieDto.Title;
            movie.Description = movieDto.Description;
            movie.Genre = movieDto.Genre;
            movie.RuntimeMinutes = movieDto.RuntimeMinutes;
            movie.ImageUrl = movieDto.ImageUrl;
            movie.Rating = movieDto.Rating;
            movie.TrailerUrl = movieDto.TrailerUrl;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return NotFound();
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

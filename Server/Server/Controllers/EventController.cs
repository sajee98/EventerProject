using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/event
        [HttpGet]
        public IActionResult GetEvents()
        {
            var events = _context.Events.ToList();
            return Ok(events);
        }

        // GET: api/event/1
        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var ev = _context.Events.Find(id);

            if (ev == null)
            {
                return NotFound("Event not found");
            }

            return Ok(ev);
        }

        // POST: api/event
        [HttpPost]
        public IActionResult AddEvent(Event ev)
        {
            _context.Events.Add(ev);
            _context.SaveChanges();

            return Ok(ev);
        }

        // PUT: api/event/1
        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, Event updatedEvent)
        {
            var ev = _context.Events.Find(id);

            if (ev == null)
            {
                return NotFound("Event not found");
            }

            ev.Name = updatedEvent.Name;
            ev.Location = updatedEvent.Location;
            ev.Date = updatedEvent.Date;

            _context.SaveChanges();

            return Ok(ev);
        }

        // DELETE: api/event/1
        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var ev = _context.Events.Find(id);

            if (ev == null)
            {
                return NotFound("Event not found");
            }

            _context.Events.Remove(ev);
            _context.SaveChanges();

            return Ok("Event deleted successfully");
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Solita_CityBikes.Data;

namespace Solita_CityBikes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : ControllerBase
    {
        private readonly CityBikeContext _context;

        public TripController(CityBikeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Trip> Get()
        {
            return _context.Trips.ToList();
        }

        [HttpGet("{id}")]
        public Trip Get(int id)
        {
            return _context.Trips.FirstOrDefault(x => x.TripId == id);
        }

        [HttpPost]
        public void Post([FromBody] Trip trip)
        {
            _context.Trips.Add(trip);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Trip trip)
        {
            var existingTrip = _context.Trips.FirstOrDefault(x => x.TripId == id);
            if (existingTrip != null)
            {

                existingTrip.DepartureTime = trip.DepartureTime;
                existingTrip.ReturnTime = trip.ReturnTime;
                existingTrip.DepartureStationId = trip.DepartureStationId;
                existingTrip.ReturnStationId = trip.ReturnStationId;
                existingTrip.Duration = trip.Duration;
                existingTrip.CoveredDistance = trip.CoveredDistance;
                _context.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var existingTrip = _context.Trips.FirstOrDefault(x => x.TripId == id);
            if (existingTrip != null)
            {
                _context.Trips.Remove(existingTrip);
                _context.SaveChanges();
            }
        }
    }
}
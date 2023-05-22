using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("getpaginatedtrips")]
        public async Task<IActionResult> GetPaginatedTrips(int pageNumber = 1, int pageSize = 10)
        {
            async Task<List<Trip>> GetTrips(int pageNumber, int pageSize)
            {
                var trips = await _context.Trips
                    .OrderBy(trip => trip.TripId) 
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return trips;
            }

            var products = await GetTrips(pageNumber, pageSize);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public Trip Get(int id)
        {
            return _context.Trips.FirstOrDefault(x => x.TripId == id);
        }

        [HttpGet("getaveragedistancebystation")]
        public double GetAverageDistanceByStation(int stationId)
        {
            var avg = _context.Trips
            .Where(t => t.DepartureStationId == stationId && t.CoveredDistance != null)
            .Average(c => c.CoveredDistance);
            return avg;
        }

        [HttpGet("getaveragedurationbystation")]
        public double GetAverageDurationByStation(int stationId)
        {
            var avg = _context.Trips
            .Where(t => t.DepartureStationId == stationId && t.Duration != null)
            .Average(c => c.Duration);
            return avg;
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

        public class DepartureStation
        {
            public int StationHslId { get; set; }
            public string? StationName { get; set; }
            public int DepartureCount { get; set; }
        }
    }
}
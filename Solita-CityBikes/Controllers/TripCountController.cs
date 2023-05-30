using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Solita_CityBikes.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Solita_CityBikes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripCountController : ControllerBase
    {
        private readonly CityBikeContext _context;

        public TripCountController(CityBikeContext context)
        {
            _context = context;
        }

        // Returns all TripCounts
        [HttpGet]
        public IEnumerable<TripCount> Get()
        {
            return _context.TripCounts.ToList();
        }

        //Returns all stations with departure and return counts
        [HttpGet("getstationcount")]
        public List<StationCount> GetTripCountsByStations()
        {
                var results = _context.TripCounts
                .GroupBy(tc => tc.DepartureStationId)
                .Select(group => new StationCount
                {
                    stationId = group.Key,
                    DepartureCount = group.Sum(x => x.Count),
                    ReturnCount = _context.TripCounts
                        .Where(tc => tc.ReturnStationId == group.Key)
                        .Sum(x => x.Count)
                })
                .ToList();
                return results;
           
        }


        //Takes departurestation and return station as arguments and returns count between them
        [HttpGet("gettripcount")]
        public int GetTripCount(int dsid, int rsid )
        {
            return _context.TripCounts
                .Where(tc => tc.ReturnStationId == rsid && tc.DepartureStationId == dsid)
                .Select(tc => tc.Count)
                .FirstOrDefault();

        }

        // Returns paginated TripCounts, takes page number and Page lenght as argument
        [HttpGet("getpaginatedtripcounts")]
        public async Task<IActionResult> GetPaginatedTripCounts(int pageNumber = 1, int pageSize = 25)
        {
            async Task<List<TripCount>> GetTripCounts(int pageNumber, int pageSize)
            {
                var TripCounts = await _context.TripCounts
                    .OrderByDescending(tripCount => tripCount.Count)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return TripCounts;
            }

            var products = await GetTripCounts(pageNumber, pageSize);
            return Ok(products);
        }

        // Returns Departures from certain station, takes station Id as argument
        [HttpGet("departures")]
        public async Task<IActionResult> GetDepartures(int dsid)
        {
            async Task<List<TripCount>> GetTripCounts(int dsid)
            {
                var TripCounts = await _context.TripCounts
                    .Where(tc => tc.DepartureStationId==dsid)
                    .OrderByDescending(tripCount => tripCount.Count)
                    .ToListAsync();

                return TripCounts;
            }

            var products = await GetTripCounts(dsid);
            return Ok(products);
        }


        // Returns Count of all returns to certain station with Station Id
        [HttpGet("returns")]
        public async Task<IActionResult> GetReturns(int rsid)
        {
            async Task<List<TripCount>> GetTripCounts(int rsid)
            {
                var TripCounts = await _context.TripCounts
                    .Where(tc => tc.ReturnStationId == rsid)
                    .OrderByDescending(tripCount => tripCount.Count)
                    .ToListAsync();

                return TripCounts;
            }

            var products = await GetTripCounts(rsid);
            return Ok(products);
        }

        public class StationCount
        {
            public int stationId { get; set; }
            public int DepartureCount { get; set; }
            public int ReturnCount { get; set; }
        }
    }
}


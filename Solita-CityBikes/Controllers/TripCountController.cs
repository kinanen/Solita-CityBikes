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

        // 
        [HttpGet]
        public IEnumerable<TripCount> Get()
        {
            return _context.TripCounts.ToList();
        }

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

        // GET api/values/5
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


        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        public class StationCount
        {
            public int stationId { get; set; }
            public int DepartureCount { get; set; }
            public int ReturnCount { get; set; }
        }
    }
}


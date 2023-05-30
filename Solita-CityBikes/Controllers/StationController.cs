using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Solita_CityBikes.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Solita_CityBikes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]

    public class StationController : ControllerBase
    {
        private readonly CityBikeContext _context;

        public StationController(CityBikeContext context)
        {
            _context = context;
        }


        // GET: api/values

        [HttpGet]

        public IEnumerable<Station> Get()
        {
            return _context.Stations.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Station> Get(int id)
        {
            try
            {
                var station = _context.Stations.FirstOrDefault(x => x.HslStationId == id);
                if (station == null)
                {
                    return NotFound(); 
                }

                return station;
            }
            catch
            {
                return StatusCode(500, "An error occurred while retrieving the station.");
            }
        }

        [HttpGet("name{id}")]
        public String GetName(int id)
        {
            try
            {
                return _context.Stations.FirstOrDefault(x => x.HslStationId == id).Nimi;
            }
            catch
            {
                return "Virhe, asemaa ei löydetty";
            }
        }


        /*
         * NOT IN USE
        [HttpGet("AvgPosition")]
        public IActionResult GetAverage()
        {
            try
            {
                double AvgX = _context.Stations.Average(x => x.X);
                double AvgY = _context.Stations.Average(x => x.Y);
                double[] Avg = new double[] { Math.Round(AvgY, 4), Math.Round(AvgX, 4) };
                return Ok(Avg);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        */


    }
}


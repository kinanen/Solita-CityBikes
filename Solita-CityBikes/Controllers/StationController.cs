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
    public Station Get(int id)
    {
        return _context.Stations.FirstOrDefault(x => x.StationId == id);
    }

    [HttpPost]
    public void Post([FromBody] Station station)
    {
        _context.Stations.Add(station);
        _context.SaveChanges();
    }

    [HttpPut("{id}")]
    public void Put(int id, [FromBody] Station station)
    {
        var existingStation = _context.Stations.FirstOrDefault(x => x.StationId == id);
        if (existingStation != null)
        {
            existingStation.Name = station.Name;
            _context.SaveChanges();
        }
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var existingStation = _context.Stations.FirstOrDefault(x => x.StationId == id);
        if (existingStation != null)
        {
            _context.Stations.Remove(existingStation);
            _context.SaveChanges();
        }
    }


    [HttpGet("AvgPosition")]
    public IActionResult GetAverage()
    {
        try
        {
            double AvgX = _context.Stations.Average(x => x.X);
            double AvgY = _context.Stations.Average(x => x.Y);
            double[]  Avg =new double[] { Math.Round(AvgY, 4), Math.Round(AvgX,4) };
            return Ok(Avg);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }


    }
}


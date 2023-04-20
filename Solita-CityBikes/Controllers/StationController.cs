using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Solita_CityBikes.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Solita_CityBikes.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
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
}
}


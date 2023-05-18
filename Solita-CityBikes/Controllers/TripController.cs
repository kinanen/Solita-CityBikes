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
                    .OrderBy(trip => trip.TripId) // Sort by your desired criteria
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

        [HttpGet("TopDepartureStations")]
        public List<DepartureStation> TopDepartureStations()
        {
            List<DepartureStation> topStations = new List<DepartureStation>();

            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(@"
                    SELECT TOP(25) Stations.Nimi, Stations.HslStationId, COUNT(*) AS DepartureCount
                    FROM Trips
                    JOIN Stations ON Trips.DepartureStationId = Stations.HslStationId
                    GROUP BY Stations.Nimi, Stations.HslStationId
                    ORDER BY DepartureCount DESC;
                ", connection);

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string stationName = (string)reader["Nimi"];
                    int stationHslId = (int)reader["HslStationId"];
                    int departureCount = (int)reader["DepartureCount"];


                    topStations.Add(new DepartureStation
                    {
                        StationName = stationName,
                        StationHslId = stationHslId,
                        DepartureCount = departureCount
                    }) ;
                }
            }

            return topStations;
        }

        [HttpGet("TopTrips")]
        public List<TopTrip> TopTrips()
        {
            List<TopTrip> TopTripsList = new List<TopTrip>();

            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(@"
                    SELECT TOP (25) *
                    FROM Trip_Counts
                    ORDER BY num_trips DESC;
                ", connection);

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string DSStationNimi = (string)reader["departure_station_name"];
                    int DSStationHslId = (int)reader["departure_station_id"];
                    string RSStationNimi = (string)reader["return_station_name"];
                    int RSStationId = (int)reader["return_station_id"];
                    int TripCount = (int)reader["num_trips"];


                    TopTripsList.Add(new TopTrip
                    {
                        DepartureStationNimi = DSStationNimi,
                        DepartureStationId = DSStationHslId,
                        ReturnStationId = RSStationId,
                        ReturnStationNimi = RSStationNimi,
                       Count = TripCount

                    }) ;
                }
            }

            return TopTripsList;
        }

        public class DepartureStation
        {
            public int StationHslId { get; set; }
            public string? StationName { get; set; }
            public int DepartureCount { get; set; }
        }

        public class TopTrip
        {
            public int DepartureStationId { get; set; }
            public string? DepartureStationNimi { get; set; } 
            public int ReturnStationId { get; set; }
            public string? ReturnStationNimi { get; set; }
            public int Count { get; set; }

        }

    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json.Linq;
using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Linq;
using Xunit;
using static Solita_CityBikes.Controllers.TripCountController;

namespace Solita_CityBikes.Tests
{
    public class TripCountControllerTests
    {
        private readonly TripCountController _controller;
        private readonly CityBikeContext _context;

        TripCount mockTripCount = new TripCount
        {
            DepartureStationId = 10,
            ReturnStationId = 3,
            Count = 200
        };

        public TripCountControllerTests()
        {
            var data = new List<TripCount>
            {   mockTripCount,
                new TripCount
                {
                    DepartureStationId = 10,
                    ReturnStationId = 2,
                    Count = 300
                },
                new TripCount
                {
                    DepartureStationId = 9,
                    ReturnStationId = 22,
                    Count = 400
                }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<TripCount>>();
            mockSet.As<IQueryable<TripCount>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<TripCount>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<TripCount>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<TripCount>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

            var mockContext = new Mock<CityBikeContext>();
            mockContext.Setup(m => m.TripCounts).Returns(mockSet.Object);

            _context = mockContext.Object;
            _controller = new TripCountController(_context);
        }


        [Fact]
        public void TestGet()
        //get all correct length
        {
            var response = _controller.Get();
            var value = response;
            Assert.Equal(3, value.Count());
        }

        [Fact]
        public void TestGetCountsByStations()
        //get trip counts by stations, correct length
        {
            var response = _controller.GetTripCountsByStations();
            var value = response;
            Assert.Equal(2, value.Count());
        }
        [Fact]
        public void TestGetCountsByStations2()
        //get trip counts by stations, correct length
        {
            var response = _controller.GetTripCountsByStations();
            var value = response;
            Assert.Contains(response, tc => tc.DepartureCount == 500 && tc.stationId == 10);
        }

        [Fact]
        public void TestGetCountsByDSRSStations()
        //get trip counts for trip by two station ids, correct length departure station id as 10, return as 2 should return 300
        {
            var response = _controller.GetTripCount(10, 2);
            var value = response;
            Assert.Equal(300, value);
        }

        [Fact]
        public void TestGetCountsByDSRSStations2()
        //get trip counts for trip by two station ids, correct length departure station id as 2, return as 121 returns 0
        {
            var response = _controller.GetTripCount(2, 121);
            var value = response;
            Assert.Equal(0, value);
        }


        //get returns for one station with data

        // get returns for station no data

        // get departures for stations with data

        //get departures for station with no data

    }


}

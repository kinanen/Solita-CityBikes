using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json.Linq;
using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Linq;

namespace Solita_CityBikes.Tests;

public class TripControllerTests
{
    private readonly TripController _controller;
    private readonly CityBikeContext _context;

    Trip mockTrip = new Trip
    {
        DepartureTime = new DateTime(2023, 1, 1, 12, 0, 0),
        ReturnTime = new DateTime(2023, 1, 1, 12, 0, 0),
        DepartureStationId = 10,
        ReturnStationId = 2,
        CoveredDistance = 1000,
        Duration = 600
    };

    public TripControllerTests()
    {
        var data = new List<Trip>
        {   mockTrip,
            new Trip
            {
                DepartureTime = new DateTime(2023, 1, 1, 10, 0, 0),
                ReturnTime = new DateTime(2023, 1, 1, 11, 0, 0),
                DepartureStationId = 1,
                ReturnStationId = 2,
                CoveredDistance = 200,
                Duration = 60
            },
            new Trip
            {
                DepartureTime = new DateTime(2023, 1, 2, 15, 0, 0),
                ReturnTime = new DateTime(2023, 1, 2, 16, 0, 0),
                DepartureStationId = 10,
                ReturnStationId = 4,
                CoveredDistance = 400,
                Duration = 45
            }
        }.AsQueryable();

        var mockSet = new Mock<DbSet<Trip>>();
        mockSet.As<IQueryable<Trip>>().Setup(m => m.Provider).Returns(data.Provider);
        mockSet.As<IQueryable<Trip>>().Setup(m => m.Expression).Returns(data.Expression);
        mockSet.As<IQueryable<Trip>>().Setup(m => m.ElementType).Returns(data.ElementType);
        mockSet.As<IQueryable<Trip>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

        var mockContext = new Mock<CityBikeContext>();
        mockContext.Setup(m => m.Trips).Returns(mockSet.Object);

        _context = mockContext.Object;
        _controller = new TripController(_context);
    }

    [Fact]
    public void TestGet()
        //get all, correct length
    {
        var response = _controller.Get();
        var value = response;
        Assert.Equal(3, value.Count());
    }

    [Fact]
    public void TestGet1()
        // get all, contains trip
    {
        var response = _controller.Get();
        Assert.NotNull(response);
        Assert.Contains(response, trip => trip.CoveredDistance == 1000 && trip.DepartureTime == new DateTime(2023, 1, 1, 12, 0, 0));
    } 

    [Fact]
    public void GetAvg()
        // several trips from station
    {
        var avg = _controller.GetAverageDistanceByStation(10);
        Assert.Equal(700, avg);
    }


    [Fact]
    public void GetAvg2()
        // no trips from station
    {
        var avg = _controller.GetAverageDistanceByStation(101);
        Assert.Equal(0, avg);
    }

    [Fact]
    public void GetAvgDistancebyDsRS()
    {
        var avg = _controller.GetAverageDistanceByStations(10, 2);
        Assert.Equal(1000, avg);
    }

    [Fact]
    public void GetAvgDistancebyDsRS2()
        // no trips between stations 10, and 3
    {
        var avg = _controller.GetAverageDistanceByStations(10, 3);
        Assert.Equal(0, avg);
    }

    [Fact]
    public void GetAvgDuration()
        // several trips from station
    {
        var avg = _controller.GetAverageDurationByStation(10);
        Assert.Equal(322.5, avg);
    }

    [Fact]
    public void GetAvgDuration2()
        //no trips from station 17
    {
        var avg = _controller.GetAverageDurationByStation(17);
        Assert.Equal(0, avg);
    }

    [Fact]
    public void GetAvgDurationByDsRs()
        //trips from station
    {
        var avg = _controller.GetAverageDurationByStations(10,2);
        Assert.Equal(600, avg);
    }

    [Fact]
    public void GetAvgDurationByDsRs2()
        //no trips between station 10, 32
    {
        var avg = _controller.GetAverageDurationByStations(10, 32);
        Assert.Equal(0, avg);
    }

    [Fact]
    public void GetTripsByMonth()
    //1 trip between station 10, 32 in january 2023
    {
        var count = _controller.GetTripCountPerMonthStation(10, 2, 1, 2023);
        Assert.Equal(1, count);
    }

    [Fact]
    public void GetTripsByMonth2()
    //NO trip between station 10, 32 in january 2023
    {
        var count = _controller.GetTripCountPerMonthStation(13, 2, 1, 2023);
        Assert.Equal(0, count);
    }
}

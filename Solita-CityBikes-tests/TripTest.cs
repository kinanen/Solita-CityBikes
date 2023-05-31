using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Reflection.Metadata;


namespace Solita_CityBikes.Tests;

public class TripTest
{
    public TripTest()
    { 
    }

    [Fact]
    // Valid trip data
    public void ValidateDataPass()
    {
        Trip mockTrip = new Trip
        {
            DepartureTime = new DateTime(2023, 1, 1, 12, 0, 0),
            ReturnTime = new DateTime(2023, 1, 1, 13, 0, 0),
            DepartureStationId = 10,
            ReturnStationId = 2,
            CoveredDistance = 1000,
            Duration = 3600
        };
        Assert.True(mockTrip.ValidateTripData());
    }

    [Fact]
    //Trip duration < 10s 
    public void ValidateDataFailDuration()
    {
        Trip mockTrip = new Trip
        {
            DepartureTime = new DateTime(2023, 1, 1, 12, 0, 0),
            ReturnTime = new DateTime(2023, 1, 1, 12, 0, 9),
            DepartureStationId = 10,
            ReturnStationId = 2,
            CoveredDistance = 1000,
            Duration = 9
        };
        Assert.False(mockTrip.ValidateTripData());
    }

    [Fact]
    // trip departure time after return time
    public void ValidateDataFailTimeStamps()
    {
        Trip mockTrip = new Trip
        {
            DepartureTime = new DateTime(2023, 1, 1, 12, 0, 0),
            ReturnTime = new DateTime(2023, 1, 1, 11, 0, 0),
            DepartureStationId = 10,
            ReturnStationId = 2,
            CoveredDistance = 1000,
            Duration = 600
        };
        Assert.False(mockTrip.ValidateTripData());
    }

    [Fact]
    // Trip CoveredDistance less than 10 meters 
    public void ValidateDataFailDistance()
    {
        Trip mockTrip = new Trip
        {
            DepartureTime = new DateTime(2023, 1, 1, 12, 0, 0),
            ReturnTime = new DateTime(2023, 1, 1, 13, 0, 0),
            DepartureStationId = 10,
            ReturnStationId = 2,
            CoveredDistance = 1,
            Duration = 3600
        };
        Assert.False(mockTrip.ValidateTripData());
    }

}


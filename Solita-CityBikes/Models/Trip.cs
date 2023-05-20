using System;
using CsvHelper.Configuration.Attributes;

namespace Solita_CityBikes;

public class Trip
{

    // Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
    [Ignore]
    public int TripId { get; set; }

    [Index(0)]
    public DateTime DepartureTime { get; set; }

    [Index(1)]
    public DateTime ReturnTime { get; set; }

    [Index(2)]
    public int DepartureStationId { get; set; }

    [Index(4)]
    public int ReturnStationId { get; set; }

    [Index(6)]
    public double CoveredDistance{ get; set; }

    [Index(7)]
    public double Duration { get; set; }

    internal bool ValidateTripData()
    {
        /*The journeys are in the dataset in the next format Departure time, arrival time, departure station id, departure station name, target station id, target station name, length of the trip in meters, Duration (sec.)

    2021-05-01T00:00:11,2021-05-01T00:04:34,138,Arabiankatu,138,Arabiankatu,1057,259

    The datatypes after parsing are: DateTime in ISO format: Departure time, arrival time Integer: departure station id, target station id, Duration (sec.) String: departure station name, target station name

    I would start the testing by creating a simple validation function

    validateJourney(csvLine: string) => boolean

    Then I would make bad scenario tests

    It should reject a journey where departure time is not a parseable DateTime (and the same for an arrival time)
    It should reject a journey where arrival happens before departure
    It should reject if a departure station id is not a positive integer (and the same with arrival and length of the trip)
    It should accept a valid trip
    It should reject a trip that is less than 10 seconds (this came from the pre-assignment)

    The same approach could be used for the station data where the addition coordinates should be validated to be valid geographic coordinates.
        */
        if (this.CoveredDistance < 10) return false;
        if (this.Duration < 10) return false;
        return true;

    }
}



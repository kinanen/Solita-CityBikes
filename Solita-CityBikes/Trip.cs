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

}



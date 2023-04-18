using System;
using CsvHelper.Configuration.Attributes;

namespace Solita_CityBikes;

public class Trip
{

    // Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
    [Index(0)]
    public int DepartureTime { get; set; }

    [Index(1)]
    public int ReturnTime { get; set; }

    [Index(2)]
    public int DepartureStationId { get; set; }

    [Index(4)]
    public int ReturnStationId { get; set; }

    [Index(6)]
    public int CoveredDistance{ get; set; }

    [Index(7)]
    public int Duration { get; set; }

}



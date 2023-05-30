const initialStations = [
        /*Station data structure in C# model station

        [Index(1)]
        public int HslStationId { get; set; }
        [Ignore]
        public int StationId { get; set; }
        [Index(2)]
        public string Nimi { get; set; }
        [Index(3)]
        public string Namn { get; set; }
        [Index(4)]
        public string Name { get; set; }
        [Index(5)]
        public string Osoite { get; set; }
        [Index(11)]
        public double X { get; set; }
        [Index(12)]
        public double Y { get; set; }*/
    {
        hslStationId:1,
        nimi:"asema1",
        namn:"asema1",
        name:"asema1",
        osoite:"asema1osoite",
        x:"25.100",
        y:"60.100"
    },
    {
        hslStationId:2,
        nimi:"asema2",
        namn:"asema2",
        name:"asema2",
        osoite:"asema2osoite",
        x:"25.200",
        y:"60.200"
    },
    {
        hslStationId:1,
        nimi:"asema3",
        namn:"asema3",
        name:"asema3",
        osoite:"asema3osoite",
        x:"25.300",
        y:"60.300"
    },
]
const initialTrips=[
    /*    [Ignore]
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
    public double Duration { get; set; }*/
    {
        tripId:10,
        departureTime:"2021-06-17T18.40.00.0000000",
        returnTime:"2021-06-17T19.00.00.0000000",
        departureStationId:1,
        returnStationId: 2,
        coveredDistance:1000,
        duration: 200
    },
    {
        tripId:11,
        departureTime:"2021-06-17T18.40.00.0000000",
        returnTime:"2021-06-17T19.00.00.0000000",
        departureStationId:2,
        returnStationId: 3,
        coveredDistance:1000,
        duration: 200
    },
    {
        tripId:12,
        departureTime:"2021-06-17T18.40.00.0000000",
        returnTime:"2021-06-17T19.00.00.0000000",
        departureStationId:3,
        returnStationId: 1,
        coveredDistance:1500,
        duration: 1000
    }
] 
const initialTripCouts = [
    //  public int DepartureStationId { get; set; }
    //  public int ReturnStationId { get; set; }
    //  public int Count { get; set; }
    {
        departureStationId : 1,
        returnStationId : 2,
        count :7
    },
    {
        departureStationId : 3,
        returnStationId : 2,
        count :12
    },
    {
        departureStationId : 3,
        returnStationId : 1,
        count :12
    }



]
export default {
    initialStations,
    initialTrips
}
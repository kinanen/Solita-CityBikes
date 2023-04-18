using CsvHelper.Configuration.Attributes;

namespace Solita_CityBikes;

public class Station
{
    [Index(1)]
    public int StationIdForJoining { get; set; }

    //FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
    [Ignore]
    public int StationId { get; set; }
    
    [Index(2)]
    public string Nimi { get; set; }
    [Index(3)]
    public string Namn { get; set; }
    [Index(4)]
    public string Name { get; set; }
    [Index(11)]
    public double X { get; set; }
    [Index(12)]
    public double Y { get; set; }

}
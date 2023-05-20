using System.Linq.Expressions;
using CsvHelper.Configuration.Attributes;

namespace Solita_CityBikes;

public class Station
{
    //FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

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
    public double Y { get; set; }

    internal bool ValidateStationData()
    {
        bool valid = true;
        return valid;
    }
}
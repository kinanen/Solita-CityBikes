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
    public string? Nimi { get; set; }
    [Index(3)]
    public string? Namn { get; set; }
    [Index(4)]
    public string? Name { get; set; }
    [Index(5)]
    public string? Osoite { get; set; }
    [Index(11)]
    public double X { get; set; }
    [Index(12)]
    public double Y { get; set; }

    public bool ValidateStationData()
    {
        if (this.X > 25.500 || this.X < 24.000) return false;
        if (this.Y < 59.000 || this.Y > 60.500) return false;
        if (Nimi==null || Nimi.Length < 1) return false;
        if (Osoite == null || Osoite.Length < 1) return false;
        return true;
    }
}
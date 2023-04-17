using System.IO;

namespace Solita_CityBikes;
public class MapPosition
{
public static void ReadData()
{
        using(var reader = new StreamReader(@"../../data/Helsingin_ja_Espoon_kaupunkipyoraasemat_avoin.csv"))
        {
            while (!reader.EndOfStream)
            {
                var line = reader.ReadLine();
                if(line!=null){
                    var values = line.Split(',');
                    if(int.TryParse(values[0], out int value))
                    Solita_CityBikes.StationReader.ReadStation(values);
                }
            }
        }
    }
}
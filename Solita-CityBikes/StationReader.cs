using System.Globalization;
using System.IO;

namespace Solita_CityBikes;
public class StationReader
{
public static void ReadStation(string[] line){
    Station s = new Station();
    s.x = Double.Parse(line[11],  CultureInfo.InvariantCulture);
    s.y = Double.Parse(line[12],  CultureInfo.InvariantCulture);

    }
}

using System;
using CsvHelper;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace Solita_CityBikes.Data
{
	public class DbInitializer
	{
		public static void Initialize(IServiceProvider serviceProvider)
		{
			using (var context = new StationContext(serviceProvider.GetRequiredService<DbContextOptions<StationContext>>()))
				{

				context.Database.EnsureCreated();
                if (context.Stations.Any())
				{
					return;
				}

                // Todo: lataa csvt tietokantaan CSV Helper
				// Lataa asemat tiedoston tiedot CSV tiedostosta ja lisää asemat Station luokan olioksi. 
                using (var reader = new StreamReader("/Users/otsokinanen/Desktop/asemat.csv"))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture)) // 
                {
                    var records = csv.GetRecords<Station>();
					foreach (var record in records) {
						context.Add(new Station { Name = record.Name, Namn = record.Namn, Nimi = record.Nimi, StationIdForJoining = record.StationIdForJoining, X = record.X, Y = record.Y});
					}
					
					//context.AddRange(records);
					context.SaveChanges();

                }

            }

		}
	}
}


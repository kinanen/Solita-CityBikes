using System;
using CsvHelper;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using CsvHelper.Configuration;

namespace Solita_CityBikes.Data
{
    public class DbInitializer
    {
        public static void InitializeStations(IServiceProvider serviceProvider)
        {
            using (var context = new CityBikeContext(serviceProvider.GetRequiredService<DbContextOptions<CityBikeContext>>()))
            {
                context.Database.EnsureCreated();

                if (context.Stations.Any())
                {
                    return;
                }

                // Lataa asemat tiedoston tiedot CSV tiedostosta ja lisää asemat Station luokan olioksi.
                using var reader = new StreamReader("/Users/otsokinanen/Desktop/data/asemat.csv");
                using var csv = new CsvReader(reader, CultureInfo.InvariantCulture); 
                var records = csv.GetRecords<Station>();
                foreach (var record in records)
                {

                    if (record.ValidateStationData())
                    {
                        context.Add(new Station { Name = record.Name, Namn = record.Namn, Nimi = record.Nimi, Osoite = record.Osoite, HslStationId = record.HslStationId, X = record.X, Y = record.Y });
                    }
                }

                context.SaveChanges();

            }
        }

        public static void InitializeTrips(IServiceProvider serviceProvider)
        {

            using (var context = new CityBikeContext(serviceProvider.GetRequiredService<DbContextOptions<CityBikeContext>>()))
            {

                context.Database.EnsureCreated();
                if (context.Trips.Any())
                {
                    return;
                }

                ReadTripsFromFile(context, "/Users/otsokinanen/Desktop/data/2021-testi.csv");
                //ReadTripsFromFile(context, "/Users/otsokinanen/Desktop/data/2021-05.csv");
                //ReadTripsFromFile(context, "/Users/otsokinanen/Desktop/data/2021-06.csv");
                //ReadTripsFromFile(context, "/Users/otsokinanen/Desktop/data/2021-07.csv");
            }

        }

        static void ReadTripsFromFile(CityBikeContext context, String fileName)
        {
            using (var reader = new StreamReader(fileName))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                int i = 0;
                var records = csv.GetRecords<Trip>();
                foreach (var record in records)
                {
                    if (record.ValidateTripData())
                    {
                        context.Add(new Trip { DepartureTime = record.DepartureTime, DepartureStationId = record.DepartureStationId, ReturnTime = record.ReturnTime, ReturnStationId = record.ReturnStationId, CoveredDistance = record.CoveredDistance, Duration = record.Duration });
                        i++;
                    }
                    if (i % 100 == 0)
                    {
                        context.SaveChanges();
                        context.RemoveRange();
                    }
                }
                context.SaveChanges();
            }
        }

        public static void InitializeTripCounts(IServiceProvider serviceProvider)
        {
            using (var context = new CityBikeContext(serviceProvider.GetRequiredService<DbContextOptions<CityBikeContext>>()))
            {

                context.Database.EnsureCreated();
                if (context.TripCounts.Any())
                {
                    return;
                }

                var tripCounts = context.Trips
                .GroupBy(t => new { t.DepartureStationId, t.ReturnStationId })
                .Select(g => new TripCount
                {
                    DepartureStationId = g.Key.DepartureStationId,
                    ReturnStationId = g.Key.ReturnStationId,
                    Count = g.Count()
                })
                .ToList();
                
                context.TripCounts.AddRange(tripCounts);
                context.SaveChanges();

            }

        }

    }
}




using System;
using Microsoft.EntityFrameworkCore;

namespace Solita_CityBikes.Data
{
    public class TripContext : DbContext
    {
        public TripContext(DbContextOptions<StationContext> options) : base(options)
        {
        }

        public DbSet<Station> Stations { get; set; }


    }
}

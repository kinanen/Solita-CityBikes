using System;
using Microsoft.EntityFrameworkCore;

namespace Solita_CityBikes.Data
{
    public class CityBikeContext : DbContext
    {
        public CityBikeContext(DbContextOptions<CityBikeContext> options) : base(options)
        {
        }

        public DbSet<Station> Stations { get; set; }

        public DbSet<Trip> Trips { get; set; }

    }
}

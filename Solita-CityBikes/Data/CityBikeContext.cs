using System;
using Microsoft.EntityFrameworkCore;

namespace Solita_CityBikes.Data
{
    public class CityBikeContext : DbContext
    {
        public CityBikeContext(DbContextOptions<CityBikeContext> options) : base(options)
        {
        }

        public CityBikeContext() : base() { }

        public virtual DbSet<Station> Stations { get; set; }

        public virtual DbSet<Trip> Trips { get; set; }


    }
}

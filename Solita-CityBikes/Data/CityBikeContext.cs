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

        public virtual DbSet<TripCount> TripCounts{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the TripCount entity
            modelBuilder.Entity<TripCount>()
                .HasKey(tc => new { tc.DepartureStationId, tc.ReturnStationId });

            modelBuilder.Entity<TripCount>()
                .Property(tc => tc.Count)
                .IsRequired();
        }
    }
}

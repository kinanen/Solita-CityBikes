using System;
using Microsoft.EntityFrameworkCore;

namespace Solita_CityBikes.Data
{
	public class StationContext :  DbContext
	{
		public StationContext(DbContextOptions<StationContext> options) : base(options)
		{
		}

		public DbSet<Station> Stations { get; set; }

		
	}
}


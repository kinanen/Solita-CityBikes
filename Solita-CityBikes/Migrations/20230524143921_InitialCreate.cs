using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolitaCityBikes.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    StationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HslStationId = table.Column<int>(type: "int", nullable: false),
                    Nimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Namn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Osoite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    X = table.Column<double>(type: "float", nullable: false),
                    Y = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.StationId);
                });

            migrationBuilder.CreateTable(
                name: "TripCounts",
                columns: table => new
                {
                    DepartureStationId = table.Column<int>(type: "int", nullable: false),
                    ReturnStationId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripCounts", x => new { x.DepartureStationId, x.ReturnStationId });
                });

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    TripId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartureTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DepartureStationId = table.Column<int>(type: "int", nullable: false),
                    ReturnStationId = table.Column<int>(type: "int", nullable: false),
                    CoveredDistance = table.Column<double>(type: "float", nullable: false),
                    Duration = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.TripId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "TripCounts");

            migrationBuilder.DropTable(
                name: "Trips");
        }
    }
}

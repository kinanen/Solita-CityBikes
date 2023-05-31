using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Reflection.Metadata;

namespace Solita_CityBikes.Tests;

public class StationTest
{
    public StationTest()
    {
    }

    [Fact]
    public void ValidateDataPass()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "asema0osoite",
            X = 25.000,
            Y = 60.000
        };
        Assert.True(mockStation.ValidateStationData());
    }

    [Fact]
    public void ValidateDataFailNimi()
    {
        Station mockStation= new Station
        {
            HslStationId = 10,
            Nimi = "",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "asema0osoite",
            X = 25.000,
            Y = 60.000
        };
        Assert.False(mockStation.ValidateStationData());
    }

    [Fact]
    public void ValidateDataFailNimiNull()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Namn = "asema0",
            Name = "asema0",
            Osoite = "asema0osoite",
            X = 25.000,
            Y = 60.000
        };
        Assert.False(mockStation.ValidateStationData());
    }

    [Fact]
    public void ValidateDataFailOsoite()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "",
            X = 25.000,
            Y = 60.000
        };
        Assert.False(mockStation.ValidateStationData());
    }


    [Fact]
    public void ValidateDataFailOsoiteNull()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            X = 25.000,
            Y = 60.000
        };
        Assert.False(mockStation.ValidateStationData());
    }


    [Fact]
    public void ValidateDataFailX()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "Osoite0",
            Y = 60.000
        };
        Assert.False(mockStation.ValidateStationData());
    }

    [Fact]
    public void ValidateDataFailYNull()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "Osoite0",
            X = 25.000
        };
        Assert.False(mockStation.ValidateStationData());
    }

    [Fact]
    public void ValidateDataFailYOutOfBounds()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "Osoite0",
            X = 25.000,
            Y= 25.000
        };
        Assert.False(mockStation.ValidateStationData());
    }

    [Fact]
    public void ValidateDataFailXOutOfBounds()
    {
        Station mockStation = new Station
        {
            HslStationId = 10,
            Nimi = "asema0",
            Namn = "asema0",
            Name = "asema0",
            Osoite = "Osoite0",
            X = 60.000,
            Y = 60.000
        };
        Assert.False(mockStation.ValidateStationData());
    }
    /*
    internal bool ValidateStationData()
    {
        if (this.X > 25.500 || this.X < 24.000) return false;
        if (this.Y > 59.000 || this.Y < 60.500) return false;
        if (Nimi == null) return false;
        if (Osoite == null || Osoite.Length < 1) return false;
        return true;
    }
    */

}




using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Reflection.Metadata; 

namespace Solita_CityBikes_;

public class StationControllerTest
{
    private StationController _controller;

    public StationControllerTest()
    {
        var data = new List<Station>
         {
         new Station

             {
                HslStationId=1,
                Nimi= "asema1",
                Namn= "asema1",
                Name= "asema1",
                Osoite= "asema1osoite",
                X= 25.100,
                Y= 60.100
            },
         new Station 
            {
                HslStationId=2,
                Nimi="asema2",
                Namn="asema2",
                Name="asema2",
                Osoite="asema2osoite",
                X=25.200,
                Y=60.200
            },
         new Station
            {
                HslStationId=1,
                Nimi="asema3",
                Namn="asema3",
                Name="asema3",
                Osoite="asema3osoite",
                X=25.300,
                Y=60.300
            },
         }.AsQueryable();

        var mockSet = new Mock<DbSet<Station>>();
        mockSet.As<IQueryable<Station>>().Setup(m => m.Provider).Returns(data.Provider);
        mockSet.As<IQueryable<Station>>().Setup(m => m.Expression).Returns(data.Expression);
        mockSet.As<IQueryable<Station>>().Setup(m => m.ElementType).Returns(data.ElementType);
        mockSet.As<IQueryable<Station>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

        var mockContext = new Mock<CityBikeContext>();
        mockContext.Setup(m => m.Stations).Returns(mockSet.Object);

        _controller = new StationController(mockContext.Object);
    }

    [Fact]
    public void TestGetName1()
    { 
        var response = _controller.GetName(2) as String;
        var value = response;
        Assert.NotNull(value);
        Assert.Equal("asema2", value);
    }

    [Fact]
    public void TestGetName2()
    {
        var response = _controller.GetName(2) as String;
        var value = response;
        Assert.NotNull(value);
        Assert.NotEqual("station1", value);
    }

    [Fact]
    public void TestGetName3()
    {
        var response = _controller.GetName(4) as String;
        var value = response;
        Assert.NotNull(value);
        Assert.Equal("Virhe, asemaa ei löydetty", value);
    }

}




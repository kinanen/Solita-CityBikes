using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Reflection.Metadata; 

namespace Solita_CityBikes_;

public class UnitTest1
{
    private StationController _controller;

    public UnitTest1()
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
    public void Test1()
    {

        var response = _controller.GetAverage() as OkObjectResult;

        var value = response.Value as double[];

        Assert.NotNull(value);

        Assert.Equal(value, new Double[] { 0.2, 0.2 });

    }

    [Fact]
    public void Test2()
    {
        var response = _controller.GetAverage() as OkObjectResult;
        var value = response.Value as double[];
        Assert.NotNull(value);
        Assert.NotEqual(value, new Double[] { 0.3, 0.2 });
    }

}




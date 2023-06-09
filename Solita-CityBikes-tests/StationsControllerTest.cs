﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Solita_CityBikes;
using Solita_CityBikes.Controllers;
using Solita_CityBikes.Data;
using System.Reflection.Metadata;


namespace Solita_CityBikes.Tests;

public class StationControllerTest
{
    private StationController _controller;

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
    public StationControllerTest()
    {


        var data = new List<Station>
         {mockStation,
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
    public void TestGet1()
        // get all stations testing if countains mock station
    {
        var response = _controller.Get();
        var value = response;
        Assert.NotNull(value);
        Assert.Contains(mockStation, value);
    }

    [Fact]
    public void TestGet2()
        // get all stations testing that count is correct
    {
        var response = _controller.Get();
        var value = response;
        Assert.NotNull(value);
        Assert.Equal(4, value.Count());
    }

    [Fact]
    public void TestGetById1()
        // Get station returns correct station with id
    {
        int id = 10;
        var response = _controller.Get(id);
        var value = response.Value;
        Assert.NotNull(value);
        Assert.Equal(mockStation,value);
    }

    [Fact]
    public void TestGetById2()
        // returns 404 status if trying to get non existing station
    {
        int id = 00;
        var response = _controller.Get(id);
        var statusCode = (response.Result as StatusCodeResult)?.StatusCode;

        Assert.Null(response.Value); 
        Assert.Equal(404, statusCode); 
    }


    [Fact]
    public void TestGetName1()
        // returns name of station by id
    { 
        var response = _controller.GetName(2) as String;
        var value = response;
        Assert.NotNull(value);
        Assert.Equal("asema2", value);
    }


    [Fact]
    public void TestGetName3()
        // returnin error message if station not found
    {
        var response = _controller.GetName(4) as String;
        var value = response;
        Assert.NotNull(value);
        Assert.Equal("Virhe, asemaa ei löydetty", value);
    }


}




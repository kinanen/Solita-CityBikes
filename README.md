# Solita-CityBikes
This is Helsinki citybikes application made by Otso Kinanen as assignment to Solita Dev Academy. 
In the application you can examine Helsinki Citybike data form summer 2021, view stations and trip details. 
Application is Up and running at : www.example.com


## About My App

In my app you can view station information about all Citybikes stations for bike season 2021. 

The station info available in the app: 
  - Station location in the map
  - Station basic information
  - Top trips form an to the station
  - Average Trip info about station
  - Map and List view for ALL STATIONS and TOP STATIONS
  - View table of all Stations and station info, in sortable and filterable table with search function

The trip info available in the app 
  - Trip polyline in the map between stations
  - Trip count between stations in the data perioid
  - View Top 25 most common trips on the map. 
  - View table of all trips with basic info in sortable and filterable table with search function
  
## Technologies used in project

Application is done with Microsoft SQL server, C# backend and React frontend. 
Application is running in Docker Container in Azure Cloud. 

Tests in C# backend are done with .... 
Tests for React frontend and applications data API are done using JEST 

## Data used in the project

Data used in the project is offered by City Bike Finland and Helsinki Region Transport. Data is available in the links below. 

The journey data owned by City Bike Finland : 
    https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
    https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
    https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
    
The station data by Helsinki Region Transport’s (HSL): 
    Dataset: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
    License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

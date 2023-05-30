# Solita-CityBikes
This is Helsinki citybikes application made by Otso Kinanen as assignment to Solita Dev Academy. 
In the application you can examine Helsinki Citybike data form summer 2021, view stations and trip details. 
Application is Up and running at : https://otso-citybike.azurewebsites.net/


## About My App

In my app you can view station information about all Citybikes stations for bike season 2021. 

The station info available in the app: 
  - Station location in the map
  - Station basic information
  - Top trips form and to the station
  - Average Trip info about station
  - Map and List view for ALL STATIONS and TOP STATIONS
  - All stations view offers a search by station name feature, and is implemented with React Table, List is paginated.
  - Top stations view is sortable by returns or by departures, and shows current page's stations on map, list is implemented with React Table, List is paginated.

The trip info available in the app 
  - Trip polyline in the map between stations
  - Trip count between stations in the data perioid, and by month
  - Single trips info shows total trips, monthly trips, average trip duration and average distance between two stations.
  - View Top 25 trips on the map. 
  - Top trips and All trips list views are paginated. Pagination is implemented by sql and ef core

  
## Technologies used in project

Application is done with Microsoft SQL server, C# backend and React frontend. 
Application is running at Azure Web App service.

Tests in C# backend are done with .... 
Tests for React frontend and applications data API are done using JEST 

## Data used in the project

Data used in the project is offered by City Bike Finland and Helsinki Region Transport. Data is available in the links below. 

The journey data owned by City Bike Finland : 
    - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv

    - https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
    
    - https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
    
The station data by Helsinki Region Transport’s (HSL): 
    Dataset: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
    License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902
    
## Process and Room for improvment
The project has been done as a part of application process to Solita Dev Academy, some used tech and libraries used in the project hase been new to me so there has been some ups and downs, and much of learning thruout the process. 
 
 Things I would do otherwise or pay more attention next time: 
  - Spaghetti code in the "Home" component of React app
  - More unified way of working in all components in React app
  - Setting all similar components in same way, for clearer code
  - Using Varibles file in react app rather than passing some props to several components
  - Refiguring Stations, Trips, and TripCounts API modules
  - 

 Left for next time:
  - Finishing Post and Put API's and data validator for the input form for both station and trip
  - E2E tests
  - Simpler and more reliable data read-in
  - revisiting sql table needs and application data usage
  
 Things I am proud of: 
  - Clear map view
  - Simple and well structured code in backend
  - SQL database works as intended + usage of ef core, which was new for me
  - Quick and reasonably easy process of moving app to run on Azure 
  - Clear data views and selection of representable data

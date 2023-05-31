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

App uses data from SQL server database
  
## Technologies used in project

Application is done with Microsoft SQL server, C# backend and React frontend. 
Application is running at Azure Web App service.

Tests in C# backend are done with XUnit, Backend test run when pushing to git hub and building app to Azure
Tests for React frontend and applications data API are done using JEST 


## Data used in the project

Data used in the project is offered by City Bike Finland and Helsinki Region Transport. Data is available in the links below. 

The journey data owned by City Bike Finland : 
   - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
   - https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
   - https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
    
The station data by Helsinki Region Transport’s (HSL): 
    Dataset: 
    https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
    License and information:
    https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902
    
To get data up to database some adjustments have been done locally to .csv files brefore running initializing trips.
  - Commas removed from station names
  - Duplicates removed from the files 
  - Empty values in Distace or Duration field replaced with 0 values

## Process and Room for improvment
The project has been done as a part of application process to Solita Dev Academy, some used tech and libraries used in the project hase been new to me so there has been some ups and downs, and much of learning thruout the process. 
 
 Things I would do otherwise or pay more attention next time: 
  - Spaghetti code in the "Home" component of React app
  - More unified way of working in all components in React app
  - Setting all similar components in same way, for clearer code
  - Using Varibles file in react app rather than passing some props to several components
  - Refiguring Stations, Trips, and TripCounts API modules

 Left for next time:
  - Finishing Post and Put API's and data validator for the input form for both station and trip
  - E2E tests
  - revisiting sql table needs and application data usage, providing faster responses for some functions
  - Finalizing frontends design
  
 Things I am proud of: 
  - Clear map view
  - Simple and well structured code in backend
  - SQL database works as intended + usage of ef core
  - Quick and reasonably easy process of moving app to run on Azure 
  - Clear data views and selection of representable data


## Instructions to run project on your local environment
Clone the Repository: Begin by cloning the repository from GitHub, just as you would for any other repository. Use the git clone command followed by the repository URL to clone it to your local machine.

    git clone git@github.com:kinanen/Solita-CityBikes.git

Install Dependencies: Navigate to the project directory using your terminal or command prompt:

C# React apps often use the .NET Core framework and rely on package managers like npm or Yarn for managing front-end dependencies. Use the appropriate command to install the necessary dependencies. Typically, this can be done using the following command:

    dotnet restore

Additionally, if the project has a package.json file, you'll need to install the front-end dependencies using npm or Yarn. Navigate to the ClientApp folder (or the folder where the React code is located) and run:

    npm install

or

    yarn

Configure Environment Variables: If your C# React app requires any environment variables, ensure they are properly configured. Look for any instructions or configuration files (e.g., .env or .env.local) that specify the required variables and their values. Adjust them according to your local environment if necessary.

For the database you will need username and password to insert into appsettings.Development.json and to appsettings.json. Username and password stored in this repo are not active. You can request credentials from me by mail: 
otso.kinanen(at)gmail.com

Start the Development Server: Once the dependencies are installed and environment variables are configured, you can start the development server. Use the following command:

    dotnet run

This command will build and run the C# server, which will also serve the React front-end. It should launch the app in your browser https://localhost:7199/api 


Thank you for reading! If you have questions or anything comes to mind don't hesitate to askby mail: otso.kinanen(at)gmail.com

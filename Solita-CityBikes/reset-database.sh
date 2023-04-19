echo Deleting the database... 

dotnet ef database drop 

echo Deleting existing migrations... 

dotnet ef migrations remove 

echo Creating a new migration... 

dotnet ef migrations add InitialCreate 

echo Updating the database... 

dotnet ef database update

echo Done!

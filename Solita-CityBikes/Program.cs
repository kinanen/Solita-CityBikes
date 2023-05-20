using Microsoft.EntityFrameworkCore;
using Solita_CityBikes;
using Solita_CityBikes.Data;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:7199",
                                              "http://localhost:5078",
                                              "https://localhost:44470")
                                              .AllowAnyHeader()
                                              .AllowAnyMethod();

                      });
});


// Add services to the container.
//Luodaan tietokantaan yhteys
builder.Services.AddDbContext<CityBikeContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultContext")));

builder.Services.AddControllersWithViews();



var app = builder.Build();


// Luo tietokannan ja lukee tarvittessa datan sisään
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    DbInitializer.InitializeStations(services);
    DbInitializer.InitializeTrips(services);
    DbInitializer.InitializeTripCounts(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();



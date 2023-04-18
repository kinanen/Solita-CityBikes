using Microsoft.EntityFrameworkCore;
using Solita_CityBikes.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Luodaan tietokantaan yhteys
builder.Services.AddDbContext<StationContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaulContext")));
builder.Services.AddControllersWithViews();

var app = builder.Build();


// Luo tietokannan ja lukee tarvittessa datan sisään
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    DbInitializer.Initialize(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();


using MongoDB.Driver;
using MicroApi.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Allow CORS for Angular (important for Codespaces!)
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Connect to MongoDB
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("MicroDb");
SeedData.Initialize(database); // Data seed

var boardsCol = database.GetCollection<Board>("Boards");
var mcsCol = database.GetCollection<Microcontroller>("Microcontrollers");

var app = builder.Build();
app.UseCors();

// BOARDS API ENDPOINTS
app.MapGet("/api/boards", async () => await boardsCol.Find(_ => true).ToListAsync());

app.MapGet("/api/boards/{id:int}", async (int id) => 
    await boardsCol.Find(x => x.Id == id).FirstOrDefaultAsync());

app.MapGet("/api/boards/search", async (string q) => {
    var regex = new MongoDB.Bson.BsonRegularExpression(q, "i"); 

    var filter = Builders<Board>.Filter.Or(
        Builders<Board>.Filter.Regex(x => x.Name, regex),
        Builders<Board>.Filter.Regex(x => x.Manufacturer, regex)
    );

    return await boardsCol.Find(filter).ToListAsync();
});

app.MapPost("/api/boards", async (Board b) => {
    await boardsCol.InsertOneAsync(b);
    return Results.Created($"/api/boards/{b.Id}", b);
});

app.MapPut("/api/boards/{id:int}", async (int id, Board b) => {
    await boardsCol.ReplaceOneAsync(x => x.Id == id, b);
    return Results.NoContent();
});

app.MapDelete("/api/boards/{id:int}", async (int id) => {
    await boardsCol.DeleteOneAsync(x => x.Id == id);
    return Results.NoContent();
});

// MICROCONTROLLERS API ENDPOINTS
app.MapGet("/api/mcu", async () => 
    await mcsCol.Find(_ => true).ToListAsync());

app.MapGet("/api/mcu/{id:int}", async (int id) => 
    await mcsCol.Find(x => x.Id == id).FirstOrDefaultAsync());

app.MapGet("/api/mcu/search", async (string q) => {
    var regex = new MongoDB.Bson.BsonRegularExpression(q, "i"); 

    var filter = Builders<Microcontroller>.Filter.Or(
        Builders<Microcontroller>.Filter.Regex(x => x.Name, regex),
        Builders<Microcontroller>.Filter.Regex(x => x.Manufacturer, regex),
        Builders<Microcontroller>.Filter.Regex(x => x.Architecture, regex)
    );

    return await mcsCol.Find(filter).ToListAsync();
});

app.MapPost("/api/mcu", async (Microcontroller m) => {
    await mcsCol.InsertOneAsync(m);
    return Results.Created($"/api/mcu/{m.Id}", m);
});

app.MapPut("/api/mcu/{id:int}", async (int id, Microcontroller m) => {
    await mcsCol.ReplaceOneAsync(x => x.Id == id, m);
    return Results.NoContent();
});

app.MapDelete("/api/mcu/{id:int}", async (int id) => {
    await mcsCol.DeleteOneAsync(x => x.Id == id);
    return Results.NoContent();
});

app.Run();
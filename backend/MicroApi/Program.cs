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

// API ENDPOINTS
app.MapGet("/api/boards", async () => await boardsCol.Find(_ => true).ToListAsync());

app.MapGet("/api/boards/{id:int}", async (int id) => 
    await boardsCol.Find(x => x.Id == id).FirstOrDefaultAsync());

app.MapGet("/api/microcontrollers/{id:int}", async (int id) => 
    await mcsCol.Find(x => x.Id == id).FirstOrDefaultAsync());

app.MapGet("/api/boards/search", async (string q) => 
    await boardsCol.Find(x => x.Name.ToLower().Contains(q.ToLower())).ToListAsync());

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

app.Run();
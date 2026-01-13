using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MicroApi.Models;

public class Microcontroller
{
    [BsonId]
    public int Id { get; set; }
    
    [BsonElement("name")]
    public string Name { get; set; } = null!;
    
    [BsonElement("manufacturer")]
    public string Manufacturer { get; set; } = null!;
    
    [BsonElement("architecture")]
    public string Architecture { get; set; } = null!;

    [BsonElement("cores")]
    public int Cores { get; set; }

    [BsonElement("clock_speed_mhz")]
    public int ClockSpeedMhz { get; set; }
    
    [BsonElement("ram_kb")]
    public int RamKb { get; set; }
}
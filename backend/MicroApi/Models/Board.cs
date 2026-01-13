using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MicroApi.Models;

public class Board
{
    [BsonId]
    public int Id { get; set; }
    
    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("manufacturer")]
    public string Manufacturer { get; set; } = null!;
    
    [BsonElement("microcontroller_id")]
    public int MicrocontrollerId { get; set; }
    
    [BsonElement("flash_kb")]
    public int FlashKb { get; set; }
}
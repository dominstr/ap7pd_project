using MongoDB.Driver;
using MicroApi.Models;

public static class SeedData
{
    public static void Initialize(IMongoDatabase db)
    {
        var microcontrollersCol = db.GetCollection<Microcontroller>("Microcontrollers");
        var boardsCol = db.GetCollection<Board>("Boards");

        if (microcontrollersCol.AsQueryable().Any()) return;

        var mcs = new List<Microcontroller>
        {
            new() { Id = 1, Name = "RP2040", Manufacturer = "Raspberry Pi", Architecture = "ARM Cortex-M0+", Cores = 2, ClockSpeedMhz = 133, RamKb = 264 },
            new() { Id = 2, Name = "RP2350", Manufacturer = "Raspberry Pi", Architecture = "ARM Cortex-M33", Cores = 2, ClockSpeedMhz = 150, RamKb = 520  },
            new() { Id = 3, Name = "ATmega328P", Manufacturer = "Microchip", Architecture = "AVR", Cores = 1, ClockSpeedMhz = 16, RamKb = 2  },
            new() { Id = 4, Name = "LX6", Manufacturer = "Tensilica", Architecture = "Xtensa", Cores = 2, ClockSpeedMhz = 240, RamKb = 520  },
            new() { Id = 5, Name = "STM32F446RE", Manufacturer = "STMicroelectronics", Architecture = "ARM Cortex-M4F", Cores = 1, ClockSpeedMhz = 180, RamKb = 128  }
        };
        microcontrollersCol.InsertMany(mcs);

        var boards = new List<Board>
        {
            new() { Id = 1, Name = "Raspberry Pi Pico", Manufacturer = "Raspberry Pi", MicrocontrollerId = 1, FlashKb = 2048 },
            new() { Id = 2, Name = "Raspberry Pi Pico 2", Manufacturer = "Raspberry Pi", MicrocontrollerId = 2, FlashKb = 4096 },
            new() { Id = 3, Name = "Arduino Uno", Manufacturer = "Arduino", MicrocontrollerId = 3, FlashKb = 32 },
            new() { Id = 4, Name = "ESP32", Manufacturer = "Espressif Systems", MicrocontrollerId = 4, FlashKb = 4096 },
            new() { Id = 5, Name = "STM32 Nucleo-F446RE", Manufacturer = "STMicroelectronics", MicrocontrollerId = 5, FlashKb = 512 },
            new() { Id = 6, Name = "Arduino Nano V3", Manufacturer = "Arduino", MicrocontrollerId = 3, FlashKb = 32 }
        };
        boardsCol.InsertMany(boards);
    }
}
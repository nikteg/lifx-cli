#!/usr/bin/env node

require("yargs")
  .command(
    "color <hue> <saturation> <brightness> <kelvin>",
    "Set lights color",
    () => {},
    ({ hue, saturation, brightness, kelvin }) =>
      require("node-lifx-lan").setColorBroadcast({
        color: {
          hue: Math.min(1, Math.max(parseFloat(hue), 0)), // 0.0-1.1
          saturation: Math.min(1, Math.max(parseFloat(saturation), 0)), // 0.0-1.1
          brightness: Math.min(1, Math.max(parseFloat(brightness), 0)), // 0.0-1.1
          kelvin: Math.min(9000, Math.max(parseInt(kelvin), 2500)) // 2500-9000
        }
      })
  )
  // .command("power <on|off>", "Power lights on or off", ({ onoff }) => {
  //   if (onoff === "on") {
  //     return Lifx.turnOnBroadcast();
  //   } else {
  //     return Lifx.turnOffBroadcast();
  //   }
  // })
  .help().argv;

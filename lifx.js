#!/usr/local/bin/node

const yargs = require("yargs");
const lifx = require("node-lifx-lan");

function noop() {}

function exit() {
  process.exit(1);
}

yargs
  .version()
  .help()
  .option("ip", {
    describe: "Bulb IP-address"
  })
  .option("mac", {
    describe: "Bulb MAC-address"
  })
  .demandOption(["ip", "mac"])
  .command(
    "color <hue> <saturation> <brightness> <kelvin>",
    "Set lights color",
    noop,
    ({ hue, saturation, brightness, kelvin, ip, mac }) =>
      lifx
        .createDevice({
          ip,
          mac
        })
        .then(device =>
          device.setColor({
            color: {
              hue: Math.min(1, Math.max(parseFloat(hue), 0)), // 0.0-1.0
              saturation: Math.min(1, Math.max(parseFloat(saturation), 0)), // 0.0-1.0
              brightness: Math.min(1, Math.max(parseFloat(brightness), 0)), // 0.0-1.0
              kelvin: Math.min(9000, Math.max(parseInt(kelvin), 1500)) // 1500-9000
            }
          })
        )
        .then(exit)
  )
  .command("power <on|off>", "Power lights on or off", yargs =>
    yargs
      .command("on", "Power lights on", noop, ({ ip, mac }) =>
        lifx
          .createDevice({
            ip,
            mac
          })
          .then(device => device.turnOn())
          .then(exit)
      )
      .command("off", "Power lights off", noop, ({ ip, mac }) =>
        lifx
          .createDevice({
            ip,
            mac
          })
          .then(device => device.turnOff())
          .then(exit)
      )
  ).argv;

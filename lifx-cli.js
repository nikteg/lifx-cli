#! /usr/bin/env node

const yargs = require("yargs");
const lifx = require("node-lifx-lan");

function noop() {}

function exit() {
  process.exit(1);
}

function demandBulbFlags(yargs) {
  return yargs
    .option("ip", {
      describe: "Bulb IP-address"
    })
    .option("mac", {
      describe: "Bulb MAC-address"
    })
    .demandOption(["ip", "mac"]);
}

function createColorObject(
  hue = 1,
  saturation = 1,
  brightness = 1,
  kelvin = 3000
) {
  return {
    color: {
      hue: Math.min(1, Math.max(parseFloat(hue), 0)), // 0.0-1.0
      saturation: Math.min(1, Math.max(parseFloat(saturation), 0)), // 0.0-1.0
      brightness: Math.min(1, Math.max(parseFloat(brightness), 0)), // 0.0-1.0
      kelvin: Math.min(9000, Math.max(parseInt(kelvin), 1500)) // 1500-9000
    }
  };
}

yargs
  .version()
  .help()
  .command(
    "color <hue> <saturation> <brightness> <kelvin>",
    "Set light color",
    demandBulbFlags,
    ({ ip, mac }) =>
      lifx
        .createDevice({
          ip,
          mac
        })
        .then(device =>
          device.setColor(
            createColorObject(hue, saturation, brightness, kelvin)
          )
        )
        .then(exit)
  )
  .command("power <on|off>", "Power light on or off", yargs =>
    yargs
      .command(
        "on",
        "Power light on",
        yargs =>
          demandBulbFlags(yargs).option("color", {
            describe:
              "Color object. Example: 'hue,saturation,brightness,kelvin'"
          }),
        ({ ip, mac, color }) =>
          lifx
            .createDevice({
              ip,
              mac
            })
            .then(
              device =>
                color
                  ? device.turnOn(createColorObject(...color.split(",")))
                  : device.turnOn()
            )
            .then(exit)
      )
      .command("off", "Power light off", demandBulbFlags, ({ ip, mac }) =>
        lifx
          .createDevice({
            ip,
            mac
          })
          .then(device => device.turnOff())
          .then(exit)
      )
  )
  .command("discover", "Discover lights on your network", noop, () =>
    lifx
      .discover()
      .then(list =>
        list.forEach(({ mac, ip, deviceInfo: { label, productName } }) =>
          console.log(`${productName} (${label})\t${ip}\t${mac}`)
        )
      )
      .then(exit)
  ).argv;

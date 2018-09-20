#!/bin/bash

export PATH="/usr/local/bin:$PATH"

# Populate bulb IP and MAC addresses
export BULB_IP=""
export BULB_MAC="" 

function power() {
  lifx-cli --ip $BULB_IP --mac $BULB_MAC power $1
}

function off() {
  lifx-cli --ip $BULB_IP --mac $BULB_MAC power $1
}

function kelvin() {
  lifx-cli --ip $BULB_IP --mac $BULB_MAC color 1 1 1 $1
}

echo "Lights"
echo "---"
echo "On | bash=$0 param1=on terminal=false"
echo "Off | bash=$0 param1=off terminal=false"
echo "---"
echo "Amber | bash=$0 param1=kelvin param2=1500 terminal=false"
echo "Night | bash=$0 param1=kelvin param2=1800 terminal=false"
echo "Neutral | bash=$0 param1=kelvin param2=3000 terminal=false"
echo "Focus | bash=$0 param1=kelvin param2=3700 terminal=false"
echo "Dentist | bash=$0 param1=kelvin param2=4000 terminal=false"

case "$1" in
  on)
  power on
  ;;
  off)
  power off
  ;;
  kelvin)
  kelvin $2
  ;;
  *)
  exit
esac
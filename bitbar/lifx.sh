#!/bin/bash

# <bitbar.title>Lifx bitbar plugin</bitbar.title>
# <bitbar.version>v1.0</bitbar.version>
# <bitbar.author>Niklas Tegnander</bitbar.author>
# <bitbar.author.github>nikteg</bitbar.author.github>
# <bitbar.desc>Change your Lifx light with bitbar!</bitbar.desc>
# <bitbar.dependencies>node</bitbar.dependencies>
# <bitbar.abouturl>https://github.com/nikteg/lifx-cli/</bitbar.abouturl>

export PATH="/usr/local/bin:$PATH"

# Populate bulb IP and MAC addresses
export BULB_IP=""
export BULB_MAC="" 

function power() {
  lifx-cli --ip $BULB_IP --mac $BULB_MAC power $1
}

function kelvin() {
  lifx-cli --ip $BULB_IP --mac $BULB_MAC power on --color "1,1,1,$1"
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
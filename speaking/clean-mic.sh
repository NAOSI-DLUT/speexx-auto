#!/bin/bash

# This script will create a virtual microphone for PulseAudio to use and set it as the default device.
# Adapted from: https://stackoverflow.com/a/43553706/2272346

function cleanup() {
  pactl unload-module module-pipe-source
  rm -f "$HOME"/.config/pulse/client.conf
}

echo "Clean virtual mircophone."
cleanup

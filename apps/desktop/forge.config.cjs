module.exports = {
  packagerConfig: {
    asar: true,
    executableName: "AlbertoAudioMidiG4",
  },
  makers: [
    { name: "@electron-forge/maker-zip", platforms: ["win32"] },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "AlbertoAudioMidiG4",
        authors: "ALBERTO AUDIO MIDI (PoC)",
        description: "M04 G4 Windows technical proof of concept",
      },
    },
  ],
};

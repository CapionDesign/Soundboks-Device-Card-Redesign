// src/data/devices.js
export const mockDevices = [
  {
    id: '000278', productType: 'sb4', name: 'Soundboks 4',
    connected: true, teamRole: 'solo', level: 4,
    soundProfile: 'Lounge', firmwareUpdate: true,
    // Connection status shown in TeamRoleRow
    btConnected: false,
    skaaConnected: true,
    auxConnected: true,
    ch1Connected: true,
    ch2Connected: true,
    stereoRole: 'right',
  },
  {
    id: '027457', productType: 'sbGo', name: 'Soundboks Go',
    connected: true, teamRole: 'solo', level: 5,
    soundProfile: 'Lounge', firmwareUpdate: false,
    btConnected: true,
    skaaConnected: false,
    auxConnected: false,
    ch1Connected: false,
    ch2Connected: false,
    stereoRole: 'mono',
  },
  {
    id: '001598', productType: 'lightboks', name: 'Lightboks',
    connected: true, teamRole: 'solo', level: 3,
    energyLevel: 'Dance', effectDuration: 50,
    paletteId: 0, firmwareUpdate: true,
  },
  {
    id: '000877', productType: 'lightboks', name: 'Lightboks',
    connected: true, teamRole: 'host', level: 7,
    energyLevel: 'Chill', effectDuration: 30,
    paletteId: 2, firmwareUpdate: false,
  },
]

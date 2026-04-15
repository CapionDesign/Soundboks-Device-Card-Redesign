# PRD — Soundboks Device Card Prototype
**Solo reference · Sprint: 2 weeks · Stack: Vite + React · Deployed: Vercel**

---

## Purpose

A shareable web prototype for testing the redesigned Device Card UI. Opened via URL on any phone — no installs. Focused entirely on the Devices screen and Device Cards. Nothing else is built out.

---

## Sharing

- Hosted on Vercel (free tier)
- One URL, works on any modern iOS or Android browser
- Portrait only

---

## Platform

- Vite + React, plain CSS modules
- Mobile browser, portrait only
- Dark mode only
- Safe area aware (`env(safe-area-inset-top/bottom)`)
- Use `100dvh` not `100vh`
- Base font size 16px (prevents iOS input zoom)
- All tap targets minimum 44×44px

---

## What's built

### Devices screen
The only screen. Four Device Cards in a scrollable list:
- Soundboks 4 (connected)
- Soundboks Go (connected)
- Lightboks — #001598 (connected)
- Lightboks — #000877 (connected)

### Device Cards
Each card is a fully interactive control surface per Design.md.

Bottom nav bar is present (Devices + Profile tabs) but Profile tab does nothing.

---

## Device Card features by product

### Lightboks card
- InfoRow: Lightboks icon + name + device ID + ··· (opens Device Settings sheet)
- TeamRoleRow: Solo/Host/Join pill
- HeroArea: active color palette gradient (left) + brightness level 1–10 (right)
- ActionGrid: Turn off · TeamUp · Energy Level (shows active: "Dance") · Color
- FirmwareBanner: shown on one of the two Lightboks cards
- Bottom sheets: Device Settings, Energy Level, Color Picker
- Energy Level: Chill / Dance / Rave cards + Effect Duration slider (Dance/Rave only)
- Color Picker: 6 palette swatches, selection updates hero gradient immediately
- BeatPad: accessible from a button on the card, full-screen hold-to-activate (Strobe, Sparkle, Chase, Blackout)
- Device Settings: Team Role pills + Session Lock toggle + PIN stub + X/Y Mirroring toggle + About stub + Firmware stub + Diagnostics stub + Disconnect

### Soundboks card (SB4 as reference, SB Go has no ProPanel)
- InfoRow: speaker icon + name + device ID + ··· (opens Device Settings sheet)
- TeamRoleRow: Solo/Host/Join pill
- HeroArea: solid red left panel with speaker icon + volume level 1–10 (right)
- ActionGrid: Turn off · TeamUp · Sound Profile (shows active: "Lounge") · ProPanel (SB4 only)
- FirmwareBanner: shown on Soundboks 4
- Bottom sheets: Device Settings, Sound Profile, ProPanel (SB4 only)
- Sound Profile: Stereo Role chips + Lounge/Dancefloor/Stage cards + Custom EQ stub
- ProPanel: Ch1/Ch2 chips + Mic/Line-in chips + Gain slider + 6-band EQ (vertical sliders)
- Device Settings: Team Role pills + Session Lock toggle (SB4 only) + PIN stub + SKAA Pro Mode toggle + Native BT Autoconnect toggle + Stereo Role + About stub + Firmware stub + Diagnostics stub + Disconnect

---

## Interactions wired

| Interaction | Status |
|---|---|
| Brightness/volume level (tap +/- on hero) | ✅ real-time |
| Energy Level selection | ✅ updates hero label |
| Effect Duration slider | ✅ shown/hidden by energy level |
| Color palette selection | ✅ updates hero gradient |
| Sound Profile selection | ✅ updates button label |
| BeatPad hold/release | ✅ both touch + mouse |
| Device Settings toggles | ✅ |
| Team Role pill selection | ✅ |
| Turn off confirmation | ✅ browser alert |
| Disconnect confirmation | ✅ browser alert |
| TeamUp | ❌ stub alert |
| PIN code | ❌ stub alert |
| Firmware upgrade | ❌ stub alert |
| Create palette | ❌ stub alert |
| Custom EQ | ❌ stub alert |
| Profile tab | ❌ does nothing |

---

## Out of scope

- Team Cards
- Connect Device flow
- Real Bluetooth
- Authentication
- Uplight / Static Mode (placement unresolved)
- Remote Power On / Sleep / Idle
- Landscape
- Light mode

---

## File structure

```
src/
  components/
    DeviceCard/
    ActionButton/
    HeroArea/
    BottomSheet/
    BottomNav/
    SettingsRow/
    TeamRolePill/
    BeatPadButton/
    FirmwareBanner/
  screens/
    DevicesScreen/
  sheets/
    DeviceSettings/
    EnergyLevel/
    ColorPicker/
    SoundProfile/
    ProPanel/
    BeatPad/
  data/
    devices.js
    palettes.js
    productFeatures.js
  constants/
    colors.js

docs/
  PRD.md
  Design.md

assets/
  (inline SVG placeholders until real assets added)
```

---

## Definition of done

- All 4 cards render correctly on OnePlus 10 Pro and iPhone 16
- Wired interactions work on touch
- Bottom sheets open/close smoothly
- Safe areas respected on both devices
- Deployed to Vercel, shareable via single URL

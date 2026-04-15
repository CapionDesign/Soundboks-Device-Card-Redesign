# Design.md — Soundboks Device Card Prototype

Source of truth for visual design and component behaviour. If this conflicts with PRD.md, this file wins on visual decisions. PRD.md wins on scope decisions.

---

## Platform

- Mobile browser only (iOS Safari + Android Chrome)
- Portrait only
- Dark mode only — no light mode variant
- Safe area aware: `env(safe-area-inset-top)` on header, `env(safe-area-inset-bottom)` on bottom nav
- `100dvh` everywhere instead of `100vh`
- 16px base font size

---

## Colors

```css
--bg-primary: #0D0D0D;
--bg-card: #1A1A1A;
--bg-elevated: #242424;
--bg-action-btn: #2A2A2A;
--accent-red: #E8192C;
--text-primary: #FFFFFF;
--text-secondary: #888888;
--text-tertiary: #555555;
--border-subtle: rgba(255,255,255,0.06);
--border-active: rgba(255,255,255,0.2);
```

Define all on `:root`. Never hardcode hex values in components.

---

## Typography

Font: Inter from Google Fonts.

| Role | Size | Weight |
|---|---|---|
| Screen title | 28px | 700 |
| Card product name | 17px | 600 |
| Card device ID | 14px | 400 |
| Hero level number | 52px | 800 |
| Action button label | 12px | 400 |
| Settings row label | 16px | 400 |
| Settings row value | 16px | 400 |
| Firmware text | 13px | 400 |
| Firmware "Upgrade" | 13px | 600 |

---

## Spacing

Base unit 4px. Use: 8 / 12 / 16 / 20 / 24 / 32.

---

## Radius

- Cards: 16px
- Action buttons: 12px
- Pills/chips: 100px
- Bottom sheets: 20px top corners only

---

## Navigation

Two tabs: **Devices** (default) + **Profile** (does nothing).

- Devices icon: bold parallelogram SVG (Soundboks brand mark)
- Profile icon: person silhouette outline SVG
- Active: `--accent-red` icon + label
- Inactive: `--text-secondary`
- Background: `--bg-primary` + subtle top border
- Bottom padding: `env(safe-area-inset-bottom)`

---

## Screen: Devices

Header: "Devices" (28px/700) left + circular red "+" button right (44px, `--accent-red` bg, white +). Header top padding: `env(safe-area-inset-top)`.

Content: vertical scroll list of 4 Device Cards with 12px gap, 16px horizontal padding.

---

## Component: Device Card

Card background: `--bg-card`. Border: `--border-subtle`. Radius: 16px. Padding: 16px. No tap-to-navigate — the card is the control surface.

### Structure top to bottom:

**1. InfoRow**
- Left: product icon SVG (~40px, white, line-based)
  - Lightboks: hexagonal cluster of 6 circles
  - Speaker: rectangular grille pattern
- Center: product name (17px/600) + device ID below (14px/400, `--text-secondary`)
- Right: ··· button (44px tap target) → opens Device Settings bottom sheet

**2. TeamRoleRow**
- Circular-arrows icon + role label pill: Solo / Host / Join
- Outlined pill, white border, white text
- Sits below InfoRow, above HeroArea

**3. HeroArea**
- Full-width row, ~110px tall, two panels side by side
- Left panel (~60%): rounded corners
  - Lightboks: CSS gradient using active palette colors, centered sun/brightness SVG icon
  - Speaker: solid `--accent-red`, centered speaker SVG icon
- Right panel (~40%): `--bg-elevated` background, level number centered (52px/800)
- Level = 1–10 integer. Tap left panel on Lightboks → opens Color Picker

**4. ActionGrid**
- Single row of 4 equal buttons (3 for Rider — not in this prototype)
- Each button: `--bg-action-btn`, 12px radius, ~72px tall, SVG icon (22px) above label (12px)
- All icons inline SVG, no icon library

| Product | Btn 1 | Btn 2 | Btn 3 | Btn 4 |
|---|---|---|---|---|
| Lightboks | Turn off | TeamUp | [active energy level] | Color |
| Soundboks 4 | Turn off | TeamUp | [active sound profile] | ProPanel |
| Soundboks Go | Turn off | TeamUp | [active sound profile] | — |

- Btn 3 label shows current active state ("Dance", "Lounge", etc.) not the feature name
- Turn off → browser `confirm()` dialog
- TeamUp → browser `alert()` stub

**5. FirmwareBanner** (conditional)
- Shown only when `firmwareUpdate: true`
- Full-width bar inside card, top border `--border-subtle`
- Left: ⓘ SVG + "New firmware upgrade available" (13px, `--text-secondary`)
- Right: "Upgrade" (13px/600, `--accent-red`) → `alert()` stub

---

## Product feature flags

```js
// src/data/productFeatures.js
export const PRODUCT_FEATURES = {
  lightboks: {
    hasVolume: false,
    hasBrightness: true,
    hasEnergyLevel: true,
    hasColorPalette: true,
    hasBeatPad: true,
    hasXYMirroring: true,
    hasProPanel: false,
    hasTeamUp: true,
    hasStereoRole: false,
    hasSessionLock: true,
    hasSkaaProMode: false,
    hasNativeBTAutoconnect: false,
    hasTeamUpRole: true,
  },
  sb4: {
    hasVolume: true,
    hasBrightness: false,
    hasEnergyLevel: false,
    hasColorPalette: false,
    hasBeatPad: false,
    hasXYMirroring: false,
    hasProPanel: true,
    hasTeamUp: true,
    hasStereoRole: true,
    hasSessionLock: true,
    hasSkaaProMode: true,
    hasNativeBTAutoconnect: true,
    hasTeamUpRole: true,
  },
  sbGo: {
    hasVolume: true,
    hasBrightness: false,
    hasEnergyLevel: false,
    hasColorPalette: false,
    hasBeatPad: false,
    hasXYMirroring: false,
    hasProPanel: false,
    hasTeamUp: true,
    hasStereoRole: true,
    hasSessionLock: false,
    hasSkaaProMode: true,
    hasNativeBTAutoconnect: true,
    hasTeamUpRole: true,
  },
}
```

---

## Mock devices (src/data/devices.js)

```js
export const mockDevices = [
  {
    id: '000278', productType: 'sb4', name: 'Soundboks 4',
    connected: true, teamRole: 'solo', level: 3,
    soundProfile: 'Lounge', firmwareUpdate: true,
  },
  {
    id: '027457', productType: 'sbGo', name: 'Soundboks Go',
    connected: true, teamRole: 'solo', level: 5,
    soundProfile: 'Lounge', firmwareUpdate: false,
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
```

---

## Mock palettes (src/data/palettes.js)

```js
export const palettes = [
  { id: 0, name: 'Pure Bliss',  colors: ['#7B2FFF', '#FF6B9D', '#FFD93D'] },
  { id: 1, name: 'Ocean',       colors: ['#0099FF', '#00E5CC', '#FFFFFF'] },
  { id: 2, name: 'Ember',       colors: ['#FF4500', '#FF8C00', '#FFD700'] },
  { id: 3, name: 'Forest',      colors: ['#00C853', '#1B5E20', '#76FF03'] },
  { id: 4, name: 'Candy',       colors: ['#FF4081', '#E040FB', '#40C4FF'] },
  { id: 5, name: 'Mono',        colors: ['#FFFFFF', '#AAAAAA', '#555555'] },
]
```

---

## Bottom Sheet

Reusable component. Props: `visible`, `onClose`, `title`, `children`.

- Renders as fixed overlay: backdrop (`rgba(0,0,0,0.7)`) + sheet
- Sheet: slides up with CSS transition (`transform: translateY`, 300ms ease)
- Background: `--bg-card`, top radius 20px
- Handle: 40px wide, 4px tall, `#333`, centered, 12px from top
- Bottom padding: `env(safe-area-inset-bottom)` + 16px
- Backdrop click → closes

---

## Sheet: Device Settings

Header: "Device #[ID]" (18px/600).

**Team Role selector:** three pills — Solo · Host · Join. Active = `--accent-red` filled + white text. Inactive = outlined. Tap to update.

**Settings rows** — derive from PRODUCT_FEATURES. Order:

1. Session Lock (toggle) — if `hasSessionLock`
2. PIN Code (chevron) — all products → `alert()` stub
3. SKAA Pro Mode (toggle) — if `hasSkaaProMode`
4. Native BT Autoconnect (toggle) — if `hasNativeBTAutoconnect`
5. Stereo Role (value: "Mono", chevron) — if `hasStereoRole`
6. X/Y Mirroring (toggle) — if `hasXYMirroring`
7. About Device (chevron) → `alert()` stub
8. Firmware Version (chevron) → `alert()` stub
9. Send Device Diagnostics (action row, subtext: "No personal data is collected") → `alert()` stub
10. Disconnect App from Device (destructive, `--accent-red` text) → `confirm()` dialog

Row height: 56px. Border-bottom: `--border-subtle`. Toggle = HTML checkbox styled as a switch.

---

## Sheet: Energy Level

Three stacked option cards. Active card: white border (2px). Inactive: `--border-subtle`.

| Option | Left border color | Description |
|---|---|---|
| Chill | `#00BCD4` (teal) | Ambient, no strobes |
| Dance | `#F5A623` (amber) | Moderate effects |
| Rave | `#E8192C` (red) | Full intensity |

Effect Duration slider: shown only when Dance or Rave active.
- Label "Effect duration" left, value right
- Range input, custom styled: 4px track, white thumb 20px, `touch-action: none`
- Updates `effectDuration` on device in state

---

## Sheet: Color Picker

Title "Color".

Horizontal scroll row of palette circles:
- Each: 72px circle, CSS gradient from palette colors, name below (12px, `--text-secondary`)
- Active: white ring (3px solid white border)
- Tap → updates `paletteId` on device, hero gradient updates immediately

"Create palette" button: outlined secondary style → `alert()` stub.

---

## Sheet: Sound Profile

Stereo Role chips row: Left · Mono · Right. Active chip: white bg, black text.

Three profile cards (same style as Energy Level cards):

| Profile | Left border | Description |
|---|---|---|
| Lounge | `#00BCD4` | Casual listening |
| Dancefloor | `#F5A623` | Party, battery efficient |
| Stage | `#E8192C` | Full SOUNDBOKS experience |

Active card: white border. Tap → updates `soundProfile`, button label on card updates.

"Custom EQ" secondary button → `alert()` stub.

---

## Sheet: ProPanel (SB4 only)

Ch1 / Ch2 chips → Mic / Line-in chips → Gain slider → 6-band EQ.

Gain slider: label "Gain", – left, + right. Custom styled range input.

EQ: 6 vertical sliders in a row.
- Labels below: 60Hz · 150Hz · 400Hz · 1kHz · 4kHz · 12kHz
- Vertical: `input[type=range]` rotated `rotate(-90deg)` inside an 80px tall fixed wrapper
- No state persistence needed — visual only

---

## BeatPad (full screen, not a sheet)

Accessed from Lightboks ActionGrid "BeatPad" button (add as 5th action or replace Color temporarily — designer's call for prototype).

Full screen overlay. Close button top left.

2×2 grid of BeatPadButtons: Strobe · Sparkle · Chase · Blackout.

Each button: `--bg-card` bg, effect name (18px/600), "Hold to activate" subtext (`--text-secondary`).

Active state (on hold): white background, black text.

Events to wire: `mousedown` + `touchstart` → activate. `mouseup` + `touchend` + `touchcancel` → deactivate. One active at a time.

---

## Animations

Keep animations CSS-only where possible:
- Bottom sheet slide-up: `transform: translateY(100%)` → `translateY(0)`, 300ms ease
- Backdrop fade: `opacity: 0` → `opacity: 1`, 200ms ease
- BeatPad active state: `background-color` transition 80ms
- Sheet content entry: no additional animation needed

---

## Icons

All inline SVG. No icon libraries. `currentColor` fill/stroke so color inherits.

Key icons needed:
- Lightboks: hexagonal cluster (6 small circles arranged in flower pattern)
- Speaker: rectangle with horizontal lines (grille)
- Devices tab: bold parallelogram
- Profile tab: person outline
- TeamUp: two circular arrows
- Turn off: power circle with top line gap
- Energy/BeatPad: four-point sparkle
- Color: cluster of 3 dots
- ProPanel: vertical lines with horizontal arrow
- Overflow (···): three dots horizontal
- Circular arrows (team role): recycling-style arrows
- Chevron: simple `>` right arrow
- ⓘ: circle with i

---

## Accessibility

- `touch-action: manipulation` on all interactive elements (prevents 300ms delay)
- `touch-action: none` on all range sliders
- `-webkit-tap-highlight-color: transparent` globally
- Minimum 44×44px tap targets (use padding, not size)

---

## Deployment

1. `npm run build` → `/dist`
2. Connect GitHub repo to Vercel
3. Vercel auto-deploys on push to main
4. Share the `.vercel.app` URL with team

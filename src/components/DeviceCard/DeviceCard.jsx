import { useState, useRef } from 'react'
import styles from './DeviceCard.module.css'
import { useDevices } from '../../context/DeviceContext'
import { PRODUCT_FEATURES } from '../../data/productFeatures'
import { palettes } from '../../data/palettes'
import ActionButton from '../ActionButton/ActionButton'
import TeamRolePill from '../TeamRolePill/TeamRolePill'
import FirmwareBanner from '../FirmwareBanner/FirmwareBanner'
import BottomSheet from '../BottomSheet/BottomSheet'
import DeviceSettings from '../../sheets/DeviceSettings/DeviceSettings'
import EnergyLevel from '../../sheets/EnergyLevel/EnergyLevel'
import ColorPicker from '../../sheets/ColorPicker/ColorPicker'
import SoundProfile from '../../sheets/SoundProfile/SoundProfile'
import ProPanel from '../../sheets/ProPanel/ProPanel'
import BeatPad from '../../sheets/BeatPad/BeatPad'

// ─── Icons ────────────────────────────────────────────────────────────────────

// TODO: replace with assets/lightboks-icon.svg
function LightboksProductIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="7"  r="5" />
      <circle cx="27" cy="12" r="5" />
      <circle cx="27" cy="24" r="5" />
      <circle cx="18" cy="29" r="5" />
      <circle cx="9"  cy="24" r="5" />
      <circle cx="9"  cy="12" r="5" />
    </svg>
  )
}

// TODO: replace with assets/speaker-icon.svg
function SpeakerProductIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="28" height="28" rx="4" />
      <line x1="9"  y1="13" x2="27" y2="13" />
      <line x1="9"  y1="18" x2="27" y2="18" />
      <line x1="9"  y1="23" x2="27" y2="23" />
    </svg>
  )
}

// TODO: replace with assets/bt-off-icon.svg
function BtOffIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="7" x2="12" y2="7" />
    </svg>
  )
}

// TODO: replace with assets/bt-on-icon.svg
function BtOnIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,4 10,9 7,11 7,3 10,5 4,10" />
    </svg>
  )
}

// TODO: replace with assets/skaa-icon.svg
function SkaaIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <line x1="7" y1="1"  x2="7"  y2="13" />
      <line x1="1" y1="7"  x2="13" y2="7" />
      <line x1="2.5" y1="2.5"  x2="11.5" y2="11.5" />
      <line x1="11.5" y1="2.5" x2="2.5"  y2="11.5" />
    </svg>
  )
}

// TODO: replace with assets/overflow-icon.svg
function OverflowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4"  cy="10" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  )
}

// TODO: replace with assets/circular-arrows-icon.svg
function CircularArrowsIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 3.5A7 7 0 1 1 4.5 14" />
      <path d="M13.5 8V3.5H9" />
    </svg>
  )
}

// TODO: replace with assets/sparkle-icon.svg (Energy Level / BeatPad)
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
    </svg>
  )
}

// TODO: replace with assets/color-icon.svg
function ColorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8"  cy="13" r="3.5" />
      <circle cx="16" cy="9"  r="3.5" />
      <circle cx="16" cy="17" r="3.5" />
    </svg>
  )
}

// TODO: replace with assets/propanel-icon.svg
function ProPanelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <line x1="6"  y1="4" x2="6"  y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="18" y1="4" x2="18" y2="20" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
      <polyline points="8,9 11,12 8,15" />
    </svg>
  )
}

// TODO: replace with assets/soundprofile-icon.svg
function SoundProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <line x1="4"  y1="18" x2="4"  y2="14" />
      <line x1="8"  y1="18" x2="8"  y2="8" />
      <line x1="12" y1="18" x2="12" y2="6" />
      <line x1="16" y1="18" x2="16" y2="10" />
      <line x1="20" y1="18" x2="20" y2="15" />
    </svg>
  )
}

// TODO: replace with assets/power-icon.svg
function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v6" />
      <path d="M18.36 7.64a9 9 0 1 1-12.73 0" />
    </svg>
  )
}

// TODO: replace with assets/teamup-icon.svg
function TeamUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

// TODO: replace with assets/gear-icon.svg
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

// TODO: replace with assets/mirror-icon.svg
function MirrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v18" strokeDasharray="3 2" />
      <path d="M4 7l4 5-4 5" />
      <path d="M20 7l-4 5 4 5" />
    </svg>
  )
}

// TODO: replace with assets/stereo-icon.svg
function StereoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="7" height="9" rx="1.5" />
      <rect x="15" y="8" width="7" height="9" rx="1.5" />
      <line x1="9" y1="12.5" x2="15" y2="12.5" />
    </svg>
  )
}

// TODO: replace with assets/volume-icon.svg
function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  )
}

// TODO: replace with assets/sun-icon.svg
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.9"  y1="4.9"  x2="7.1"  y2="7.1" />
      <line x1="16.9" y1="16.9" x2="19.1" y2="19.1" />
      <line x1="4.9"  y1="19.1" x2="7.1"  y2="16.9" />
      <line x1="16.9" y1="7.1"  x2="19.1" y2="4.9" />
    </svg>
  )
}

// ─── VerticalSlider ───────────────────────────────────────────────────────────

function VerticalSlider({ value, maxValue, fillStyle, icon, ariaLabel, onChange }) {
  const trackRef  = useRef(null)
  const isDragging = useRef(false)

  function levelFromClientY(clientY) {
    const rect = trackRef.current.getBoundingClientRect()
    const y    = Math.max(0, Math.min(clientY - rect.top, rect.height))
    return Math.round(((rect.height - y) / rect.height) * maxValue)
  }

  function handlePointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    isDragging.current = true
    onChange(levelFromClientY(e.clientY))
  }

  function handlePointerMove(e) {
    if (!isDragging.current) return
    onChange(levelFromClientY(e.clientY))
  }

  function handlePointerUp() {
    isDragging.current = false
  }

  const fillPct = (value / maxValue) * 100

  return (
    <div className={styles.sliderCol}>
      <div
        ref={trackRef}
        className={styles.vertSlider}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-label={ariaLabel}
      >
        <div
          className={styles.vertFill}
          style={{ ...fillStyle, height: `${fillPct}%` }}
        />
        <div className={styles.vertIcon}>{icon}</div>
        <span className={styles.vertValue}>{value}</span>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DeviceCard({ device }) {
  const { updateDevice } = useDevices()
  const features = PRODUCT_FEATURES[device.productType]

  const [settingsOpen,     setSettingsOpen]     = useState(false)
  const [energyLevelOpen,  setEnergyLevelOpen]  = useState(false)
  const [colorPickerOpen,  setColorPickerOpen]  = useState(false)
  const [soundProfileOpen, setSoundProfileOpen] = useState(false)
  const [proPanelOpen,     setProPanelOpen]     = useState(false)
  const [beatPadOpen,      setBeatPadOpen]      = useState(false)

  function handleLevelChange(newLevel) {
    updateDevice(device.id, { level: newLevel })
  }

  // Build quick action grid from feature flags — ··· More always last
  const actionButtons = [
    {
      id: 'turnoff',
      icon: <PowerIcon />,
      label: 'Turn off',
      onPress: () => confirm(`Turn off ${device.name}?`),
    },
  ]

  // Speakers: Bass+ (sound profile sheet)
  if (features.hasVolume) {
    actionButtons.push({
      id: 'bassplus',
      icon: <SoundProfileIcon />,
      label: 'Bass+',
      onPress: () => setSoundProfileOpen(true),
    })
  }

  // Lightboks: Energy Level
  if (features.hasEnergyLevel) {
    actionButtons.push({
      id: 'energy',
      icon: <SparkleIcon />,
      label: device.energyLevel || 'Energy',
      onPress: () => setEnergyLevelOpen(true),
    })
  }

  // Lightboks: Color palette
  if (features.hasColorPalette) {
    actionButtons.push({
      id: 'color',
      icon: <ColorIcon />,
      label: 'Color',
      onPress: () => setColorPickerOpen(true),
    })
  }

  // Speakers: Pro Panel
  if (features.hasProPanel) {
    actionButtons.push({
      id: 'propanel',
      icon: <ProPanelIcon />,
      label: 'ProPanel',
      onPress: () => setProPanelOpen(true),
    })
  }

  // Speakers: TeamUp button
  if (features.hasTeamUpButton) {
    actionButtons.push({
      id: 'teamup',
      icon: <TeamUpIcon />,
      label: 'TeamUp',
      onPress: () => alert('TeamUp — coming soon'),
    })
  }

  // Lightboks: BeatPad
  if (features.hasBeatPad) {
    actionButtons.push({
      id: 'beatpad',
      icon: <SparkleIcon />,
      label: 'BeatPad',
      onPress: () => setBeatPadOpen(true),
    })
  }

  // Lightboks: Mirror (XY mirroring)
  if (features.hasXYMirroring) {
    actionButtons.push({
      id: 'mirror',
      icon: <MirrorIcon />,
      label: 'Mirror',
      onPress: () => alert('Mirror — coming soon'),
    })
  }

  // Speakers: Stereo
  if (features.hasStereoRole) {
    actionButtons.push({
      id: 'stereo',
      icon: <StereoIcon />,
      label: 'Stereo',
      onPress: () => alert('Stereo — coming soon'),
    })
  }

  // ··· More — always last (opens device settings)
  actionButtons.push({
    id: 'more',
    icon: <OverflowIcon />,
    label: 'More',
    onPress: () => setSettingsOpen(true),
  })

  // Vertical slider config
  const palette  = palettes[device.paletteId ?? 0]
  const maxLevel = features.hasVolume ? 11 : 10
  const fillStyle = features.hasColorPalette
    ? { background: `linear-gradient(to top, ${palette.colors[0]}, ${palette.colors[1]}, ${palette.colors[2]})` }
    : { background: 'var(--accent-red)' }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.twoCol}>
          {/* Left column: header rows + action grid */}
          <div className={styles.leftCol}>
            {/* InfoRow */}
            <div className={styles.infoRow}>
              <div className={styles.productIcon}>
                {features.hasColorPalette ? <LightboksProductIcon /> : <SpeakerProductIcon />}
              </div>
              <div className={styles.deviceInfo}>
                <span className={styles.deviceName}>{device.name}</span>
                <span className={styles.deviceId}>#{device.id}</span>
              </div>
            </div>

            {/* TeamRoleRow */}
            {features.hasTeamUpRole && (
              <div className={styles.teamRoleRow}>
                <CircularArrowsIcon />
                <TeamRolePill role={device.teamRole} />

                {features.hasVolume && (
                  <>
                    <div className={styles.rowSep} />
                    <div className={styles.statusGroup}>
                      <span className={styles.statusIcon}>
                        {device.btConnected ? <BtOnIcon /> : <BtOffIcon />}
                      </span>
                      {device.skaaConnected && (
                        <span className={styles.statusIcon}><SkaaIcon /></span>
                      )}
                      {device.auxConnected && (
                        <span className={styles.statusItem}>
                          <span className={styles.statusDot} />
                          <span className={styles.statusLabel}>AUX</span>
                        </span>
                      )}
                      {device.ch1Connected && (
                        <span className={styles.statusItem}>
                          <span className={styles.statusDot} />
                          <span className={styles.statusLabel}>Ch1</span>
                        </span>
                      )}
                      {device.ch2Connected && (
                        <span className={styles.statusItem}>
                          <span className={styles.statusDot} />
                          <span className={styles.statusLabel}>Ch2</span>
                        </span>
                      )}
                    </div>
                    {features.hasStereoRole && device.stereoRole && (
                      <>
                        <div className={styles.rowSep} />
                        <span className={styles.stereoRole}>
                          {device.stereoRole.charAt(0).toUpperCase()}
                        </span>
                      </>
                    )}
                  </>
                )}

                {features.hasBrightness && (
                  <>
                    <div className={styles.rowSep} />
                    <span className={styles.energyIndicator}><SparkleIcon /></span>
                  </>
                )}
              </div>
            )}

            {/* Quick action grid */}
            <div className={styles.quickGrid}>
              {actionButtons.slice(0, 6).map(btn => (
                <ActionButton
                  key={btn.id}
                  icon={btn.icon}
                  label={btn.label}
                  onPress={btn.onPress}
                  className={styles.quickTile}
                />
              ))}
            </div>
          </div>

          {/* Right column: slider spans full card height */}
          <VerticalSlider
            value={device.level ?? 0}
            maxValue={maxLevel}
            fillStyle={fillStyle}
            icon={features.hasColorPalette ? <SunIcon /> : <VolumeIcon />}
            ariaLabel={features.hasColorPalette ? 'Brightness' : 'Volume'}
            onChange={handleLevelChange}
          />
        </div>

        {device.firmwareUpdate && <FirmwareBanner />}
      </div>

      {/* ─── Sheets ──────────────────────────────────────────────────────── */}

      <BottomSheet
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title={`Device #${device.id}`}
      >
        <DeviceSettings
          device={device}
          onClose={() => setSettingsOpen(false)}
        />
      </BottomSheet>

      {features.hasEnergyLevel && (
        <BottomSheet
          visible={energyLevelOpen}
          onClose={() => setEnergyLevelOpen(false)}
          title="Energy Level"
        >
          <EnergyLevel
            device={device}
            onClose={() => setEnergyLevelOpen(false)}
          />
        </BottomSheet>
      )}

      {features.hasColorPalette && (
        <BottomSheet
          visible={colorPickerOpen}
          onClose={() => setColorPickerOpen(false)}
          title="Color"
        >
          <ColorPicker
            device={device}
            onClose={() => setColorPickerOpen(false)}
          />
        </BottomSheet>
      )}

      {features.hasVolume && (
        <BottomSheet
          visible={soundProfileOpen}
          onClose={() => setSoundProfileOpen(false)}
          title="Sound Profile"
        >
          <SoundProfile
            device={device}
            onClose={() => setSoundProfileOpen(false)}
          />
        </BottomSheet>
      )}

      {features.hasProPanel && (
        <BottomSheet
          visible={proPanelOpen}
          onClose={() => setProPanelOpen(false)}
          title="ProPanel"
        >
          <ProPanel
            device={device}
            onClose={() => setProPanelOpen(false)}
          />
        </BottomSheet>
      )}

      {features.hasBeatPad && beatPadOpen && (
        <BeatPad onClose={() => setBeatPadOpen(false)} />
      )}
    </>
  )
}

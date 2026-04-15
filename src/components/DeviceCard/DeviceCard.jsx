import { useState } from 'react'
import styles from './DeviceCard.module.css'
import { useDevices } from '../../context/DeviceContext'
import { PRODUCT_FEATURES } from '../../data/productFeatures'
import HeroArea from '../HeroArea/HeroArea'
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

  // Build action grid purely from feature flags — no per-product hardcoding
  const actionButtons = [
    {
      id: 'turnoff',
      icon: <PowerIcon />,
      label: 'Turn off',
      onPress: () => confirm(`Turn off ${device.name}?`),
    },
    {
      id: 'teamup',
      icon: <TeamUpIcon />,
      label: 'TeamUp',
      onPress: () => alert('TeamUp — coming soon'),
    },
    features.hasEnergyLevel
      ? {
          id: 'energy',
          icon: <SparkleIcon />,
          label: device.energyLevel || 'Energy',
          onPress: () => setEnergyLevelOpen(true),
        }
      : {
          id: 'soundprofile',
          icon: <SoundProfileIcon />,
          label: device.soundProfile || 'Profile',
          onPress: () => setSoundProfileOpen(true),
        },
  ]

  if (features.hasColorPalette) {
    actionButtons.push({
      id: 'color',
      icon: <ColorIcon />,
      label: 'Color',
      onPress: () => setColorPickerOpen(true),
    })
  }

  if (features.hasProPanel) {
    actionButtons.push({
      id: 'propanel',
      icon: <ProPanelIcon />,
      label: 'ProPanel',
      onPress: () => setProPanelOpen(true),
    })
  }

  // BeatPad added as 5th button for Lightboks (designer's call: keep Color + add BeatPad)
  if (features.hasBeatPad) {
    actionButtons.push({
      id: 'beatpad',
      icon: <SparkleIcon />,
      label: 'BeatPad',
      onPress: () => setBeatPadOpen(true),
    })
  }

  return (
    <>
      <div className={styles.card}>
        {/* 1. InfoRow */}
        <div className={styles.infoRow}>
          <div className={styles.productIcon}>
            {features.hasColorPalette ? <LightboksProductIcon /> : <SpeakerProductIcon />}
          </div>
          <div className={styles.deviceInfo}>
            <span className={styles.deviceName}>{device.name}</span>
            <span className={styles.deviceId}>#{device.id}</span>
          </div>
          <button
            className={styles.overflowBtn}
            onClick={() => setSettingsOpen(true)}
            aria-label="Device settings"
          >
            <OverflowIcon />
          </button>
        </div>

        {/* 2. TeamRoleRow — role pill + product-specific status indicators */}
        {features.hasTeamUpRole && (
          <div className={styles.teamRoleRow}>
            <CircularArrowsIcon />
            <TeamRolePill role={device.teamRole} />

            {/* Speaker status: BT · SKAA · AUX · Ch1 · Ch2 · Stereo role */}
            {features.hasVolume && (
              <>
                <div className={styles.rowSep} />
                <div className={styles.statusGroup}>
                  {/* BT status */}
                  <span className={styles.statusIcon}>
                    {device.btConnected ? <BtOnIcon /> : <BtOffIcon />}
                  </span>
                  {/* SKAA / wireless */}
                  {device.skaaConnected && (
                    <span className={styles.statusIcon}><SkaaIcon /></span>
                  )}
                  {/* Input channel indicators */}
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
                {/* Stereo role letter */}
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

            {/* Lightboks: energy level sparkle indicator */}
            {features.hasBrightness && (
              <>
                <div className={styles.rowSep} />
                <span className={styles.energyIndicator}><SparkleIcon /></span>
              </>
            )}
          </div>
        )}

        {/* 3. HeroArea */}
        <HeroArea
          device={device}
          features={features}
          onLevelChange={handleLevelChange}
        />

        {/* 4. ActionGrid */}
        <div className={styles.actionGrid}>
          {actionButtons.map(btn => (
            <ActionButton
              key={btn.id}
              icon={btn.icon}
              label={btn.label}
              onPress={btn.onPress}
            />
          ))}
        </div>

        {/* 5. FirmwareBanner */}
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

      {!features.hasEnergyLevel && (
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

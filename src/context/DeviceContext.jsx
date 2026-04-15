import { createContext, useContext, useState } from 'react'
import { mockDevices } from '../data/devices'

const DeviceContext = createContext(null)

export function DeviceProvider({ children }) {
  const [devices, setDevices] = useState(mockDevices)

  function updateDevice(id, patch) {
    setDevices(prev =>
      prev.map(d => d.id === id ? { ...d, ...patch } : d)
    )
  }

  return (
    <DeviceContext.Provider value={{ devices, updateDevice }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevices() {
  return useContext(DeviceContext)
}

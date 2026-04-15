import { DeviceProvider } from './context/DeviceContext'
import DevicesScreen from './screens/DevicesScreen/DevicesScreen'
import BottomNav from './components/BottomNav/BottomNav'

export default function App() {
  return (
    <DeviceProvider>
      <DevicesScreen />
      <BottomNav activeTab="devices" />
    </DeviceProvider>
  )
}

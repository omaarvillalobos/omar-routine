import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import HistorialScreen from './screens/HistorialScreen'
import PlanScreen from './screens/PlanScreen'
import NotasScreen from './screens/NotasScreen'
import TabBar from './components/TabBar'

export default function App() {
  const [activeTab, setActiveTab] = useState('hoy')

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      maxWidth: '430px',
      margin: '0 auto',
      backgroundColor: '#0A0A0A',
      position: 'relative',
    }}>
      {/* Contenido principal scrolleable */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: '72px',
      }}>
        {activeTab === 'hoy' && <HomeScreen />}
        {activeTab === 'historial' && <HistorialScreen />}
        {activeTab === 'plan' && <PlanScreen />}
        {activeTab === 'notas' && <NotasScreen />}
      </div>

      {/* Tab bar fijo abajo */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

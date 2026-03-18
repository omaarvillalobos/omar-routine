import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import HistorialScreen from './screens/HistorialScreen'
import PlanScreen from './screens/PlanScreen'
import NotasScreen from './screens/NotasScreen'
import TabBar from './components/TabBar'

export default function App() {
  const [activeTab, setActiveTab] = useState('hoy')
  const [tabVersion, setTabVersion] = useState(0)

  function handleTabChange(tab) {
    setActiveTab(tab)
    setTabVersion(v => v + 1)
  }

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
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: '72px',
      }}>
        {activeTab === 'hoy' && <HomeScreen key={`hoy-${tabVersion}`} />}
        {activeTab === 'historial' && <HistorialScreen key={`historial-${tabVersion}`} />}
        {activeTab === 'plan' && <PlanScreen key={`plan-${tabVersion}`} />}
        {activeTab === 'notas' && <NotasScreen key={`notas-${tabVersion}`} />}
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

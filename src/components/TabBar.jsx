const tabs = [
  {
    id: 'hoy',
    label: 'Hoy',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#00D97E' : '#555555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 'historial',
    label: 'Historial',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#00D97E' : '#555555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#00D97E' : '#555555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: 'notas',
    label: 'Notas',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#00D97E' : '#555555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
]

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: '#111111',
      borderTop: '1px solid #2A2A2A',
      display: 'flex',
      zIndex: 100,
    }}>
      {tabs.map((tab) => {
        const active = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 0 14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? '#00D97E' : '#555555',
              fontSize: '11px',
              fontWeight: active ? '600' : '400',
              fontFamily: 'Inter, system-ui, sans-serif',
              transition: 'color 0.15s',
            }}
          >
            {tab.icon(active)}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

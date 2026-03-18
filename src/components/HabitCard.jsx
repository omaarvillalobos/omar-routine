export default function HabitCard({ nombre, estado, onToggle }) {
  // estado: true = cumplido, false = fallado, null = sin marcar
  const cumplido = estado === true
  const fallado = estado === false

  const bgColor = cumplido ? '#0A1F15' : fallado ? '#1F0A0A' : '#111111'
  const borderColor = cumplido ? '#00D97E33' : fallado ? '#FF4D4D33' : '#2A2A2A'

  return (
    <div style={{
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '16px',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px',
      transition: 'all 0.2s',
    }}>
      <span style={{
        fontSize: '15px',
        fontWeight: '500',
        color: cumplido ? '#F0F0F0' : fallado ? '#888888' : '#F0F0F0',
        textDecoration: fallado ? 'line-through' : 'none',
        flex: 1,
      }}>
        {nombre}
      </span>

      <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
        {/* Check */}
        <button
          onClick={() => onToggle(cumplido ? null : true)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: cumplido ? 'none' : '1px solid #2A2A2A',
            backgroundColor: cumplido ? '#00D97E' : '#1A1A1A',
            color: cumplido ? '#000000' : '#555555',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
            fontFamily: 'system-ui',
          }}
        >
          ✓
        </button>

        {/* X */}
        <button
          onClick={() => onToggle(fallado ? null : false)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: fallado ? 'none' : '1px solid #2A2A2A',
            backgroundColor: fallado ? '#FF4D4D' : '#1A1A1A',
            color: fallado ? '#000000' : '#555555',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
            fontFamily: 'system-ui',
          }}
        >
          ✗
        </button>
      </div>
    </div>
  )
}

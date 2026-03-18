export default function CigarroHabit({ estado, racha, onToggle }) {
  // estado: true = cumplido, false = fallado, null = sin marcar
  const cumplido = estado === true
  const fallado = estado === false

  const borderColor = cumplido ? '#00D97E' : fallado ? '#FF4D4D' : '#2A2A2A'
  const bgColor = cumplido ? '#0A1F15' : fallado ? '#1F0A0A' : '#1A1A1A'

  return (
    <div style={{
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderLeft: `3px solid ${borderColor}`,
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '8px',
      transition: 'all 0.2s',
    }}>
      {/* Label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
      }}>
        <span style={{ fontSize: '14px', color: '#888888', fontWeight: '500' }}>
          HABITO PRINCIPAL
        </span>
      </div>

      {/* Titulo y racha */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#F0F0F0',
          marginBottom: '6px',
        }}>
          Sin cigarro / vape
        </h2>
        <span style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#00D97E',
          lineHeight: 1,
        }}>
          {racha} {racha === 1 ? 'día' : 'días'} sin fumar
        </span>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onToggle(true)}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '12px',
            border: cumplido ? '1px solid #00D97E' : '1px solid #2A2A2A',
            backgroundColor: cumplido ? '#00D97E' : '#111111',
            color: cumplido ? '#000000' : '#888888',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Inter, system-ui, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          Lo cumplí
        </button>
        <button
          onClick={() => onToggle(false)}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '12px',
            border: fallado ? '1px solid #FF4D4D' : '1px solid #2A2A2A',
            backgroundColor: fallado ? '#FF4D4D' : '#111111',
            color: fallado ? '#000000' : '#888888',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Inter, system-ui, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          Fallé hoy
        </button>
      </div>
    </div>
  )
}

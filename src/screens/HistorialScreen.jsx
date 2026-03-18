const dias = [
  { fecha: '2026-03-17', cigarro: true, cumplidos: 4, total: 5 },
  { fecha: '2026-03-16', cigarro: true, cumplidos: 5, total: 5 },
  { fecha: '2026-03-15', cigarro: true, cumplidos: 3, total: 5 },
  { fecha: '2026-03-14', cigarro: false, cumplidos: 2, total: 5 },
  { fecha: '2026-03-13', cigarro: true, cumplidos: 5, total: 5 },
  { fecha: '2026-03-12', cigarro: true, cumplidos: 4, total: 5 },
]

function formatFecha(str) {
  const d = new Date(str + 'T00:00:00')
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`
}

export default function HistorialScreen() {
  return (
    <div style={{ padding: '24px 16px 8px', backgroundColor: '#0A0A0A', minHeight: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '600', color: '#F0F0F0', marginBottom: '4px' }}>
          Historial
        </h1>
        <span style={{ fontSize: '13px', color: '#888888' }}>Últimos 30 días</span>
      </div>

      {/* Racha */}
      <div style={{
        backgroundColor: '#111111',
        border: '1px solid #2A2A2A',
        borderLeft: '3px solid #00D97E',
        borderRadius: '16px',
        padding: '16px 20px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '14px', color: '#888888' }}>Racha sin fumar</span>
        <span style={{ fontSize: '24px', fontWeight: '600', color: '#00D97E' }}>4 días</span>
      </div>

      {/* Lista de días */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {dias.map(d => {
          const pct = Math.round((d.cumplidos / d.total) * 100)
          return (
            <div key={d.fecha} style={{
              backgroundColor: '#111111',
              border: '1px solid #2A2A2A',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              {/* Cigarro indicator */}
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: d.cigarro ? '#00D97E' : '#FF4D4D',
                flexShrink: 0,
              }} />

              {/* Fecha */}
              <span style={{ fontSize: '14px', color: '#F0F0F0', fontWeight: '500', flex: 1 }}>
                {formatFecha(d.fecha)}
              </span>

              {/* Hábitos */}
              <span style={{ fontSize: '13px', color: '#888888' }}>
                {d.cumplidos}/{d.total}
              </span>

              {/* % */}
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: pct === 100 ? '#00D97E' : '#888888',
                minWidth: '36px',
                textAlign: 'right',
              }}>
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

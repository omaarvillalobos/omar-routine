import { useState, useEffect } from 'react'
import { getNotas } from '../hooks/useHabits'

function formatFecha(str) {
  const d = new Date(str + 'T00:00:00')
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`
}

export default function NotasScreen() {
  const [notas, setNotas] = useState([])

  useEffect(() => {
    setNotas(getNotas())
  }, [])

  return (
    <div style={{ padding: '24px 16px 8px', backgroundColor: '#0A0A0A', minHeight: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '600', color: '#F0F0F0', marginBottom: '4px' }}>
          Notas
        </h1>
        <span style={{ fontSize: '13px', color: '#888888' }}>Registro diario</span>
      </div>

      {notas.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 16px',
          color: '#555555',
          fontSize: '14px',
        }}>
          Todavía no hay notas.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notas.map((n, i) => (
            <div key={i} style={{
              backgroundColor: '#111111',
              border: '1px solid #2A2A2A',
              borderRadius: '16px',
              padding: '16px',
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#555555',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {formatFecha(n.fecha)}
              </div>
              <p style={{
                fontSize: '14px',
                color: '#F0F0F0',
                lineHeight: '1.6',
              }}>
                {n.texto}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

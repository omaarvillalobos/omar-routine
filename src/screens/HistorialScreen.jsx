import { useState, useEffect } from 'react'
import { getHistorial, getCigarroStreak } from '../hooks/useHabits'
import { exportarExcel } from '../hooks/exportExcel'

const TOTAL_HABITOS = 5

function formatFecha(str) {
  const d = new Date(str + 'T00:00:00')
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`
}

function IconoExport() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

export default function HistorialScreen() {
  const [dias, setDias] = useState([])
  const [racha, setRacha] = useState(0)
  const [expandido, setExpandido] = useState(null)

  useEffect(() => {
    setDias(getHistorial(30))
    setRacha(getCigarroStreak())
  }, [])

  function handleExport() {
    exportarExcel()
  }

  return (
    <div style={{ padding: '24px 16px 8px', backgroundColor: '#0A0A0A', minHeight: '100%' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '600', color: '#F0F0F0', marginBottom: '4px' }}>
            Historial
          </h1>
          <span style={{ fontSize: '13px', color: '#888888' }}>Últimos 30 días</span>
        </div>

        {/* Botón exportar */}
        <button
          onClick={handleExport}
          disabled={dias.length === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: dias.length === 0 ? '#1A1A1A' : '#111111',
            border: '1px solid #2A2A2A',
            borderRadius: '10px',
            color: dias.length === 0 ? '#444444' : '#F0F0F0',
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: 'Inter, system-ui, sans-serif',
            cursor: dias.length === 0 ? 'not-allowed' : 'pointer',
            marginTop: '4px',
          }}
        >
          <IconoExport />
          Excel
        </button>
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
        <span style={{ fontSize: '24px', fontWeight: '600', color: '#00D97E' }}>
          {racha} {racha === 1 ? 'día' : 'días'}
        </span>
      </div>

      {/* Lista de días */}
      {dias.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 16px',
          color: '#555555',
          fontSize: '14px',
        }}>
          Todavía no hay entradas. Guarda tu primer día.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {dias.map(d => {
            const habits = d.habits || {}
            const cumplidos = Object.values(habits).filter(v => v === true).length
            const pct = Math.round((cumplidos / TOTAL_HABITOS) * 100)
            const cigarro = habits.cigarro
            const tieneNota = d.note && d.note.trim().length > 0
            const abierto = expandido === d.fecha

            return (
              <div
                key={d.fecha}
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid #2A2A2A',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: tieneNota ? 'pointer' : 'default',
                }}
                onClick={() => tieneNota && setExpandido(abierto ? null : d.fecha)}
              >
                {/* Fila principal */}
                <div style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  {/* Punto cigarro */}
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: cigarro === true ? '#00D97E' : cigarro === false ? '#FF4D4D' : '#555555',
                    flexShrink: 0,
                  }} />

                  {/* Fecha */}
                  <span style={{ fontSize: '14px', color: '#F0F0F0', fontWeight: '500', flex: 1 }}>
                    {formatFecha(d.fecha)}
                  </span>

                  {/* Indicador de nota */}
                  {tieneNota && (
                    <span style={{
                      fontSize: '11px',
                      color: abierto ? '#00D97E' : '#444444',
                      transition: 'color 0.15s',
                    }}>
                      nota {abierto ? '▲' : '▼'}
                    </span>
                  )}

                  {/* Hábitos */}
                  <span style={{ fontSize: '13px', color: '#888888' }}>
                    {cumplidos}/{TOTAL_HABITOS}
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

                {/* Nota expandida */}
                {tieneNota && abierto && (
                  <div style={{
                    padding: '0 16px 14px 36px',
                    borderTop: '1px solid #1A1A1A',
                    paddingTop: '12px',
                  }}>
                    <p style={{
                      fontSize: '13px',
                      color: '#888888',
                      lineHeight: '1.6',
                      fontStyle: 'italic',
                    }}>
                      "{d.note}"
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

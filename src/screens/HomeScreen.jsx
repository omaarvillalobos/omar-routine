import { useState } from 'react'
import CigarroHabit from '../components/CigarroHabit'
import HabitCard from '../components/HabitCard'

// Datos hardcodeados para ver el diseño
const HABITOS_FASE_1 = [
  { id: 'alarma', nombre: 'Alarma 7:40, sin snooze' },
  { id: 'cama', nombre: 'Hacer la cama' },
  { id: 'ejercicio', nombre: 'Entrenar' },
  { id: 'pantallas', nombre: 'Sin pantallas 30 min antes de dormir' },
]

function getFechaHoy() {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const hoy = new Date()
  return `${dias[hoy.getDay()]} ${hoy.getDate()} de ${meses[hoy.getMonth()]}`
}

export default function HomeScreen() {
  const [cigarroEstado, setCigarroEstado] = useState(null)
  const [habitos, setHabitos] = useState({
    alarma: null,
    cama: null,
    ejercicio: null,
    pantallas: null,
  })
  const [nota, setNota] = useState('')
  const [guardado, setGuardado] = useState(false)

  const rachaSimulada = 4

  function toggleHabito(id, valor) {
    setHabitos(prev => ({ ...prev, [id]: valor }))
    setGuardado(false)
  }

  // Conteo de hábitos completados (cigarro incluido)
  const totalHabitos = HABITOS_FASE_1.length + 1
  const cumplidos = [cigarroEstado === true, ...HABITOS_FASE_1.map(h => habitos[h.id] === true)].filter(Boolean).length
  const progresoPct = Math.round((cumplidos / totalHabitos) * 100)
  const todosCompletos = cumplidos === totalHabitos

  function handleGuardar() {
    setGuardado(true)
  }

  return (
    <div style={{ padding: '24px 16px 8px', backgroundColor: '#0A0A0A', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '600',
          color: '#F0F0F0',
          lineHeight: 1.2,
          marginBottom: '4px',
        }}>
          {getFechaHoy()}
        </h1>
        <span style={{ fontSize: '13px', color: '#888888', fontWeight: '500' }}>
          Fase 1 · Semana 1
        </span>
      </div>

      {/* Habito principal: Cigarro */}
      <CigarroHabit
        estado={cigarroEstado}
        racha={rachaSimulada}
        onToggle={(val) => { setCigarroEstado(val); setGuardado(false) }}
      />

      {/* Separador */}
      <div style={{
        fontSize: '11px',
        fontWeight: '600',
        color: '#555555',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '8px',
        marginTop: '16px',
      }}>
        Hábitos del día
      </div>

      {/* Lista de hábitos */}
      {HABITOS_FASE_1.map(h => (
        <HabitCard
          key={h.id}
          nombre={h.nombre}
          estado={habitos[h.id]}
          onToggle={(val) => toggleHabito(h.id, val)}
        />
      ))}

      {/* Progress bar */}
      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <span style={{ fontSize: '13px', color: '#888888' }}>
            {cumplidos} de {totalHabitos} hábitos hoy
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: '600',
            color: todosCompletos ? '#00D97E' : '#888888',
          }}>
            {progresoPct}%
          </span>
        </div>
        <div style={{
          height: '4px',
          backgroundColor: '#1A1A1A',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progresoPct}%`,
            backgroundColor: todosCompletos ? '#00D97E' : '#00D97E88',
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* Celebración */}
        {todosCompletos && (
          <div style={{
            marginTop: '12px',
            padding: '12px 16px',
            backgroundColor: '#0A1F15',
            border: '1px solid #00D97E33',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
            color: '#00D97E',
          }}>
            Dia completo. Bien hecho.
          </div>
        )}
      </div>

      {/* Nota del dia */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '11px',
          fontWeight: '600',
          color: '#555555',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          Nota del día
        </label>
        <textarea
          value={nota}
          onChange={e => { setNota(e.target.value.slice(0, 300)); setGuardado(false) }}
          placeholder="¿Cómo fue el día?"
          rows={3}
          style={{
            width: '100%',
            backgroundColor: '#111111',
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
            padding: '12px 14px',
            color: '#F0F0F0',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            resize: 'none',
            outline: 'none',
            lineHeight: '1.5',
          }}
          onFocus={e => e.target.style.borderColor = '#00D97E44'}
          onBlur={e => e.target.style.borderColor = '#2A2A2A'}
        />
        <div style={{
          textAlign: 'right',
          fontSize: '11px',
          color: '#555555',
          marginTop: '4px',
        }}>
          {nota.length}/300
        </div>
      </div>

      {/* Botón guardar */}
      <button
        onClick={handleGuardar}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: guardado ? '#1A1A1A' : '#00D97E',
          color: guardado ? '#888888' : '#000000',
          border: guardado ? '1px solid #2A2A2A' : 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: '600',
          fontFamily: 'Inter, system-ui, sans-serif',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: '8px',
        }}
      >
        {guardado ? 'Guardado' : 'Guardar día'}
      </button>

    </div>
  )
}

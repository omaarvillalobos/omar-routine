const fases = [
  {
    id: 1,
    label: 'Fase 1',
    rango: '19 mar – 1 abr',
    semanas: 'Semanas 1-2',
    activa: true,
    completada: false,
    habitos: [
      'Sin cigarro / vape',
      'Alarma 7:40, sin snooze',
      'Hacer la cama',
      'Entrenar (4x semana)',
      'Sin pantallas 30 min antes de dormir',
    ],
  },
  {
    id: 2,
    label: 'Fase 2',
    rango: '2 abr – 22 abr',
    semanas: 'Semanas 3-5',
    activa: false,
    completada: false,
    habitos: [
      'Rutina de mañana fija completada',
      'Bloque de trabajo/escuela 90 min',
      'Entrenar 5x semana',
      'Definir y trabajar UNA fuente de ingreso',
    ],
  },
  {
    id: 3,
    label: 'Fase 3',
    rango: '23 abr – 20 may',
    semanas: 'Semanas 6-9',
    activa: false,
    completada: false,
    habitos: [
      'Bulk serio (calorías + proteína)',
      'Primera venta / ingreso real registrado',
      'Cocinar al menos 1 vez',
    ],
  },
  {
    id: 4,
    label: 'Fase 4',
    rango: '21 may – 19 jun',
    semanas: 'Semanas 10-13',
    activa: false,
    completada: false,
    habitos: [
      'Sistema de ingresos documentado',
      'Plan concreto para Monterrey',
      'Reflexión escrita de los 3 meses',
    ],
  },
]

export default function PlanScreen() {
  return (
    <div style={{ padding: '24px 16px 8px', backgroundColor: '#0A0A0A', minHeight: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '600', color: '#F0F0F0', marginBottom: '4px' }}>
          Plan 3 meses
        </h1>
        <span style={{ fontSize: '13px', color: '#888888' }}>19 mar – 19 jun 2026</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {fases.map((fase) => {
          const borderColor = fase.activa ? '#00D97E' : fase.completada ? '#00D97E44' : '#2A2A2A'
          const bgColor = fase.activa ? '#0A1F15' : '#111111'

          return (
            <div key={fase.id} style={{
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              borderLeft: fase.activa ? '3px solid #00D97E' : '1px solid #2A2A2A',
              borderRadius: '16px',
              padding: '16px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: fase.activa ? '14px' : '0',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: fase.activa ? '#F0F0F0' : '#555555',
                    }}>
                      {fase.label}
                    </span>
                    {fase.activa && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: '#00D97E',
                        color: '#000',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        letterSpacing: '0.05em',
                      }}>
                        ACTIVA
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '12px', color: '#555555' }}>
                    {fase.rango} · {fase.semanas}
                  </span>
                </div>
              </div>

              {fase.activa && (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {fase.habitos.map((h, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#F0F0F0',
                    }}>
                      <span style={{ color: '#00D97E', fontSize: '10px' }}>●</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {!fase.activa && (
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#444444' }}>
                    +{fase.habitos.length} hábitos nuevos
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

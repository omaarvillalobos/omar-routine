import * as XLSX from 'xlsx'
import { getAllData } from './useHabits'

const HABITOS_LABELS = {
  cigarro: 'Sin cigarro/vape',
  alarma: 'Alarma 7:40',
  cama: 'Hacer la cama',
  ejercicio: 'Entrenar',
  pantallas: 'Sin pantallas 30min',
}

function val(v) {
  if (v === true) return '✓'
  if (v === false) return '✗'
  return '-'
}

function valNum(v) {
  if (v === true) return 1
  if (v === false) return 0
  return null
}

export function exportarExcel() {
  const all = getAllData()
  const dias = Object.entries(all)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fecha, data]) => ({ fecha, habits: data.habits || {}, note: data.note || '' }))

  const wb = XLSX.utils.book_new()

  // ── SHEET 1: Resumen ──────────────────────────────────────────────────────
  const totalDias = dias.length
  const diasConCigarro = dias.filter(d => d.habits.cigarro === true).length
  const diasSinCigarro = dias.filter(d => d.habits.cigarro === false).length

  const cumplimientosPorHabito = Object.keys(HABITOS_LABELS).map(id => {
    const cumplidos = dias.filter(d => d.habits[id] === true).length
    const marcados = dias.filter(d => d.habits[id] !== null && d.habits[id] !== undefined).length
    const pct = marcados > 0 ? Math.round((cumplidos / marcados) * 100) : 0
    return { habito: HABITOS_LABELS[id], cumplidos, marcados, pct: `${pct}%` }
  })

  // Calcular racha máxima de cigarro
  let rachaMax = 0
  let rachaActual = 0
  for (const d of dias) {
    if (d.habits.cigarro === true) {
      rachaActual++
      rachaMax = Math.max(rachaMax, rachaActual)
    } else {
      rachaActual = 0
    }
  }

  const resumenData = [
    ['RESUMEN GENERAL', ''],
    ['', ''],
    ['Días registrados', totalDias],
    ['Días sin fumar', diasConCigarro],
    ['Días que fumó', diasSinCigarro],
    ['Racha máxima sin fumar', `${rachaMax} días`],
    ['', ''],
    ['CUMPLIMIENTO POR HÁBITO', '', '', ''],
    ['Hábito', 'Días cumplidos', 'Días marcados', '% Cumplimiento'],
    ...cumplimientosPorHabito.map(h => [h.habito, h.cumplidos, h.marcados, h.pct]),
  ]

  const wsResumen = XLSX.utils.aoa_to_sheet(resumenData)
  wsResumen['!cols'] = [{ wch: 28 }, { wch: 16 }, { wch: 16 }, { wch: 18 }]
  XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen')

  // ── SHEET 2: Historial diario ─────────────────────────────────────────────
  const headers = [
    'Fecha',
    'Sin cigarro',
    'Alarma 7:40',
    'Hacer la cama',
    'Entrenar',
    'Sin pantallas',
    'Total cumplidos',
    '% del día',
    'Nota',
  ]

  const rows = dias.map(d => {
    const ids = ['cigarro', 'alarma', 'cama', 'ejercicio', 'pantallas']
    const cumplidos = ids.filter(id => d.habits[id] === true).length
    const pct = Math.round((cumplidos / ids.length) * 100)
    return [
      d.fecha,
      val(d.habits.cigarro),
      val(d.habits.alarma),
      val(d.habits.cama),
      val(d.habits.ejercicio),
      val(d.habits.pantallas),
      cumplidos,
      `${pct}%`,
      d.note,
    ]
  })

  const wsHistorial = XLSX.utils.aoa_to_sheet([headers, ...rows])
  wsHistorial['!cols'] = [
    { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 14 },
    { wch: 10 }, { wch: 16 }, { wch: 15 }, { wch: 10 }, { wch: 40 },
  ]
  XLSX.utils.book_append_sheet(wb, wsHistorial, 'Historial diario')

  // ── SHEET 3: Datos para gráficas ──────────────────────────────────────────
  const grafHeaders = [
    'Fecha',
    'Cigarro (1=sí/0=no)',
    'Alarma',
    'Cama',
    'Ejercicio',
    'Pantallas',
    'Hábitos cumplidos',
  ]

  const grafRows = dias.map(d => {
    const ids = ['cigarro', 'alarma', 'cama', 'ejercicio', 'pantallas']
    const cumplidos = ids.filter(id => d.habits[id] === true).length
    return [
      d.fecha,
      valNum(d.habits.cigarro),
      valNum(d.habits.alarma),
      valNum(d.habits.cama),
      valNum(d.habits.ejercicio),
      valNum(d.habits.pantallas),
      cumplidos,
    ]
  })

  const wsGraf = XLSX.utils.aoa_to_sheet([grafHeaders, ...grafRows])
  wsGraf['!cols'] = [
    { wch: 12 }, { wch: 20 }, { wch: 10 }, { wch: 10 },
    { wch: 12 }, { wch: 12 }, { wch: 18 },
  ]
  XLSX.utils.book_append_sheet(wb, wsGraf, 'Datos para graficas')

  // ── SHEET 4: Notas ────────────────────────────────────────────────────────
  const notasDias = dias.filter(d => d.note.trim().length > 0)
  const wsNotas = XLSX.utils.aoa_to_sheet([
    ['Fecha', 'Nota'],
    ...notasDias.map(d => [d.fecha, d.note]),
  ])
  wsNotas['!cols'] = [{ wch: 12 }, { wch: 60 }]
  XLSX.utils.book_append_sheet(wb, wsNotas, 'Notas')

  // Descargar
  const fecha = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(wb, `omar-habitos-${fecha}.xlsx`)
}

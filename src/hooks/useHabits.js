const STORAGE_KEY = 'omar-habitos-v1'

export function getTodayKey() {
  const hoy = new Date()
  const y = hoy.getFullYear()
  const m = String(hoy.getMonth() + 1).padStart(2, '0')
  const d = String(hoy.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getAllData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function getDayData(dateKey) {
  const all = getAllData()
  return all[dateKey] || { habits: {}, note: '' }
}

export function saveDay(dateKey, habits, note) {
  const all = getAllData()
  all[dateKey] = { habits, note }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

// Calcula racha de cigarro desde hoy hacia atrás
export function getCigarroStreak() {
  const all = getAllData()
  let streak = 0
  const hoy = new Date()

  for (let i = 0; i < 365; i++) {
    const d = new Date(hoy)
    d.setDate(hoy.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const day = all[key]

    if (!day || day.habits.cigarro !== true) break
    streak++
  }

  return streak
}

// Retorna los últimos N días que tienen datos registrados
export function getHistorial(limit = 30) {
  const all = getAllData()
  return Object.entries(all)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, limit)
    .map(([fecha, data]) => ({ fecha, ...data }))
}

// Retorna las notas con texto
export function getNotas() {
  const all = getAllData()
  return Object.entries(all)
    .filter(([, data]) => data.note && data.note.trim().length > 0)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([fecha, data]) => ({ fecha, texto: data.note }))
}

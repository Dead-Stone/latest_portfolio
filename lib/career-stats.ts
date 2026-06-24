import { experiences } from '@/data/experiences'

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

function parsePeriodStart(period: string): Date | null {
  const match = period.trim().match(/^([A-Za-z]+)?\s*(\d{4})/)
  if (!match) return null

  const year = Number(match[2])
  const monthKey = match[1]?.slice(0, 3).toLowerCase()
  const month = monthKey ? (MONTH_INDEX[monthKey] ?? 0) : 0

  return new Date(year, month, 1)
}

function careerExperiences() {
  return experiences.filter(exp => !exp.excludeFromCareerStats)
}

export function getCareerYearsLabel(): string {
  const starts = careerExperiences()
    .map(exp => parsePeriodStart(exp.period))
    .filter((date): date is Date => date !== null)

  if (starts.length === 0) return '0+'

  const earliest = new Date(Math.min(...starts.map(date => date.getTime())))
  const now = new Date()
  const totalMonths =
    (now.getFullYear() - earliest.getFullYear()) * 12 + (now.getMonth() - earliest.getMonth())

  return `${Math.max(1, Math.floor(totalMonths / 12))}+`
}

export function getCompanyCountLabel(): string {
  return `${careerExperiences().length}+`
}

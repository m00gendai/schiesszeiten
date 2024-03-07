interface ShootingDays{
    items: ShootingDay[]
    totalItems: number
}

interface ShootingDay{
  disciplineId: string
  disciplineShortNameGerman: string
  disciplineShortNameFrench: string
  disciplineShortNameItalian: string
  disciplineLongNameGerman: string
  disciplineLongNameFrench: string
  disciplineLongNameItalian: string
  from: string
  to: string
  type: number
  firingRangeId: string
  firingRangeName: string
  event: string
  location: string,
  combinedLocationString: string
  coordinates: string
  canton: string
  year: number
  organizationId: string
  organizationName: string
  id: string
}

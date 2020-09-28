import { DateType } from '@/store/Calendar/types'

export function findDescription(dateStr: string, dates: Array<DateType>): string {
  const element: DateType | undefined = dates.find((a) => a.dateStr === dateStr)
  const description: string = element ? element.description : ''

  return description
}

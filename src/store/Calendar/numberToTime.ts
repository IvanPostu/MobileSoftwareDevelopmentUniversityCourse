export function numberToTime(num: number): string {
  return num > 9 ? String(num) : '0' + String(num)
}

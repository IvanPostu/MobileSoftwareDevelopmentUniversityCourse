/* eslint-disable @typescript-eslint/no-explicit-any */
export function arrayToObject(array: any): any {
  let index = 0
  const result = array.reduce((result: any, element: any) => {
    result[`a${index++}`] = element
    return result
  }, {} as any)

  return result
}

export function objectToArray(object: any): any {
  const resultArray = [] as any

  Object.keys(object).forEach((key) => resultArray.push(object[key]))

  return resultArray
}

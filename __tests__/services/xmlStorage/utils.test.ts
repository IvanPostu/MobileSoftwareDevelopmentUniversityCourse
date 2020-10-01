/**
 * @jest-environment jsdom
 */
import { arrayToObject, objectToArray } from '@/services/xmlStorage/utils'

describe('Test util functions for xml storage service', function () {
  test('arrayToObject and objectToArray test case', () => {
    const arrExample = [
      {
        name: 'Dodo',
        age: 22,
      },
      {
        name: 'Rick',
        age: 33,
      },
      {
        name: 'Vasya',
        age: 333,
      },
    ]

    const obj = arrayToObject(arrExample)
    const resultObj = {
      a0: { name: 'Dodo', age: 22 },
      a1: { name: 'Rick', age: 33 },
      a2: { name: 'Vasya', age: 333 },
    }

    expect(obj).toEqual(resultObj)

    const newArr = objectToArray(resultObj)

    expect(newArr).toEqual(arrExample)
  })
})

import { DateType } from '@/store/Calendar/types'
import RNFS from 'react-native-fs'
import { logger } from 'react-native-logs'
const xml2js = require('react-native-xml2js')
import { arrayToObject } from './utils'

const log = logger.createLogger()
log.setSeverity('debug')

export async function saveArrayOfDatesIntoXMLFile(
  filenameWithoutExtension: string,
  arr: any,
): Promise<void> {
  const builder = new xml2js.Builder()
  const xml = builder.buildObject({ root: arrayToObject(arr) })
  const path = RNFS.ExternalDirectoryPath + `/${filenameWithoutExtension}.xml`
  try {
    RNFS.writeFile(path, xml, 'utf8')
    log['debug']('FILE WRITTEN!  ' + path)
  } catch (error) {
    log['warn'](error.message)
  }
}

export async function loadArrayOfDatesFromXMLFile(filenameWithoutExtension: string): Promise<any> {
  const path = RNFS.ExternalDirectoryPath + `/${filenameWithoutExtension}.xml`

  try {
    const xmlExists = await RNFS.exists(path)
    if (!xmlExists) throw Error('File not found')
  } catch (error) {
    throw Error('File not found')
  }

  try {
    const data = await RNFS.readFile(path, 'utf8')

    const obj: any = await new Promise((resolve, reject) => {
      xml2js.parseString(data, function (err: any, res: any) {
        !err ? resolve(res['root']) : reject(err)
      })
    })

    const result = [] as Array<DateType>
    Object.keys(obj).forEach((a) => {
      const date = obj[a][0]
      result.push({
        dateStr: date.dateStr[0] as string,
        description: date.description[0],
      })
    })

    // console.log(result)

    log['debug']('FILE WAS READ!  ' + path)
    return result
  } catch (error) {
    log['warn'](error.message)
  }
}

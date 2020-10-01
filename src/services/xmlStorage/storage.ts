import RNFS from 'react-native-fs'
import { logger } from 'react-native-logs'
const xml2js = require('react-native-xml2js')

const log = logger.createLogger()
log.setSeverity('debug')

export async function saveJsObjectIntoXMLFile(
  filenameWithoutExtension: string,
  obj: any,
): Promise<void> {
  const builder = new xml2js.Builder()
  const xml = builder.buildObject(obj)
  const path = RNFS.ExternalDirectoryPath + `/${filenameWithoutExtension}.xml`
  try {
    RNFS.writeFile(path, xml, 'utf8')
    log['debug']('FILE WRITTEN!  ' + path)
  } catch (error) {
    log['warn'](error.message)
  }
}

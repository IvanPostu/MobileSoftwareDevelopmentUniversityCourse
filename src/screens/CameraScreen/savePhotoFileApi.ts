import RNFS from 'react-native-fs'
import { logger } from 'react-native-logs'

const log = logger.createLogger()
log.setSeverity('debug')

export async function savePhotoFile(base64Data: string): Promise<void> {
  const randNum = Math.floor(Math.random() * 9999999)
  const path = RNFS.ExternalDirectoryPath + `/aaa${randNum}z.png`

  try {
    RNFS.writeFile(path, base64Data, 'base64')
    log['debug']('FILE WRITTEN!  ' + path)
  } catch (error) {
    log['warn'](error.message)
  }
}

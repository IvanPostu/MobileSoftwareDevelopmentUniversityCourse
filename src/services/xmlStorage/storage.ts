import RNFS from 'react-native-fs'
import { logger } from 'react-native-logs'
import xmlParser, { j2xParser as JSObjectToXMLParser } from 'fast-xml-parser'

const log = logger.createLogger()
log.setSeverity('debug')

type ResultType = {
  message: string
  success: boolean
}

export async function saveObjectIntoXMLFile<T>(
  filenameWithoutExtension: string,
  obj: T,
): Promise<ResultType> {
  const path = RNFS.ExternalDirectoryPath + `/${filenameWithoutExtension}.xml`
  const js2xmlParser = new JSObjectToXMLParser({})

  const objectForXML = {
    root: obj,
  }

  const xml = js2xmlParser.parse(objectForXML)

  try {
    RNFS.writeFile(path, xml, 'utf8')
    log['debug']('FILE WRITTEN!  ' + path)
  } catch (error) {
    return {
      message: 'Error pn write file!!!',
      success: false,
    }
  }

  return {
    message: 'File written with success!!!',
    success: true,
  }
}

export async function loadObjectFromXMLFile<T>(
  filenameWithoutExtension: string,
): Promise<ResultType | any> {
  const path = RNFS.ExternalDirectoryPath + `/${filenameWithoutExtension}.xml`

  try {
    const xmlExists = await RNFS.exists(path)
    if (!xmlExists)
      throw {
        message: 'File not found!!!',
        success: false,
      }
  } catch (error) {
    throw {
      message: 'File not found!!!',
      success: false,
    }
  }

  try {
    const xmlData = await RNFS.readFile(path, 'utf8')
    if (xmlParser.validate(xmlData) === true) {
      const jsonObj = xmlParser.parse(xmlData)
      return jsonObj.root
    } else {
      throw {
        message: 'Error on parse xml file!!!',
        success: false,
      }
    }
  } catch (e) {
    throw {
      message: 'Error on read file!!!',
      success: false,
    }
  }
}

// export async function loadArrayOfDatesFromXMLFile(filenameWithoutExtension: string): Promise<any> {
//   const path = RNFS.ExternalDirectoryPath + `/${filenameWithoutExtension}.xml`

//   try {
//     const xmlExists = await RNFS.exists(path)
//     if (!xmlExists) throw Error('File not found')
//   } catch (error) {
//     throw Error('File not found')
//   }

//   try {
//     const data = await RNFS.readFile(path, 'utf8')

//     const obj: any = await new Promise((resolve, reject) => {
//       xml2js.parseString(data, function (err: any, res: any) {
//         !err ? resolve(res['root']) : reject(err)
//       })
//     })

//     const result = [] as Array<DateType>
//     Object.keys(obj).forEach((a) => {
//       const date = obj[a][0]
//       result.push({
//         dateStr: date.dateStr[0] as string,
//         description: date.description[0],
//       })
//     })

//     // console.log(result)

//     log['debug']('FILE WAS READ!  ' + path)
//     return result
//   } catch (error) {
//     log['warn'](error.message)
//   }
// }

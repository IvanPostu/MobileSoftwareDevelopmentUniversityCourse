import { Dispatch } from 'redux'
import {
  calendarActionTypeConstants as T,
  AddDateActionType,
  RemoveDateActionType,
  SetSelectedDateActionType,
  FetchDatesFromXMLFileStorage,
  DateTimeType,
} from './types'
import { GlobalStateType } from '@/store'
import { logger } from 'react-native-logs'
import {
  loadObjectFromXMLFile,
  saveObjectIntoXMLFile,
  arrayToObject,
  objectToArray,
} from '@/services/xmlStorage'

const log = logger.createLogger()
log.setSeverity('debug')

const XML_FILENAME = 'calendar-data'

export function addNewDateDescription(
  data: DateTimeType,
): (dispatch: Dispatch, getState: () => GlobalStateType) => void {
  const action: AddDateActionType = {
    payload: {
      ...data,
    },
    type: T.ADD_NEW_DATE_DESCRIPTION,
  }

  return async (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(action)
    await saveObjectIntoXMLFile(XML_FILENAME, arrayToObject(getState().calendarReducer.dates))
  }
}

export function updateDateDescription(
  oldDateStr: string,
  oldHours: number,
  oldMinutes: number,
  dateTime: DateTimeType,
): (dispatch: Dispatch, getState: () => GlobalStateType) => void {
  const removeAction: RemoveDateActionType = {
    payload: {
      hours: oldHours,
      minutes: oldMinutes,
      strDate: oldDateStr,
    },
    type: T.REMOVE_DATE_DESCRIPTION,
  }

  const addAction: AddDateActionType = {
    payload: {
      ...dateTime,
    },
    type: T.ADD_NEW_DATE_DESCRIPTION,
  }

  return async (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(removeAction)
    dispatch(addAction)
    await saveObjectIntoXMLFile(XML_FILENAME, arrayToObject(getState().calendarReducer.dates))
  }
}

export function removeDateDescription(
  strDate: string,
  hours: number,
  minutes: number,
): (dispatch: Dispatch, getState: () => GlobalStateType) => void {
  const removeAction: RemoveDateActionType = {
    payload: {
      strDate,
      hours,
      minutes,
    },
    type: T.REMOVE_DATE_DESCRIPTION,
  }

  return (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(removeAction)
  }
}

export function setSelectedDate(dateStr: string): SetSelectedDateActionType {
  return {
    payload: dateStr,
    type: T.SET_SELECTED_DATE_STR,
  }
}

export function fetchDataFromXmlFileStorage(): (
  dispatch: Dispatch,
  getState: () => GlobalStateType,
) => void {
  const action: FetchDatesFromXMLFileStorage = {
    type: T.FETCH_DATES_FROM_XML_FILE_STORAGE,
    payload: [],
  }

  return async (dispatch: Dispatch) => {
    try {
      const arrObj = await loadObjectFromXMLFile(XML_FILENAME)
      const arr = objectToArray(arrObj) as Array<DateTimeType>
      if (arr && arr.length) action.payload = arr
    } catch (error) {
      log['warn'](error)
    } finally {
      dispatch(action)
    }
  }
}

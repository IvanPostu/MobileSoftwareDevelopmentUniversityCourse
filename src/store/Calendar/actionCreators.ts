import { Dispatch } from 'redux'
import {
  calendarActionTypeConstants as T,
  AddDateActionType,
  DateType,
  FindDateActionType,
  RemoveDateActionType,
  UpdateDateActionType,
  SetSelectedDateActionType,
  FetchDataFromLocalStorage,
} from './types'
import { GlobalStateType } from '@/store'
import { saveArrayOfDatesIntoXMLFile, loadArrayOfDatesFromXMLFile } from '@/services/xmlStorage'
import { logger } from 'react-native-logs'

const log = logger.createLogger()
log.setSeverity('debug')

export function addNewDateDescription(
  data: DateType,
): (dispatch: Dispatch, getState: () => GlobalStateType) => void {
  const action: AddDateActionType = {
    payload: {
      ...data,
    },
    type: T.ADD_NEW_DATE_DESCRIPTION,
  }

  return (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(action)
    const dateListWithDescriptions = getState().calendarReducer.dates
    saveArrayOfDatesIntoXMLFile('datafile', dateListWithDescriptions)
  }
}

export function updateDateDescription(
  data: DateType,
): (dispatch: Dispatch, getState: () => GlobalStateType) => void {
  const action = {
    payload: {
      ...data,
    },
    type: T.UPDATE_DATE_DESCRIPTION,
  }

  return (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(action)
    const dateListWithDescriptions = getState().calendarReducer.dates
    saveArrayOfDatesIntoXMLFile('datafile', dateListWithDescriptions)
  }
}

export function removeDateDescription(strDate: string): RemoveDateActionType {
  return {
    payload: strDate,
    type: T.REMOVE_DATE_DESCRIPTION,
  }
}

export function findDateDescription(strDescription: string): FindDateActionType {
  return {
    payload: strDescription,
    type: T.FIND_USING_DESCRIPTION,
  }
}

export function setSelectedDate(dateStr: string, description = ''): SetSelectedDateActionType {
  return {
    payload: {
      dateStr,
      description,
    },
    type: T.SET_SELECTED_DATE_STR,
  }
}

export function fetchDataFromLocalStorage(): (
  dispatch: Dispatch,
  getState: () => GlobalStateType,
) => void {
  const action: FetchDataFromLocalStorage = {
    type: T.FETCH_DATA_FROM_LOCAL_STORAGE,
    payload: [],
  }

  return async (dispatch: Dispatch) => {
    try {
      const arr = (await loadArrayOfDatesFromXMLFile('datafile')) as Array<DateType>
      action.payload = arr
    } catch (error) {
      log['warn'](error)
    } finally {
      dispatch(action)
    }
  }
}

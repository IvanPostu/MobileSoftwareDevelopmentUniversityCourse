import { Dispatch } from 'redux'
import {
  calendarActionTypeConstants as T,
  AddDateActionType,
  DateType,
  RemoveDateActionType,
  SetSelectedDateActionType,
  DateTimeType,
} from './types'
import { GlobalStateType } from '@/store'
import { saveArrayOfDatesIntoXMLFile, loadArrayOfDatesFromXMLFile } from '@/services/xmlStorage'
import { logger } from 'react-native-logs'

const log = logger.createLogger()
log.setSeverity('debug')

export function addNewDateDescription(
  data: DateTimeType,
): (dispatch: Dispatch, getState: () => GlobalStateType) => void {
  const action: AddDateActionType = {
    payload: {
      ...data,
    },
    type: T.ADD_NEW_DATE_DESCRIPTION,
  }

  return (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(action)
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

  return (dispatch: Dispatch, getState: () => GlobalStateType) => {
    dispatch(removeAction)
    dispatch(addAction)
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

// export function fetchDataFromLocalStorage(): (
//   dispatch: Dispatch,
//   getState: () => GlobalStateType,
// ) => void {
//   const action: FetchDataFromLocalStorage = {
//     type: T.FETCH_DATA_FROM_LOCAL_STORAGE,
//     payload: [],
//   }

//   return async (dispatch: Dispatch) => {
//     try {
//       const arr = [] as Array<DateType>
//       if (arr && arr.length) action.payload = arr
//     } catch (error) {
//       log['warn'](error)
//     } finally {
//       dispatch(action)
//     }
//   }
// }

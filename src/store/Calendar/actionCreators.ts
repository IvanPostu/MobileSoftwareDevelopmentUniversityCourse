import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
  calendarActionTypeConstants as T,
  AddDateActionType,
  RemoveDateActionType,
  SetSelectedDateActionType,
  FetchDatesFromXMLFileStorage,
  UpdatePushNotificationQueueType,
  DateTimeType,
  CalendarRootActionType,
} from './types'
import { GlobalStateType } from '@/store'
import { logger } from 'react-native-logs'
import {
  loadObjectFromXMLFile,
  saveObjectIntoXMLFile,
  arrayToObject,
  objectToArray,
} from '@/services/xmlStorage'
import PushNotification from 'react-native-push-notification'

const log = logger.createLogger()
log.setSeverity('debug')

const XML_FILENAME = 'calendar-data'

export function addNewDateDescription(
  data: DateTimeType,
): (
  dispatch: ThunkDispatch<GlobalStateType, unknown, AddDateActionType>,
  getState: () => GlobalStateType,
) => void {
  const action: AddDateActionType = {
    payload: {
      ...data,
    },
    type: T.ADD_NEW_DATE_DESCRIPTION,
  }

  return async (
    dispatch: ThunkDispatch<GlobalStateType, unknown, AddDateActionType>,
    getState: () => GlobalStateType,
  ) => {
    dispatch(action)
    dispatch(updatePushNotificationQueue())
    await saveObjectIntoXMLFile(XML_FILENAME, arrayToObject(getState().calendarReducer.dates))
  }
}

export function updateDateDescription(
  oldDateStr: string,
  oldHours: number,
  oldMinutes: number,
  dateTime: DateTimeType,
): (
  dispatch: ThunkDispatch<GlobalStateType, unknown, CalendarRootActionType>,
  getState: () => GlobalStateType,
) => void {
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

  return async (dispatch, getState) => {
    dispatch(removeAction)
    dispatch(addAction)
    dispatch(updatePushNotificationQueue())
    await saveObjectIntoXMLFile(XML_FILENAME, arrayToObject(getState().calendarReducer.dates))
  }
}

export function removeDateDescription(
  strDate: string,
  hours: number,
  minutes: number,
): (
  dispatch: ThunkDispatch<GlobalStateType, unknown, CalendarRootActionType>,
  getState: () => GlobalStateType,
) => void {
  const removeAction: RemoveDateActionType = {
    payload: {
      strDate,
      hours,
      minutes,
    },
    type: T.REMOVE_DATE_DESCRIPTION,
  }

  return (dispatch) => {
    dispatch(removeAction)
    dispatch(updatePushNotificationQueue())
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

export function updatePushNotificationQueue(): (
  dispatch: Dispatch,
  getState: () => GlobalStateType,
) => void {
  const action: UpdatePushNotificationQueueType = {
    type: T.UPDATE_PUSH_NOTIFICATION_QUEUE,
  }

  PushNotification.cancelAllLocalNotifications()

  const numToDateStr = (n: number) => (n < 10 ? '0' + String(n) : String(n))

  return (dispatch: Dispatch, getState: () => GlobalStateType) => {
    const dates: Array<DateTimeType> = getState().calendarReducer.dates
    dates.forEach((item) => {
      const date = new Date(
        `${item.dateStr}T${numToDateStr(item.hours)}:${numToDateStr(item.minutes)}:00+03:00`,
      )

      if (date.getTime() > new Date(Date.now()).getTime()) {
        PushNotification.localNotificationSchedule({
          title: `${item.dateStr} ${item.hours}:${item.minutes} notification.`,
          message: item.description,
          date: date,
        })
        log['debug'](`Added schedule for: ${date}`)
      }
    })
    dispatch(action)
  }
}

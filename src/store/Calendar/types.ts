export enum calendarActionTypeConstants {
  ADD_NEW_DATE_DESCRIPTION = '@Calendar/ADD_NEW_DATE_DESCRIPTION',
  REMOVE_DATE_DESCRIPTION = '@Calendar/REMOVE_DATE',
  SET_SELECTED_DATE_STR = '@Calendar/SET_SELECTED_DATE_STR',
  FETCH_DATES_FROM_XML_FILE_STORAGE = '@Calendar/FETCH_DATES_FROM_XML_FILE_STORAGE',
  UPDATE_PUSH_NOTIFICATION_QUEUE = '@Calendar/UPDATE_PUSH_NOTIFICATION_QUEUE',
}

export type CalendarStateType = {
  dates: Array<DateTimeType>
  selectedDateStr: string
  isLoadedFirstTime: boolean
}

export type DateType = {
  dateStr: string // YYYY-mm-dd
  description: string
}

export type DateTimeType = DateType & {
  hours: number
  minutes: number
}

export interface AddDateActionType {
  type: typeof calendarActionTypeConstants.ADD_NEW_DATE_DESCRIPTION
  payload: DateTimeType
}

export interface RemoveDateActionType {
  type: typeof calendarActionTypeConstants.REMOVE_DATE_DESCRIPTION
  payload: {
    strDate: string
    hours: number
    minutes: number
  }
}

export interface SetSelectedDateActionType {
  type: typeof calendarActionTypeConstants.SET_SELECTED_DATE_STR
  payload: string
}

export interface FetchDatesFromXMLFileStorage {
  type: typeof calendarActionTypeConstants.FETCH_DATES_FROM_XML_FILE_STORAGE
  payload: Array<DateTimeType>
}

export interface UpdatePushNotificationQueueType {
  type: typeof calendarActionTypeConstants.UPDATE_PUSH_NOTIFICATION_QUEUE
}

export type CalendarRootActionType =
  | AddDateActionType
  | RemoveDateActionType
  | SetSelectedDateActionType
  | FetchDatesFromXMLFileStorage
  | UpdatePushNotificationQueueType

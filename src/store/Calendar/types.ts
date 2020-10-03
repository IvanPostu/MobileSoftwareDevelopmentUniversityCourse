export enum calendarActionTypeConstants {
  UPDATE_DATE_DESCRIPTION = '@Calendar/UPDATE_DATE_DESCRIPTION',
  ADD_NEW_DATE_DESCRIPTION = '@Calendar/ADD_NEW_DATE_DESCRIPTION',
  REMOVE_DATE_DESCRIPTION = '@Calendar/REMOVE_DATE',
  FIND_USING_DESCRIPTION = '@Calendar/FIND_USING_DESCRIPTION',
  SET_SELECTED_DATE_STR = '@Calendar/SET_SELECTED_DATE_STR',
  FETCH_DATA_FROM_LOCAL_STORAGE = '@Calendar/FETCH_DATA_FROM_LOCAL_STORAGE',
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

export interface UpdateDateActionType {
  type: typeof calendarActionTypeConstants.UPDATE_DATE_DESCRIPTION
  payload: DateType
}

export interface AddDateActionType {
  type: typeof calendarActionTypeConstants.ADD_NEW_DATE_DESCRIPTION
  payload: DateTimeType
}

export interface RemoveDateActionType {
  type: typeof calendarActionTypeConstants.REMOVE_DATE_DESCRIPTION
  payload: string
}

export interface FindDateActionType {
  type: typeof calendarActionTypeConstants.FIND_USING_DESCRIPTION
  payload: string
}

export interface SetSelectedDateActionType {
  type: typeof calendarActionTypeConstants.SET_SELECTED_DATE_STR
  payload: string
}

export interface FetchDataFromLocalStorage {
  type: typeof calendarActionTypeConstants.FETCH_DATA_FROM_LOCAL_STORAGE
  payload: Array<DateType>
}

export type CalendarRootActionType =
  | UpdateDateActionType
  | AddDateActionType
  | RemoveDateActionType
  | FindDateActionType
  | SetSelectedDateActionType
  | FetchDataFromLocalStorage

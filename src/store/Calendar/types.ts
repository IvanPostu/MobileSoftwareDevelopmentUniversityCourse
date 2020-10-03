export enum calendarActionTypeConstants {
  ADD_NEW_DATE_DESCRIPTION = '@Calendar/ADD_NEW_DATE_DESCRIPTION',
  REMOVE_DATE_DESCRIPTION = '@Calendar/REMOVE_DATE',
  SET_SELECTED_DATE_STR = '@Calendar/SET_SELECTED_DATE_STR',
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

export type CalendarRootActionType =
  | AddDateActionType
  | RemoveDateActionType
  | SetSelectedDateActionType

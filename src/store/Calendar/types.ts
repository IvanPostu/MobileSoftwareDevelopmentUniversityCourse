export enum calendarActionTypeConstants {
  UPDATE_DATE_DESCRIPTION = '@Calendar/UPDATE_DATE_DESCRIPTION',
  ADD_NEW_DATE_DESCRIPTION = '@Calendar/ADD_NEW_DATE_DESCRIPTION',
  REMOVE_DATE_DESCRIPTION = '@Calendar/REMOVE_DATE',
  FIND_USING_DESCRIPTION = '@Calendar/FIND_USING_DESCRIPTION',
  SET_SELECTED_DATE_STR = '@Calendar/SET_SELECTED_DATE_STR',
}

export type CalendarStateType = {
  dates: Array<DateType>
  selectedDateStr: string
  descriptionForSelectedDate: string
}

export type DateType = {
  dateStr: string // YYYY-mm-dd
  description: string
}

export interface UpdateDateActionType {
  type: typeof calendarActionTypeConstants.UPDATE_DATE_DESCRIPTION
  payload: DateType
}

export interface AddDateActionType {
  type: typeof calendarActionTypeConstants.ADD_NEW_DATE_DESCRIPTION
  payload: DateType
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
  payload: DateType
}

export type CalendarRootActionType =
  | UpdateDateActionType
  | AddDateActionType
  | RemoveDateActionType
  | FindDateActionType
  | SetSelectedDateActionType

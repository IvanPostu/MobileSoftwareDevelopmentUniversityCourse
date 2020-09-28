import {
  calendarActionTypeConstants as T,
  AddDateActionType,
  DateType,
  FindDateActionType,
  RemoveDateActionType,
  UpdateDateActionType,
  SetSelectedDateActionType,
} from './types'

export function addNewDateDescription(data: DateType): AddDateActionType {
  return {
    payload: {
      ...data,
    },
    type: T.ADD_NEW_DATE_DESCRIPTION,
  }
}

export function updateDateDescription(data: DateType): UpdateDateActionType {
  return {
    payload: {
      ...data,
    },
    type: T.UPDATE_DATE_DESCRIPTION,
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

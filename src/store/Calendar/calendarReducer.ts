import { Reducer } from 'redux'
import {
  CalendarStateType,
  CalendarRootActionType,
  calendarActionTypeConstants as T,
} from './types'
import { logger } from 'react-native-logs'

const initialState: CalendarStateType = {
  dates: [],
  selectedDateStr: '',
  descriptionForSelectedDate: '',
  isLoadedFirstTime: false,
}

const log = logger.createLogger()
log.setSeverity('debug')

export const calendarReducer: Reducer<CalendarStateType, CalendarRootActionType> = (
  state: CalendarStateType = initialState,
  action,
) => {
  switch (action.type) {
    case T.ADD_NEW_DATE_DESCRIPTION:
      return {
        ...state,
        dates: [...state.dates, action.payload],
      }
    case T.SET_SELECTED_DATE_STR:
      return {
        ...state,
        selectedDateStr: action.payload.dateStr,
        descriptionForSelectedDate: action.payload.description,
      }
    case T.FETCH_DATA_FROM_LOCAL_STORAGE:
      state.isLoadedFirstTime
        ? log['warn']('Data has already loaded from storage!!!')
        : log['debug']('Data loaded from storage!!!')
      return {
        ...state,
        isLoadedFirstTime: true,
        dates: [...state.dates, ...action.payload],
      }
    default:
      return state
  }
}

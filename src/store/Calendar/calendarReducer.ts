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
        dates: [...state.dates, action.payload].sort((a, b) =>
          `${a.dateStr}-${a.hours}-${a.minutes}` > `${b.dateStr}-${b.hours}-${b.minutes}` ? 1 : -1,
        ),
      }
    case T.SET_SELECTED_DATE_STR:
      return {
        ...state,
        selectedDateStr: action.payload,
      }
    // case T.FETCH_DATA_FROM_LOCAL_STORAGE:
    //   state.isLoadedFirstTime
    //     ? log['warn']('Data has already loaded from storage!!!')
    //     : log['debug']('Data loaded from storage!!!')
    //   return {
    //     ...state,
    //     isLoadedFirstTime: true,
    //     dates: [...state.dates, ...action.payload],
    //   }
    // case T.UPDATE_DATE_DESCRIPTION:
    //   return {
    //     ...state,
    //     dates: [...state.dates.filter((a) => a.dateStr != action.payload.dateStr), action.payload],
    //   }
    case T.REMOVE_DATE_DESCRIPTION:
      return {
        ...state,
        dates: [
          ...state.dates.filter(
            (a) =>
              !(
                a.dateStr === action.payload.strDate &&
                a.hours === action.payload.hours &&
                a.minutes === action.payload.minutes
              ),
          ),
        ],
        descriptionForSelectedDate: '',
      }
    default:
      return state
  }
}

import { Reducer } from 'redux'
import {
  CalendarStateType,
  CalendarRootActionType,
  calendarActionTypeConstants as T,
  DateType,
} from './types'

const fakeDates: Array<DateType> = [
  {
    dateStr: '2020-09-05',
    description: 'walk',
  },
  {
    dateStr: '2020-09-18',
    description: 'eat apple',
  },
  {
    dateStr: '2020-09-09',
    description: 'Drink beer',
  },
]

const initialState: CalendarStateType = {
  dates: fakeDates,
  selectedDateStr: '',
  descriptionForSelectedDate: '',
}

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
    default:
      return state
  }
}

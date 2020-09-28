import { combineReducers } from 'redux'

import { calendarReducer } from '@/store/Calendar/calendarReducer'

export const rootReducer = combineReducers({ calendarReducer })

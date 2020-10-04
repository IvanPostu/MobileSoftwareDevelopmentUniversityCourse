import { combineReducers } from 'redux'

import { calendarReducer } from '@/store/Calendar/calendarReducer'

const rootReducer = combineReducers({ calendarReducer })

export default rootReducer

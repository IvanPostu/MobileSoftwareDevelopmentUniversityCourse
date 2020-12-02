import { combineReducers } from 'redux'
import { postsReducer } from '@/store/Posts/postsReducer'
import { notificationsReducer } from '../Notifications/notificationsReducer'
import { doctorsReducer } from '../Doctors/doctorsReducer'

const rootReducer = combineReducers({ postsReducer, notificationsReducer, doctorsReducer })

export default rootReducer

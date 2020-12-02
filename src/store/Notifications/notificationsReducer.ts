import { Action, Reducer } from 'redux'
import { NotificationsStateType } from './types'

const initialState: NotificationsStateType = {
  notifications: [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit , t. Ut enim ad minim venia m, quis nostrud exercitation ullamco',
      requestDetails: {
        description: 'Aku ingin menjadi setitik awan kecil di langit bersama mantari yaga hah',
        desease: 'Sore Eyes',
        location: 'St. broxlyn 212',
        name: 'Jojon Suehndra',
      },
      doctor: {
        fullname: 'Dudung Sokmati',
        gradeInStars: '4.9',
        specialisation: 'Eye Specialist',
      },
    },
  ],
}

export const notificationsReducer: Reducer<NotificationsStateType, Action<unknown>> = (
  state: NotificationsStateType = initialState,
) => {
  return state
}

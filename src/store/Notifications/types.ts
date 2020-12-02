// import { Action } from 'redux'

export enum notificationsActionTypeConstants {
  START_LOAD = '@Notifications/START_LOAD',
  STOP_LOAD = '@Notifications/STOP_LOAD',
}

export type NotificationType = {
  description: string
  requestDetails: {
    name: string //Jojon Suehandra
    desease: string //Sore Eyes
    location: string //St. Broxlyn 212
    description: string
  }
  doctor: {
    fullname: string //Dudung Sokmati
    specialisation: string //Eye Specialist
    gradeInStars: string // 4.9
  }
}

export type NotificationsStateType = {
  notifications: Array<NotificationType>
}

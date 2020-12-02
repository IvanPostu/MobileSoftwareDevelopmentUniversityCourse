import { ImageSourcePropType } from 'react-native'

export type DoctorType = {
  doctorId: string
  name: string
  specialisation: string
  grade: string //5 start
  description: string
  address: string
  image: ImageSourcePropType
}

export type DoctorsStateType = {
  doctors: Array<DoctorType>
}

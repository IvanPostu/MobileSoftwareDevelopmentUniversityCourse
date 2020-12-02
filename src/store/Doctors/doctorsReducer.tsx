import { Action, Reducer } from 'redux'
import { DoctorsStateType } from './types'
import p1 from '@/assets/p1.png'
import p2 from '@/assets/p2.png'
import p3 from '@/assets/p3.png'
import p4 from '@/assets/p4.png'
import p5 from '@/assets/p5.png'

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit , t. Ut enim ad minim venia m, quis nostrud exercitation ullamco'

const initialState: DoctorsStateType = {
  doctors: [
    {
      doctorId: 'a1',
      description: DEFAULT_DESCRIPTION,
      grade: '4.9',
      name: 'Dudung Sokmati',
      address: 'St. Bronxlyn 212',
      specialisation: 'Eye Specialist',
      image: p1,
    },
    {
      doctorId: 'a2',
      description: DEFAULT_DESCRIPTION,
      grade: '4.2',
      name: 'Nunung Brandon',
      address: 'St. Bronxlyn 212',
      specialisation: 'Eye Specialist',
      image: p2,
    },
    {
      doctorId: 'a3',
      description: DEFAULT_DESCRIPTION,
      grade: '3.9',
      name: 'Udin Batakooran',
      address: 'St. Bronxlyn 212',
      specialisation: 'Eye Specialist',
      image: p3,
    },
    {
      doctorId: 'a4',
      description: DEFAULT_DESCRIPTION,
      grade: '3.1',
      name: 'Cucup Joentravo',
      address: 'St. Bronxlyn 212',
      specialisation: 'Eye Specialist',
      image: p4,
    },
    {
      doctorId: 'a5',
      description: DEFAULT_DESCRIPTION,
      grade: '2.1',
      name: 'Diding Sulidinger',
      address: 'St. Bronxlyn 212',
      specialisation: 'Eye Specialist',
      image: p5,
    },
  ],
}

export const doctorsReducer: Reducer<DoctorsStateType, Action<unknown>> = (
  state: DoctorsStateType = initialState,
) => {
  return state
}

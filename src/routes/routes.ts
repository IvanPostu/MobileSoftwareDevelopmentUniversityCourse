import { ComponentClass, FunctionComponent } from 'react'

import HomeScreen from '@/screens/Home/HomeScreen'

import { routeNames } from './routeNames'

type CustomRouteType = {
  [prop: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentClass<any, any> | FunctionComponent<any>
    isHeaderButton: boolean
    routeName: string
    headerButtonName?: string
  }
}

export const routes: CustomRouteType = {
  HomeScreen: {
    component: HomeScreen,
    isHeaderButton: true,
    routeName: routeNames.MainScreen,
    headerButtonName: 'Home',
  },
}

export const initialRoute = routes['HomeScreen'] || routes[Object.keys(routes)[0]]

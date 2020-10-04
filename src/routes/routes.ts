import { ComponentClass, FunctionComponent } from 'react'

import { MainScreen } from '@/screens/MainScreen'
import { AddScreen } from '@/screens/AddScreen'
import { UpdateScreen } from '@/screens/UpdateScreen'
import { SearchScreen } from '@/screens/SearchScreen'

import { routeNames as T } from './routeNames'

export type CustomRouteType = {
  [prop: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentClass<any, any> | FunctionComponent<any>
    isHeaderButton: boolean
    headerButtonName?: string
    routeName: string
  }
}

export const routes: CustomRouteType = {
  MainScreen: {
    component: MainScreen,
    isHeaderButton: true,
    routeName: T.MainScreen,
    headerButtonName: 'Main',
  },
  SearchScreen: {
    component: SearchScreen,
    isHeaderButton: true,
    routeName: T.SearchScreen,
    headerButtonName: 'Search',
  },
  AddScreen: {
    component: AddScreen,
    isHeaderButton: false,
    routeName: T.AddScreen,
  },
  UpdateScreen: {
    component: UpdateScreen,
    isHeaderButton: false,
    routeName: T.UpdateScreen,
  },
}

export const initialRoute = routes['HomeScreen'] || routes[Object.keys(routes)[0]]

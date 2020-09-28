import { ComponentClass, FunctionComponent } from 'react'

// import { SearchScreen } from '@/screens/SearchScreen'
// import { PushNotificationScreen } from '@/screens/PushNotificationScreen'
// import { WebViewScreen } from '@/screens/WebViewScreen'
// import { CameraScreen } from '@/screens/CameraScreen'
import { MainScreen } from '@/screens/MainScreen'

export type CustomRouteType = {
  [prop: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentClass<any, any> | FunctionComponent<any>
    isHeaderButton: boolean
  }
}

export const routes: CustomRouteType = {
  MainScreen: {
    component: MainScreen,
    isHeaderButton: true,
  },
}

export const initialRoute = routes['HomeScreen'] || routes[Object.keys(routes)[0]]

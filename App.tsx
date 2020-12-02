/**
 * React Native App
 * https://github.com/facebook/react-native
 */

import React, { ReactElement, FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { routes } from '@/routes/routes'
import { ReduxWrapper } from '@/store/root'
import AppNavigator from '@/routes/AppRouter'

const Stack = createStackNavigator()

const App: FC = (): ReactElement => {
  return (
    <ReduxWrapper>
      <AppNavigator />
    </ReduxWrapper>
  )
}
export default App

/**
 * React Native App
 * https://github.com/facebook/react-native
 */

import React, { ReactElement, FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { ReduxWrapper } from '@/store/root'
import { routes } from '@/routes/routes'
import { Header } from '@/components/header'

const Stack = createStackNavigator()

const App: FC = (): ReactElement => {
  return (
    <ReduxWrapper>
      <NavigationContainer>
        <Stack.Navigator>
          {Object.keys(routes).map((key) => (
            <Stack.Screen
              key={key}
              name={key}
              component={routes[key].component}
              options={
                (/*{ navigation, route }*/) => ({
                  // eslint-disable-next-line react/display-name
                  header: (props) => <Header {...props} />,
                  animationEnabled: true,
                })
              }
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxWrapper>
  )
}

export default App

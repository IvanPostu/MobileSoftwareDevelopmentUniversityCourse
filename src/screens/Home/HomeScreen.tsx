import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { ScrollView, Text } from 'react-native'
import { ProgresBar } from '@/components/ProgressBar'

type HomeScreenPropType = PropsWithChildren<unknown> & {
  navigation: NavigationProp<ParamListBase>
}

export default class HomeScreen extends Component<HomeScreenPropType> {
  constructor(props: HomeScreenPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <ScrollView>
        <Text>Home screen.</Text>
        <ProgresBar percent={22} />
      </ScrollView>
    )
  }
}

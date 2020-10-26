import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { ScrollView, View, StyleSheet, Button, TextInput, Text } from 'react-native'
import { Spinner } from '@/components/Spinner'

const UPDATE_INTERVAL = 0.3
const TOTAL_SECONDS = 11

type HomeScreenPropType = PropsWithChildren<unknown> & {
  navigation: NavigationProp<ParamListBase>
}

type HomeScreenStateType = {
  animationPercents: number
}

function Settings(): ReactElement {
  return (
    <View style={settingStyles.container}>
      <TextInput placeholder="Enter in seconds." style={settingStyles.textInput} />
      <Button onPress={() => {}} title="Start" />
    </View>
  )
}

export default class HomeScreen extends Component<HomeScreenPropType, HomeScreenStateType> {
  animationPeriodicID: number

  constructor(props: HomeScreenPropType) {
    super(props)

    this.animationPeriodicID = 0
    this.state = {
      animationPercents: 0,
    }

    this.periodicCallbackForAnimation = this.periodicCallbackForAnimation.bind(this)
  }

  componentDidMount(): void {
    this.animationPeriodicID = window.setInterval(
      this.periodicCallbackForAnimation,
      1000 * UPDATE_INTERVAL,
    )
  }

  periodicCallbackForAnimation(): void {
    const incValueInPercents = (UPDATE_INTERVAL / TOTAL_SECONDS) * 100
    let newPercentsValue = incValueInPercents + this.state.animationPercents

    if (newPercentsValue > 100) {
      newPercentsValue = 100
      clearInterval(this.animationPeriodicID)
    }

    this.setState({ animationPercents: newPercentsValue })
  }

  render(): ReactElement {
    return (
      <ScrollView style={styles.container}>
        <Settings />
        <Spinner backgroundColor="#111" percent={Math.floor(this.state.animationPercents)} />
      </ScrollView>
    )
  }
}

const settingStyles = StyleSheet.create({
  container: {
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 10,
  },
})

const styles = StyleSheet.create({
  container: {},
})

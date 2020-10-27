import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { ScrollView, View, StyleSheet, Button, TextInput } from 'react-native'
import { Spinner } from '@/components/Spinner'
import PushNotifocation from 'react-native-push-notification'

const UPDATE_INTERVAL = 0.3

type HomeScreenPropType = PropsWithChildren<unknown> & {
  navigation: NavigationProp<ParamListBase>
}

type HomeScreenStateType = {
  animationPercents: number
  newWaitValue: number
  animationIsShowed: boolean
}

type SettingsPropType = {
  onTextChange: (text: string) => void
  onButtonClick: () => void
  buttonIsActive: boolean
}

function Settings(props: SettingsPropType): ReactElement {
  return (
    <View style={settingStyles.container}>
      <TextInput
        onChangeText={props.onTextChange}
        placeholder="Enter in seconds."
        style={settingStyles.textInput}
      />
      <Button disabled={!props.buttonIsActive} onPress={props.onButtonClick} title="Start" />
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
      newWaitValue: 0,
      animationIsShowed: false,
    }

    this.periodicCallbackForAnimation = this.periodicCallbackForAnimation.bind(this)
    this.onTextInsert = this.onTextInsert.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  periodicCallbackForAnimation(): void {
    const TOTAL_SECONDS = this.state.newWaitValue
    const incValueInPercents = (UPDATE_INTERVAL / TOTAL_SECONDS) * 100
    let newPercentsValue = incValueInPercents + this.state.animationPercents

    if (newPercentsValue > 100) {
      newPercentsValue = 100
      clearInterval(this.animationPeriodicID)
      this.setState({ animationIsShowed: false, animationPercents: 0 })
      PushNotifocation.localNotification({
        message: 'STOP animation',
        title: 'Animation state',
      })
      return
    }

    this.setState({ animationPercents: newPercentsValue })
  }

  onTextInsert(text: string): void {
    this.setState({ newWaitValue: Number(text) })
  }

  onButtonClick(): void {
    PushNotifocation.localNotification({
      message: 'START animation',
      title: 'Animation state',
    })
    PushNotifocation.localNotification({
      message: 'PROGRESS animation',
      title: 'Animation state',
    })
    this.setState({ animationIsShowed: true })
    this.animationPeriodicID = window.setInterval(
      this.periodicCallbackForAnimation,
      1000 * UPDATE_INTERVAL,
    )
  }

  render(): ReactElement {
    return (
      <ScrollView style={styles.container}>
        <Settings
          buttonIsActive={!this.state.animationIsShowed}
          onTextChange={this.onTextInsert}
          onButtonClick={this.onButtonClick}
        />
        {this.state.animationIsShowed && (
          <Spinner backgroundColor="#111" percent={Math.floor(this.state.animationPercents)} />
        )}
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

import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { localNotification } from '@/services/pushNotificationService'
import { ProgresBar } from '@/components/progressBar/ProgressBar'
import {
  progressBarDelayInSeconds as UPDATE_INTERVAL,
  sleepSecondsBeforePushNotification as TOTAL_SECONDS,
} from './constants.json'

type PushNotificationScreenPropType = PropsWithChildren<unknown>

type PushNotificationScreenStateType = {
  animationPercents: number
}

export class PushNotificationScreen extends Component<
  PushNotificationScreenPropType,
  PushNotificationScreenStateType
> {
  animationPeriodicID: number

  constructor(props: PushNotificationScreenPropType) {
    super(props)
    this.animationPeriodicID = 0

    this.state = {
      animationPercents: 0,
    }

    this.periodicCallbackForAnimation = this.periodicCallbackForAnimation.bind(this)
    this.onAnimationCompleteCallback = this.onAnimationCompleteCallback.bind(this)
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

  onAnimationCompleteCallback(): void {
    localNotification({ title: 'Push notification title', message: 'Push notification message' })
  }

  componentDidMount(): void {
    this.animationPeriodicID = window.setInterval(
      this.periodicCallbackForAnimation,
      1000 * UPDATE_INTERVAL,
    )
  }

  componentDidUpdate(
    prevProps: PushNotificationScreenPropType,
    prevState: PushNotificationScreenStateType,
  ): void {
    if (
      prevState.animationPercents !== this.state.animationPercents &&
      this.state.animationPercents === 100
    ) {
      this.onAnimationCompleteCallback()
    }
  }

  componentWillUnmount(): void {
    clearInterval(this.animationPeriodicID)
  }

  render(): ReactElement {
    return (
      <View style={styles.mainContainer}>
        <Text> PushNotificationScreen </Text>
        <ProgresBar percent={this.state.animationPercents} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {},
})

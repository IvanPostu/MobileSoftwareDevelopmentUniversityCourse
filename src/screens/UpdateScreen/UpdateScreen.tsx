import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { GlobalStateType } from '@/store'
import { updateDateDescription, setSelectedDate } from '@/store/Calendar/actionCreators'
import { TimePicker } from '@/components/TimePicker'
import { DateTimeType } from '@/store/Calendar/types'
import { routeNames } from '@/routes/routeNames'

function mapStateToProps(state: GlobalStateType) {
  return {
    selectedDateStr: state.calendarReducer.selectedDateStr,
    dates: state.calendarReducer.dates,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { updateDateDescription, setSelectedDate }
  return bindActionCreators(actionCreators, dispatch)
}

type UpdateScreenComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: {
      navigate: (a: string) => void
    }
    route: {
      params: {
        dateTime: DateTimeType
      }
    }
  }

type UpdateScreenComponentStateType = {
  dateTime: DateTimeType
  readonly oldDateTime: {
    dateStr: string
    hours: number
    minutes: number
  }
}

class UpdateScreenComponent extends Component<
  UpdateScreenComponentPropType,
  UpdateScreenComponentStateType
> {
  constructor(props: UpdateScreenComponentPropType) {
    super(props)

    const dateTime: DateTimeType = this.props.route.params.dateTime
    this.state = {
      dateTime: {
        dateStr: dateTime.dateStr,
        description: dateTime.description,
        hours: dateTime.hours,
        minutes: dateTime.minutes,
      },
      oldDateTime: {
        dateStr: dateTime.dateStr,
        hours: dateTime.hours,
        minutes: dateTime.minutes,
      },
    }

    this.onUpdateDescriptionButtonClick = this.onUpdateDescriptionButtonClick.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
  }

  onUpdateDescriptionButtonClick(): void {
    const description: string = this.state.dateTime.description
    const dateStr: string = this.props.selectedDateStr

    if (
      this.props.dates.findIndex(
        (a) => a.hours === this.state.dateTime.hours && a.minutes === this.state.dateTime.minutes,
      ) !== -1
    ) {
      Alert.alert('Warning', 'Current time is reserved!!!')
      return
    }

    if (description) {
      this.props.updateDateDescription(
        this.state.oldDateTime.dateStr,
        this.state.oldDateTime.hours,
        this.state.oldDateTime.minutes,
        this.state.dateTime,
      )
      this.props.setSelectedDate(dateStr)
      this.props.navigation.navigate(routeNames.MainScreen)
    } else {
      Alert.alert('Warning', 'Description can not be empty!!!')
      return
    }
  }

  onTimeChange(hours: number, minutes: number) {
    this.setState({ dateTime: { ...this.state.dateTime, hours, minutes } })
  }

  render(): ReactElement {
    return (
      <ScrollView style={{ backgroundColor: styles.container.backgroundColor }}>
        <View style={styles.container}>
          <Text style={{ color: 'white' }}>
            Update description for: {this.props.selectedDateStr}
          </Text>
          <TextInput
            defaultValue={this.state.dateTime.description}
            onChangeText={(text) =>
              this.setState({ dateTime: { ...this.state.dateTime, description: text } })
            }
            multiline={true}
            style={styles.inputStyle}
          />

          <TimePicker
            hours={this.state.dateTime.hours}
            minutes={this.state.dateTime.minutes}
            onTimeChange={this.onTimeChange}
          />

          <Button onPress={this.onUpdateDescriptionButtonClick} title={`Update description`} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#333',
  },
  inputStyle: {
    color: 'black',
    backgroundColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 6,
    borderColor: 'grey',
    marginRight: 7,
    width: '70%',
    height: 120,
  },
})

export const UpdateScreen = connect(mapStateToProps, mapDispatchToProps)(UpdateScreenComponent)

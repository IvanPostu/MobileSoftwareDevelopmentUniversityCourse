import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { routeNames } from '@/routes/routeNames'
import { GlobalStateType } from '@/store'
import { addNewDateDescription, setSelectedDate } from '@/store/Calendar/actionCreators'
import { TimePicker } from '@/components/TimePicker'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { DateTimeType } from '@/store/Calendar/types'

function mapStateToProps(state: GlobalStateType) {
  return {
    selectedDateStr: state.calendarReducer.selectedDateStr,
    dates: state.calendarReducer.dates,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { addNewDateDescription, setSelectedDate }
  return bindActionCreators(actionCreators, dispatch)
}

type AddScreenComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: NavigationProp<ParamListBase>
  }
type AddScreenComponentStateType = {
  inputStr: string
  hours: number
  minutes: number
}

class AddScreenComponent extends Component<
  AddScreenComponentPropType,
  AddScreenComponentStateType
> {
  constructor(props: AddScreenComponentPropType) {
    super(props)
    this.state = {
      inputStr: '',
      hours: 0,
      minutes: 0,
    }

    this.onAddDescriptionButtonClick = this.onAddDescriptionButtonClick.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
  }

  onTimeChange(hours: number, minutes: number) {
    this.setState({ hours, minutes })
  }

  onAddDescriptionButtonClick(): void {
    const description: string = this.state.inputStr
    const dateStr: string = this.props.selectedDateStr

    if (
      this.props.dates.findIndex(
        (a: DateTimeType) =>
          a.hours === this.state.hours && a.minutes === this.state.minutes && a.dateStr === dateStr,
      ) !== -1
    ) {
      Alert.alert('Warning', 'Current time is reserved!!!')
      return
    }

    if (description) {
      this.props.addNewDateDescription({
        dateStr,
        description,
        hours: this.state.hours,
        minutes: this.state.minutes,
      })
      this.props.setSelectedDate(dateStr)
      this.props.navigation.navigate(routeNames.MainScreen)
    } else {
      Alert.alert('Warning', 'Description can not be empty!!!')
      return
    }
  }

  render(): ReactElement {
    return (
      <ScrollView style={{ backgroundColor: styles.container.backgroundColor }}>
        <View style={styles.container}>
          <Text style={{ color: 'white' }}>Add description for: {this.props.selectedDateStr}</Text>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                inputStr: text,
              })
            }
            multiline={true}
            style={styles.inputStyle}
          />

          <TimePicker
            onTimeChange={this.onTimeChange}
            hours={this.state.hours}
            minutes={this.state.minutes}
          />

          <Button onPress={this.onAddDescriptionButtonClick} title={`Add description`} />
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

export const AddScreen = connect(mapStateToProps, mapDispatchToProps)(AddScreenComponent)

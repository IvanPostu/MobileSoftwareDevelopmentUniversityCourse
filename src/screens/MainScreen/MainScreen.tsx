import React, { Component, ReactElement } from 'react'
import { ScrollView, StyleSheet, Button, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Calendar } from 'react-native-calendars'
import { logger } from 'react-native-logs'
import { DateTimeAndDescriptionBox } from '@/components/DateAndDescriptionBox'
import { routeNames } from '@/routes/routeNames'
import { GlobalStateType } from '@/store'
import {
  setSelectedDate,
  fetchDataFromLocalStorage,
  removeDateDescription,
} from '@/store/Calendar/actionCreators'
import { findDescription } from './findDescriptionForDateStr'
import { DateType } from '@/store/Calendar/types'

const log = logger.createLogger()
log.setSeverity('debug')

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { setSelectedDate, fetchDataFromLocalStorage, removeDateDescription }
  return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state: GlobalStateType) {
  // log['debug']('state: ', state)
  return {
    selectedDateStr: state.calendarReducer.selectedDateStr,
    dates: state.calendarReducer.dates,
    isLoadedFirstTime: state.calendarReducer.isLoadedFirstTime,
  }
}

type MainScreenComponentPropType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: {
      navigate: (a: string, b?: any) => void
    }
  }

class MainScreenComponent extends Component<MainScreenComponentPropType> {
  constructor(props: MainScreenComponentPropType) {
    super(props)
    const initialDateStr: string = new Date().toISOString().slice(0, 10)
    this.props.setSelectedDate(initialDateStr)
    this.onFindCallback = this.onFindCallback.bind(this)
  }

  componentDidMount(): void {
    if (!this.props.isLoadedFirstTime) {
      this.props.fetchDataFromLocalStorage()
    }
  }

  onFindCallback(findValue: string) {
    log['debug'](`Find value: ${findValue}`)
    const dates: Array<DateType> = this.props.dates.filter((d) => d.description.includes(findValue))
    this.props.navigation.navigate(routeNames.SearchResultScreen, { dates })
  }

  render(): ReactElement {
    const dates = this.props.dates.reduce((result, element) => {
      result[element.dateStr] = { selected: true, selectedColor: '#9ee' }
      return result
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any)

    const manualSelectedDate = this.props.selectedDateStr
      ? {
          [this.props.selectedDateStr]: { selected: true, selectedColor: '#44e' },
        }
      : {}

    return (
      <ScrollView>
        <Calendar
          style={styles.calendarStyle}
          onDayPress={(day) => {
            log['debug'](`MainScreenComponent: Selected day: ${day.dateString}`)
            this.props.setSelectedDate(day.dateString)
          }}
          markedDates={{
            ...dates,
            ...manualSelectedDate,
          }}
        />
        <View style={styles.addButton}>
          <Button
            onPress={() => this.props.navigation.navigate(routeNames.AddScreen)}
            title="Add"
          />
        </View>

        <DateTimeAndDescriptionBox arr={[]} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  calendarStyle: {
    marginTop: 0,
  },
  addButton: {
    paddingHorizontal: 20,
  },
})

export const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenComponent)

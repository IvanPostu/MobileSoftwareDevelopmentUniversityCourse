import React, { Component, ReactElement } from 'react'
import { ScrollView, StyleSheet, Button, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Calendar } from 'react-native-calendars'
import { logger } from 'react-native-logs'
import { DateTimeAndDescriptionBox } from '@/components/DateAndDescriptionBox'
import { routeNames } from '@/routes/routeNames'
import { GlobalStateType } from '@/store'
import { setSelectedDate, removeDateDescription } from '@/store/Calendar/actionCreators'

const log = logger.createLogger()
log.setSeverity('debug')

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { setSelectedDate, removeDateDescription }
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
  }

  async componentDidMount(): Promise<void> {
    if (!this.props.isLoadedFirstTime) {
      // this.props.fetchDataFromLocalStorage()
    }
  }

  render(): ReactElement {
    const datesForCalendar = this.props.dates.reduce((result, element) => {
      result[element.dateStr] = { selected: true, selectedColor: '#9ee' }
      return result
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any)

    const manualSelectedDate = this.props.selectedDateStr
      ? {
          [this.props.selectedDateStr]: { selected: true, selectedColor: '#44e' },
        }
      : {}

    const showedDates = this.props.dates.filter((a) => a.dateStr === this.props.selectedDateStr)

    return (
      <ScrollView>
        <Calendar
          style={styles.calendarStyle}
          onDayPress={(day) => {
            log['debug'](`MainScreenComponent: Selected day: ${day.dateString}`)
            this.props.setSelectedDate(day.dateString)
          }}
          markedDates={{
            ...datesForCalendar,
            ...manualSelectedDate,
          }}
        />
        <View style={styles.addButton}>
          <Button
            onPress={() => this.props.navigation.navigate(routeNames.AddScreen)}
            title="Add"
          />
        </View>

        <DateTimeAndDescriptionBox
          arr={showedDates}
          remove={(dateStr: string, hours: number, minutes: number) => {
            this.props.removeDateDescription(dateStr, hours, minutes)
          }}
          navigate={this.props.navigation.navigate}
        />
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

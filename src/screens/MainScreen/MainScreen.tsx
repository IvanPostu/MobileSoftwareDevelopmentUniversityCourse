import React, { Component, ReactElement } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Calendar } from 'react-native-calendars'
import { logger } from 'react-native-logs'
import { Bar } from './Bar'
import { FindBar } from './FindBar'
import { DateAndDescriptionBox } from './DateAndDescriptionBox'

import { GlobalStateType } from '@/store'
import { setSelectedDate } from '@/store/Calendar/actionCreators'
import { findDescription } from './findDescriptionForDateStr'
import { routes } from '@/routes/routes'
import { saveJsObjectIntoXMLFile } from '@/services/xmlStorage'

const log = logger.createLogger()
log.setSeverity('debug')

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { setSelectedDate }
  return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state: GlobalStateType) {
  // log['debug']('state: ', state)
  return {
    selectedDateStr: state.calendarReducer.selectedDateStr,
    selectedDateDescription: state.calendarReducer.descriptionForSelectedDate,
    dates: state.calendarReducer.dates,
  }
}

type MainScreenComponentPropType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: {
      navigate: (a: string) => void
    }
  }

class MainScreenComponent extends Component<MainScreenComponentPropType> {
  constructor(props: MainScreenComponentPropType) {
    super(props)
    const initialDateStr: string = new Date().toISOString().slice(0, 10)
    this.props.setSelectedDate(initialDateStr, findDescription(initialDateStr, this.props.dates))
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
            this.props.setSelectedDate(
              day.dateString,
              findDescription(day.dateString, this.props.dates),
            )
          }}
          markedDates={{
            ...dates,
            ...manualSelectedDate,
          }}
        />
        <Bar
          onAddClick={() => this.props.navigation.navigate(routes['AddScreen'].routeName)}
          onDeleteClick={() => {}}
          onUpdateClick={() => {}}
        />
        <FindBar />
        <DateAndDescriptionBox
          dateStr={this.props.selectedDateStr}
          description={this.props.selectedDateDescription}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  calendarStyle: {
    marginTop: 0,
  },
})

export const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenComponent)
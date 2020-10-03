import React, { FC, useCallback } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { Fragment } from 'react'

type TimePickerPropType = {
  onTimeChange: (hours: number, minute: number) => void
  hours: number
  minutes: number
}

const hours: Array<number> = [...Array(24).keys()]
const minutes: Array<number> = [...Array(60).keys()]

export const TimePicker: FC<TimePickerPropType> = (props) => {
  const setHours = useCallback(
    (hours: number) => {
      props.onTimeChange(hours, props.minutes)
    },
    [props.minutes, props.hours],
  )
  const setMinutes = useCallback(
    (minutes: number) => {
      props.onTimeChange(props.hours, minutes)
    },
    [props.minutes, props.hours],
  )

  return (
    <Fragment>
      <Text style={{ color: 'white' }}>Select time:</Text>
      <View style={styles.container}>
        <View style={styles.timePicker}>
          <Text style={{ color: 'black', textAlign: 'center' }}>Hours:</Text>
          <Picker
            selectedValue={props.hours}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => setHours(Number(itemValue))}
          >
            {hours.map((item, index) => (
              <Picker.Item
                key={index}
                label={item < 10 ? '0' + String(item) : String(item)}
                value={item}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.timePicker}>
          <Text style={{ color: 'black', textAlign: 'center' }}>Minutes:</Text>
          <Picker
            selectedValue={props.minutes}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => setMinutes(Number(itemValue))}
          >
            {minutes.map((item, index) => (
              <Picker.Item
                key={index}
                label={item < 10 ? '0' + String(item) : String(item)}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  timePicker: {
    backgroundColor: 'white',
    margin: 10,
  },
})

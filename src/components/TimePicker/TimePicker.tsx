import React, { FC, useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { Fragment } from 'react'

type TimePickerPropType = {
  onTimeChange: (hours: number, minute: number) => void
}

const hours: Array<number> = [...Array(24).keys()]
const minutes: Array<number> = [...Array(60).keys()]

export const TimePicker: FC<TimePickerPropType> = (props) => {
  const [time, setTime] = useState<{ hours: number; minute: number }>({
    hours: 0,
    minute: 0,
  })

  useEffect(() => {
    props.onTimeChange(time.hours, time.minute)
  }, [time])

  return (
    <Fragment>
      <Text style={{ color: 'white' }}>Select time:</Text>
      <View style={styles.container}>
        <View style={styles.timePicker}>
          <Text style={{ color: 'black', textAlign: 'center' }}>Hours:</Text>
          <Picker
            selectedValue={time.hours}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => setTime({ ...time, hours: Number(itemValue) })}
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
            selectedValue={time.minute}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => setTime({ ...time, minute: Number(itemValue) })}
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

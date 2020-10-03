import { DateTimeType } from '@/store/Calendar/types'
import React, { FC, PropsWithChildren, ReactElement, useCallback } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

type BarPropType = {
  arr: Array<DateTimeType>
  remove: (dateStr: string, hours: number, minutes: number) => void
} & PropsWithChildren<unknown>

export const DateTimeAndDescriptionBox: FC<BarPropType> = (props): ReactElement => {
  const onRemoveCallback = useCallback((dateStr: string, hours: number, minutes: number) => {
    Alert.alert(
      'Confirm',
      `Remove event ???`,
      [
        {
          text: 'Yes',
          onPress: () => props.remove(dateStr, hours, minutes),
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }, [])

  let elements
  if (props.arr && props.arr.length) {
    elements = props.arr.map((item, index) => (
      <View
        style={{
          ...styles.container,
          ...{ backgroundColor: index % 2 === 0 ? '#e9e9e9' : '#e7e7e7' },
        }}
        key={index}
      >
        <View>
          <Text style={styles.dateText}>
            {item.dateStr}
            {`  ${item.hours <= 9 ? '0' + String(item.hours) : String(item.hours)}:${
              item.minutes <= 9 ? '0' + String(item.minutes) : String(item.minutes)
            }`}
          </Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => {}} title="Update" />
          <Button
            color="#ad4040"
            onPress={() => onRemoveCallback(item.dateStr, item.hours, item.minutes)}
            title="Remove"
          />
        </View>
      </View>
    ))
  } else {
    elements = (
      <View style={styles.container}>
        <Text>Empty...</Text>
      </View>
    )
  }

  return <View>{elements}</View>
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#eee',
    padding: 5,
    marginTop: 10,
    width: '100%',
    // borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
  },
})

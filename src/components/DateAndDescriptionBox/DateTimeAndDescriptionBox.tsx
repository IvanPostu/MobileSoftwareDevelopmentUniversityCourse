import { DateTimeType } from '@/store/Calendar/types'
import React, { FC, Fragment, PropsWithChildren, ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type BarPropType = {
  arr: Array<DateTimeType>
} & PropsWithChildren<unknown>

export const DateTimeAndDescriptionBox: FC<BarPropType> = (props): ReactElement => {
  let elements
  if (props.arr && props.arr.length) {
    elements = props.arr.map((item, index) => (
      <Fragment key={index}>
        <View>
          <Text style={styles.dateText}>{item.dateStr}</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </Fragment>
    ))
  } else {
    elements = <Text>Empty...</Text>
  }

  return <View style={styles.container}>{elements}</View>
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#eee',
    padding: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
  },
})

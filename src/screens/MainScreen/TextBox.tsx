import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type BarPropType = {
  dateStr?: string
  description?: string
} & PropsWithChildren<unknown>

export const TextBox: FC<BarPropType> = ({ dateStr = 'Loading...', description }): ReactElement => {
  if (!description) description = 'No description...'

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>{dateStr}</Text>
      </View>
      <View>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
  },
})

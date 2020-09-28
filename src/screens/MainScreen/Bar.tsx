import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { View, Button, StyleSheet } from 'react-native'

type BarPropType = {
  onAddClick: () => void
  onUpdateClick: () => void
  onDeleteClick: () => void
} & PropsWithChildren<unknown>

export const Bar: FC<BarPropType> = (props): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button disabled={false} onPress={props.onAddClick} title="Add" />
      </View>
      <View style={styles.btn}>
        <Button onPress={props.onUpdateClick} title="Update" />
      </View>
      <View style={styles.btn}>
        <Button onPress={props.onDeleteClick} title="Remove" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#444',
  },
  btn: {
    margin: 5,
  },
})

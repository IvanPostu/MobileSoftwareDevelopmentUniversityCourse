import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'

type BarPropType = PropsWithChildren<unknown>

export const FindBar: FC<BarPropType> = (props): ReactElement => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputStyle} />
      <Button onPress={() => {}} title="Find" />
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
  inputStyle: {
    color: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 6,
    borderColor: 'grey',
    marginRight: 7,
    width: '70%',
  },
})

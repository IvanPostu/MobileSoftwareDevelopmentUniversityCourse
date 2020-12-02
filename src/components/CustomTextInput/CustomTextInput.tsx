import React from 'react'
import { StyleSheet, TextInput, TextStyle } from 'react-native'

type CustomTextInputPropType = {
  placeholder?: string
  style?: TextStyle
  multiline?: boolean
}

export const CustomTextInput = (props: CustomTextInputPropType) => {
  const placeholder = props.placeholder || ''
  const dStyle = props.style || {}

  return (
    <TextInput
      multiline={props.multiline}
      placeholder={placeholder}
      style={{ ...styles.container, ...dStyle }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgb(190, 190, 190)',
    borderRadius: 6,
    paddingHorizontal: 20,
  },
})

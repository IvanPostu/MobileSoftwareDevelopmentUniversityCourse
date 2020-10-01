import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { GlobalStateType } from '@/store'
import { addNewDateDescription, setSelectedDate } from '@/store/Calendar/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    selectedDateStr: state.calendarReducer.selectedDateStr,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { addNewDateDescription, setSelectedDate }
  return bindActionCreators(actionCreators, dispatch)
}

type AddScreenComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: {
      navigate: (a: string) => void
    }
  }
type AddScreenComponentStateType = {
  inputStr: string
}

class AddScreenComponent extends Component<
  AddScreenComponentPropType,
  AddScreenComponentStateType
> {
  // private navigator: ReturnType<typeof useNavigation>

  constructor(props: AddScreenComponentPropType) {
    super(props)
    this.state = {
      inputStr: '',
    }

    this.onAddDescriptionButtonClick = this.onAddDescriptionButtonClick.bind(this)
  }

  onAddDescriptionButtonClick(): void {
    const description: string = this.state.inputStr
    const dateStr: string = this.props.selectedDateStr
    if (description) {
      this.props.addNewDateDescription({ dateStr, description })
      this.props.setSelectedDate(dateStr, description)
      this.props.navigation.navigate('MainScree_ndff')
    } else {
      Alert.alert('Warning', 'Description can not be empty!!!')
    }
  }

  render(): ReactElement {
    return (
      <ScrollView style={{ backgroundColor: styles.container.backgroundColor }}>
        <View style={styles.container}>
          <Text style={{ color: 'white' }}>Add description for: {this.props.selectedDateStr}</Text>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                inputStr: text,
              })
            }
            multiline={true}
            style={styles.inputStyle}
          />
          <Button onPress={this.onAddDescriptionButtonClick} title={`Add description`} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#333',
  },
  inputStyle: {
    color: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 6,
    borderColor: 'grey',
    marginRight: 7,
    width: '70%',
    height: 200,
  },
})

export const AddScreen = connect(mapStateToProps, mapDispatchToProps)(AddScreenComponent)

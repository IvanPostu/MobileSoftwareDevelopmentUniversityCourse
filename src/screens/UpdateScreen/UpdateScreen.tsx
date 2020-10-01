import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { GlobalStateType } from '@/store'
import { updateDateDescription, setSelectedDate } from '@/store/Calendar/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    selectedDateStr: state.calendarReducer.selectedDateStr,
    descriptionForSelectedDate: state.calendarReducer.descriptionForSelectedDate,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { updateDateDescription, setSelectedDate }
  return bindActionCreators(actionCreators, dispatch)
}

type UpdateScreenComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    navigation: {
      navigate: (a: string) => void
    }
  }
type UpdateScreenComponentStateType = {
  inputStr: string
}

class UpdateScreenComponent extends Component<
  UpdateScreenComponentPropType,
  UpdateScreenComponentStateType
> {
  // private navigator: ReturnType<typeof useNavigation>

  constructor(props: UpdateScreenComponentPropType) {
    super(props)
    this.state = {
      inputStr: this.props.descriptionForSelectedDate,
    }

    this.onUpdateDescriptionButtonClick = this.onUpdateDescriptionButtonClick.bind(this)
  }

  onUpdateDescriptionButtonClick(): void {
    const description: string = this.state.inputStr
    const dateStr: string = this.props.selectedDateStr
    if (description) {
      this.props.updateDateDescription({ dateStr, description })
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
          <Text style={{ color: 'white' }}>
            Update description for: {this.props.selectedDateStr}
          </Text>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                inputStr: text,
              })
            }
            defaultValue={this.state.inputStr}
            multiline={true}
            style={styles.inputStyle}
          />
          <Button onPress={this.onUpdateDescriptionButtonClick} title={`Update description`} />
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

export const UpdateScreen = connect(mapStateToProps, mapDispatchToProps)(UpdateScreenComponent)

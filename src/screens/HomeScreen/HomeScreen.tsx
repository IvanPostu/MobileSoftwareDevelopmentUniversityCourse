import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { CustomTextInput } from '@/components/CustomTextInput/CustomTextInput'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { rootGreenColor } from '@/constants'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'

type DoctorListScreenPropType = {
  navigation: NavigationProp<ParamListBase>
}

export class HomeScreen extends Component<DoctorListScreenPropType> {
  render(): ReactElement {
    return (
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <CustomHeader
            leftElement={<View style={{ width: 30 }} />}
            centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Home</Text>}
            rightElement={<ThreePoints onClick={() => console.log(1)} />}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <ButtonOne
                style={{ width: 240 }}
                textColor={rootGreenColor}
                bgColor={'transparent'}
                borderColor={rootGreenColor}
                onClick={() => console.log('adfadf')}
              >
                VERY URGENT
              </ButtonOne>
            </View>
            <View style={styles.inputsContainer}>
              <Text style={styles.inputTitle}>Name</Text>
              <CustomTextInput placeholder="Your Name" />

              <Text style={styles.inputTitle}>Desease</Text>
              <CustomTextInput placeholder="What is your illness" />

              <Text style={styles.inputTitle}>Location</Text>
              <CustomTextInput placeholder="Where you location" />

              <Text style={styles.inputTitle}>Decription (Optional)</Text>
              <CustomTextInput style={{ height: 90 }} multiline placeholder="Description Here" />
            </View>
            <View style={{ paddingHorizontal: 10, marginVertical: 25, marginBottom: 40 }}>
              <ButtonOne
                fullWidth
                textColor={'white'}
                bgColor={rootGreenColor}
                borderColor={rootGreenColor}
                onClick={() => console.log('adfadf')}
              >
                Request
              </ButtonOne>
            </View>
          </ScrollView>
        </View>
        <BottomMenu
          navigation={this.props.navigation}
          selected={'Home'}
          notificationsIsPresent={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  childContainer: {
    width: '100%',
    height: Dimensions.get('screen').height - 50,
  },
  scrollContainer: {
    height: '100%',
    marginHorizontal: 15,
  },
  inputsContainer: {
    padding: 10,
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 25,
    color: 'rgb(70, 70, 70)',
  },
})

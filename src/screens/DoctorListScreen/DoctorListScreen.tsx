import { BackArrow } from '@/components/BackArrow/BackArrow'
import { BottomMenu } from '@/components/BotomMenu/BottomMenu'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { DoctorCard } from '@/components/DoctorCard/DoctorCard'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { routeNames } from '@/routes/routeNames'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

function mapStateToProps(state: GlobalStateType) {
  return {
    notifications: state.notificationsReducer.notifications,
    doctors: state.doctorsReducer.doctors,
  }
}

type DoctorListScreenPropType = {
  navigation: NavigationProp<ParamListBase>
} & ReturnType<typeof mapStateToProps>

class DoctorListScreenComponent extends Component<DoctorListScreenPropType> {
  constructor(props: DoctorListScreenPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <CustomHeader
            leftElement={<BackArrow onClick={() => this.props.navigation.goBack()} />}
            centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Doctor List</Text>}
            rightElement={<ThreePoints onClick={() => console.log(1)} />}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.cardsContainer}>
            {this.props.doctors.map((item) => {
              return (
                <DoctorCard
                  onClick={() =>
                    this.props.navigation.navigate(routeNames.DoctorDetailsScreen, {
                      doctorId: item.doctorId,
                    })
                  }
                  key={item.doctorId}
                  address={item.address}
                  doctorName={item.name}
                  doctorType={item.specialisation}
                  doctorPhoto={item.image}
                  likes={item.grade}
                />
              )
            })}
            <View style={{ marginBottom: 30 }}></View>
          </ScrollView>
        </View>
        <BottomMenu
          navigation={this.props.navigation}
          selected={'Home'}
          notificationsIsPresent={this.props.notifications.length > 0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(240, 240, 240)',
  },
  childContainer: {
    width: '100%',
    height: Dimensions.get('screen').height - 50,
  },
  cardsContainer: {
    height: '100%',
    marginHorizontal: 15,
  },
})

export const DoctorListScreen = connect(mapStateToProps)(DoctorListScreenComponent)

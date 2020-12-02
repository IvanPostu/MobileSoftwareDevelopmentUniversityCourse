import { BackArrow } from '@/components/BackArrow/BackArrow'
import { CustomHeader } from '@/components/CustomHeader/CustomHeader'
import { DoctorCardA } from '@/components/DoctorCardA/DoctorCardA'
import { ThreePoints } from '@/components/Icons/ThreePoints/ThreePoints'
import { GlobalStateType } from '@/store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native'
import { connect } from 'react-redux'
import location from '@/assets/location.png'
import maps from '@/assets/maps.png'
import { ButtonOne } from '@/components/ButtonOne/ButtonOne'
import { rootGreenColor } from '@/constants'
import { BottomMenu } from '@/components/BotomMenu/BottomMenu'

function mapStateToProps(state: GlobalStateType) {
  return {
    doctors: state.doctorsReducer.doctors,
  }
}

type DoctorDetailsScreenComponentPropType = {
  navigation: NavigationProp<ParamListBase>
  route: {
    params: {
      doctorId: string
    }
  }
} & ReturnType<typeof mapStateToProps>

export class DoctorDetailsScreenComponent extends Component<DoctorDetailsScreenComponentPropType> {
  private _doctor: {
    doctorName: string
    doctorType: string
    doctorNote: string
    doctorImage: ImageSourcePropType
    doctorLocation: string
    doctorDescription: string
  }

  constructor(props: DoctorDetailsScreenComponentPropType) {
    super(props)
    const doctorId = props.route.params.doctorId
    const d = props.doctors.find((a) => a.doctorId === doctorId)
    this._doctor = {
      doctorImage: d?.image as ImageSourcePropType,
      doctorName: d?.name as string,
      doctorNote: d?.grade as string,
      doctorType: d?.specialisation as string,
      doctorLocation: d?.address as string,
      doctorDescription: d?.description as string,
    }
  }

  render(): ReactElement {
    return (
      <View style={styles.container}>
        <CustomHeader
          leftElement={<BackArrow onClick={() => this.props.navigation.goBack()} />}
          centerElement={<Text style={{ fontSize: 22, color: 'white' }}>Doctor Details</Text>}
          rightElement={<ThreePoints onClick={() => console.log(1)} />}
        />
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <DoctorCardA
            doctorImage={this._doctor.doctorImage}
            rightMargin={40}
            style={{
              borderColor: 'transparent',
              borderBottomColor: 'rgb(241,241,241)',
            }}
            onClick={() => console.log(1)}
            doctorName={this._doctor.doctorName}
            doctorNote={this._doctor.doctorNote}
            doctorType={this._doctor.doctorType}
          />
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>Short description</Text>
            <Text style={styles.text}>{this._doctor.doctorDescription}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>Location</Text>
            <View
              style={{
                width: '100%',
                height: 25,
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 15,
              }}
            >
              <Image style={{ width: 20, height: 25 }} source={location} />
              <Text style={{ marginLeft: 5, color: 'grey' }}>{this._doctor.doctorLocation}</Text>
            </View>
          </View>
          <View>
            <Image style={styles.maps} source={maps} />
          </View>
          <View>
            <ButtonOne
              textColor="white"
              style={{ marginVertical: 35 }}
              fullWidth
              bgColor={rootGreenColor}
              borderColor={rootGreenColor}
              onClick={() => console.log(1)}
            >
              Request
            </ButtonOne>
          </View>
        </ScrollView>
        <BottomMenu navigation={this.props.navigation} selected={'Home'} notificationsIsPresent />
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
  scrollContainer: {
    height: '100%',
    marginHorizontal: 15,
  },
  title: {
    fontWeight: '700',
    marginTop: 25,
    color: 'rgb(56,71,78)',
    fontSize: 18,
  },
  text: {
    marginTop: 12,
    color: 'rgb(96,123,140)',
    lineHeight: 24,
    fontSize: 16,
  },
  maps: {
    width: 400,
    height: 210,
  },
})

export const DoctorDetailsScreen = connect(mapStateToProps)(DoctorDetailsScreenComponent)

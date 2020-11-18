import { rootGreenColor } from '@/constants'
import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import doctorPhoto from '@/assets/p1.png'
import startImg from '@/assets/star.png'

type DoctorInfoPropType = {
  doctorName: string
  doctorType: string
  doctorNote: string
}

export const DoctorInfo = (props: DoctorInfoPropType): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={cardStyle.container}>
          <Image style={cardStyle.img} source={doctorPhoto} />
          <View style={cardStyle.content}>
            <View style={cardStyle.line1}>
              <Text style={cardStyle.medicName}>{props.doctorName}</Text>
            </View>
            <View style={cardStyle.line2}>
              <Text style={{ fontStyle: 'italic', color: 'rgb(8, 218, 95)', fontSize: 15 }}>
                {props.doctorType}
              </Text>
            </View>
            <View style={cardStyle.line3}>
              <Image style={{ width: 20, height: 20, marginRight: 5 }} source={startImg} />
              <Image style={{ width: 20, height: 20, marginRight: 5 }} source={startImg} />
              <Image style={{ width: 20, height: 20, marginRight: 5 }} source={startImg} />
              <Image style={{ width: 20, height: 20, marginRight: 5 }} source={startImg} />
              <Image style={{ width: 20, height: 20, marginRight: 5 }} source={startImg} />
              <Text style={cardStyle.note}>{props.doctorNote}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    marginTop: 30,
    fontSize: 18,
    color: rootGreenColor,
  },
})

const IMAGE_SIZE = 70

const cardStyle = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(241,241,241)',
  },
  img: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginHorizontal: 30,
    left: 15,
  },
  content: {
    width: 200,
    height: 70,
    margin: 5,
  },
  line1: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  medicName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line2: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  line3: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  note: {
    fontSize: 16,
    color: 'rgb(96,123,140)',
  },
})

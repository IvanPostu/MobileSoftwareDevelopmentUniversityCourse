import React, { Component, ReactElement, Fragment } from 'react'
import { RNCamera } from 'react-native-camera'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'

type ScreenShooterPropType = {
  onScreenSnapCallback: (base64RawImage: string) => void
}

type ScreenShooterStateType = {
  // isFrontCamera: boolean
}

export default class ScreenShooter extends Component<
  ScreenShooterPropType,
  ScreenShooterStateType
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private camera: any

  constructor(props: ScreenShooterPropType) {
    super(props)
    this.state = {
      // isFrontCamera: true,
    }

    this.takePicture = this.takePicture.bind(this)
  }

  takePicture = async (): Promise<void> => {
    if (this.camera) {
      const options = {
        quality: 0.02,
        base64: true,
      }

      try {
        const data = await this.camera.takePictureAsync(options)
        console.log(`Image Base64 string length = ${data.base64.length}`)
        // await savePhotoFile(data.base64)
        this.props.onScreenSnapCallback(data.base64)
      } catch (error) {
        Alert.alert('Error', 'Screen capture error!!!')
      }
    }
  }

  render(): ReactElement {
    return (
      <Fragment>
        <RNCamera
          ref={(ref) => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
        />

        <View style={styles.container}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
            <Text>Front camera:</Text>
          </View>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text>Snap </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#a7a7a7',
    borderRadius: 5,
    padding: 6,
    alignSelf: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})

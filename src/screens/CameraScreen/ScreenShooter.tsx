import React, { Component, ReactElement, Fragment } from 'react'
import { RNCamera } from 'react-native-camera'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { logger } from 'react-native-logs'

type ScreenShooterPropType = {
  onScreenSnapCallback: (base64RawImage: string) => void
}

type ScreenShooterStateType = {
  isFrontCamera: boolean
}

const log = logger.createLogger()
log.setSeverity('debug')

export default class ScreenShooter extends Component<
  ScreenShooterPropType,
  ScreenShooterStateType
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private camera: any

  constructor(props: ScreenShooterPropType) {
    super(props)
    this.state = {
      isFrontCamera: true,
    }

    this.takePicture = this.takePicture.bind(this)
  }

  takePicture = async (): Promise<void> => {
    if (this.camera) {
      const options = {
        quality: 0.6,
        base64: true,
      }

      try {
        const data = await this.camera.takePictureAsync(options)
        log['info'](`take picture worked with success!!!`)
        log['debug'](`Image Base64 len = ${data.base64.length}`)

        this.props.onScreenSnapCallback(data.base64)
      } catch (error) {
        log['warn'](error)
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
          type={
            this.state.isFrontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.off}
        />

        <View style={styles.container}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
            <Text>Front camera:</Text>
            <CheckBox
              value={this.state.isFrontCamera}
              disabled={this.state.isFrontCamera}
              onValueChange={() => {
                this.setState({ isFrontCamera: true })
              }}
            />
          </View>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text>Snap {this.state.isFrontCamera ? 'Front' : 'Back'}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
            <Text>Back camera:</Text>
            <CheckBox
              value={!this.state.isFrontCamera}
              disabled={!this.state.isFrontCamera}
              onValueChange={() => {
                this.setState({ isFrontCamera: false })
              }}
            />
          </View>
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

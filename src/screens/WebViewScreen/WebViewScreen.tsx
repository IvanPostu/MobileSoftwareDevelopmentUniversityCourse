import React, { ReactElement, Component } from 'react'
import { WebView } from 'react-native-webview'

type WebViewScreenPropType = {
  route: {
    params: {
      urlPath: string
    }
  }
}

export class WebViewScreen extends Component<WebViewScreenPropType> {
  constructor(props: WebViewScreenPropType) {
    super(props)
  }

  render(): ReactElement {
    const uri: string = this.props.route.params.urlPath

    return <WebView source={{ uri }} />
  }
}

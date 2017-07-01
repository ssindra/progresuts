import React, { Component } from 'react';
import { WebView } from 'react-native';

class Maps extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.google.co.id/maps/@-8.1194074,115.0881031,15z'}}
        style={{marginTop: 20}}
      />
    );
  }
}
export default Maps
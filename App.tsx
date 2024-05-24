import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Index from './Redux/View';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Index />
      </Provider>
    );
  }
}

export default App;

import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/store';
import Routes from './src/Routes';

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          translucent={true}
          //Bo header trong phien ban Android
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <Routes />
      </PersistGate>
    </Provider>
  );
}

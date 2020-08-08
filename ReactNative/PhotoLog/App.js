import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'context-q';
import React from 'react';
import AppNavigator from './navigator/AppNavigator';

const App = () => {
  return (
    <>
      <Provider defaultState={{showDate: false}}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;

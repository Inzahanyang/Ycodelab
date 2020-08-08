import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Form from '../pages/Form';
import List from '../pages/List';
import Settings from '../pages/Settings';
import View from '../pages/View';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="View" component={View} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

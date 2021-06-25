/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountPage from './pages/accounts';
import StatementsPage from './pages/statements';
import SystemPage from './pages/system';
import {PAGE_NAME} from './config'


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={PAGE_NAME.statements}>
        <Tab.Screen name={PAGE_NAME.accounts} component={AccountPage} options={{title:'账户'}}/>
        <Tab.Screen name={PAGE_NAME.statements} component={StatementsPage} options={{title:'流水'}} />
        <Tab.Screen name={PAGE_NAME.system} component={SystemPage} options={{title:'系统'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

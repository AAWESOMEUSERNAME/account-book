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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Config from 'react-native-config'
import StorybookUI from '../storybook'

import AccountPage from './pages/accounts';
import StatementsPage from './pages/statements';
import SystemPage from './pages/system';
import {page_name, theme} from './config';
import {
  AccountIconDark,
  AccountIconLight,
  DataIconDark,
  DataIconLight,
  StatementIconDark,
  StatementIconLight,
  SystemIconDark,
  SystemIconLight
} from './components/Images';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={page_name.statements} screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case page_name.accounts:
              return focused ? <AccountIconDark/> : <AccountIconLight/>;
            case page_name.statements:
              return focused ? <StatementIconDark/> : <StatementIconLight/>;
            case page_name.system:
              return focused ? <SystemIconDark/> : <SystemIconLight/>;
            default:
              return focused ? <DataIconDark/> : <DataIconLight/>;
          }
        },
      })} tabBarOptions={{
        activeTintColor: theme.color.main.dark,
        inactiveTintColor: theme.color.main.dark,
        activeBackgroundColor: theme.color.main.light,
        inactiveBackgroundColor: theme.color.white,
        labelStyle: {fontSize: theme.font.size.normal}
      }}>
        <Tab.Screen name={page_name.accounts} component={AccountPage} options={{title: '账户'}}/>
        <Tab.Screen name={page_name.statements} component={StatementsPage} options={{title: '流水'}}/>
        <Tab.Screen name={page_name.system} component={SystemPage} options={{title: '系统'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;

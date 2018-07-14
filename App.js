import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';

import SplashScreen from './src/containers/SplashScreen/SplashScreen';
import MainView from './src/containers/MainView/MainView';

const StackNavigation = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainView: MainView,
  },
  {
    initialRouteName: 'MainView',
    headerMode: 'none',
  },
);

// const App = () => <StackNavigation />;

export default StackNavigation;

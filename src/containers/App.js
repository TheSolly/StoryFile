// import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
// import { View, StatusBar } from 'react-native';

import SplashScreen from '../components/SplashScreen/SplashScreen';
import AskingState from '../components/AskingState/AskingState';

const StackNavigation = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    AskingState: AskingState,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

// const App = () => <StackNavigation />;

export default StackNavigation;

import React from 'react';
import {
  createStackNavigator, createSwitchNavigator,
} from 'react-navigation';

import EventsScreen from './src/EventsScreen';
import CreateFormScreen from './src/CreateFormScreen';
import InfosScreen from './src/InfosScreen';

import ViewEventScreen from './src/ViewEventScreen';
import NewAccountScreen from './src/NewAccountScreen';
import ViewAccountScreen from './src/ViewAccountScreen';

import SignUpScreen from './src/SignUpScreen';
import ChoosePlanScreen from './src/ChoosePlanScreen';
import BeginScreen from './src/BeginScreen';
import SignInScreen from './src/SignInScreen';
import AuthLoadingScreen from './src/AuthLoadingScreen'; // let's connect!

import colour from './src/Styles/colors';

const AppStack = createStackNavigator(
  {
    Events: {
      screen: EventsScreen,
    },
    CreateForm: {
      screen: CreateFormScreen,
    },
    ViewEvent: {
      screen: ViewEventScreen,
    },
    InfosScreen: {
      screen: InfosScreen,
    },
    NewAccount: {
      screen: NewAccountScreen,
    },
    ViewAccount: {
      screen: ViewAccountScreen,
    },
  },
  {
    initialRouteName: 'Events',
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: { height: 56, backgroundColor: colour.primary },
      headerForceInset: { top: 'never', bottom: 'never' },
    },
  },
);

const AuthStack = createStackNavigator(
  {
    AuthSignIn: {
      screen: SignInScreen,
      path: 'signin',
    },
  },
  {
    initialRouteName: 'AuthSignIn',
    navigationOptions: {
      headerTransparent: true,
    },
  },
);


const SignUpStack = createStackNavigator(
  {
    Begin: {
      screen: BeginScreen,
    },
    ChoosePlan: {
      screen: ChoosePlanScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'Begin',
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: { height: 56, backgroundColor: colour.primary },
      headerForceInset: { top: 'never', bottom: 'never' },
    },
  },
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    SignIn: AuthStack,
    Start: SignUpStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

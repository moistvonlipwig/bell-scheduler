import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import WelcomeScreen from '../screens/WelcomeScreen';
import {ScheduleScreen} from '../screens/ShceduleScreen';
import {TimerScreen} from '../screens/TimerScreen';

import { BottomTabParamList, WelcomeParamList, ScheduleParamList, TimerParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Welcome"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="human-greeting" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-information-circle" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="alarm" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const WelcomeStack = createStackNavigator<WelcomeParamList>();

function WelcomeNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerTitle: 'Welcome' }}
      />
    </WelcomeStack.Navigator>
  );
}

const ScheduleStack = createStackNavigator<ScheduleParamList>();

function ScheduleNavigator() {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerTitle: 'Schedule' }}
      />
    </ScheduleStack.Navigator>
  );
}

const TimerStack = createStackNavigator<TimerParamList>();

function TimerNavigator() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen
        name="TimerScreen"
        component={TimerScreen}
        options={{ headerTitle: 'Timer' }}
      />
    </TimerStack.Navigator>
  );
}

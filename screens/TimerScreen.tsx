import React, { useState, useEffect, useRef, Component } from 'react';
import Constants from 'expo-constants';
import * as Permissions from "expo-permissions";
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import {Audio} from 'expo-av';
import * as Speech from 'expo-speech';

import { Image, ImageStyle, TextStyle, Vibration, View, ViewStyle } from "react-native"
import CheckBox from '@react-native-community/checkbox';
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, Screen, Wallpaper } from "../components"
import { color, spacing } from "../theme"

export const logoRedTeam = require("../assets/images/red-team-small.png")
export const heart = require("../assets/images/heart.png")


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TIMER: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TIMER_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const REDTEAM: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}

const ALARM_SETTINGS_CONTAINER: ViewStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
}

const CHECKBOX_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginBottom: 20,
}

const CHECKBOX_STYLE: ViewStyle =  {
  alignSelf: "center"
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const TimerScreen = observer(function TimerScreen() {

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS
  ];

  const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();
  const intervalRef = useRef();
  const [sound, setSound] = React.useState();
  const [vibrate, setVibrate] = React.useState();
  const [howl, setHowl] = React.useState();
  const [seconds, setSeconds] = React.useState('');


  useEffect(() => {

    let interval = null;
    schedulePushNotification();

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log(notification);
      console.log('Received');
      playSound();
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Received notification');
      console.log(response);
    });

    interval = setInterval(() => {
      const now = new Date();
      const first_class = new Date();
      const second_class = new Date()
      const third_class = new Date()

      first_class.setHours(7, 55);
      second_class.setHours(9,10);
      third_class.setHours(10,55);

      let diff_time = now - first_class;
      const new_date = now.getDate();

      if(now.getTime() > first_class.getTime() && now.getTime() < second_class.getTime()) {
        diff_time = second_class - now;
      }
      else if (now.getTime() > second_class.getTime() && now.getTime() < third_class.getTime()) {
        diff_time = third_class - now;
      }
      else if (now.getTime() > third_class.getTime()) {
        first_class.setDate(new_date+1)
        diff_time = first_class - now;
      }
      setSeconds(seconds => (diff_time/1000).toString().toHHMMSS());
    }, 1000);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      clearInterval(intervalRef.current);
    };
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    try {
      const settings = {howl, vibrate};
      SecureStore.setItemAsync('pack-settings',JSON.stringify(settings));
      console.log('Update the settings in store');
    } catch (e) {
      console.log(e);
    }
  }, [howl]);

  React.useEffect(() => {
    try {
      const settings = {howl, vibrate};
      SecureStore.setItemAsync('pack-settings',JSON.stringify(settings));
      console.log('Update the settings in store');
    } catch (e) {
      console.log(e);
    }
  }, [vibrate]);

  function speak() {
    var thingToSay = 'Almost time for class';
    Speech.speak(thingToSay);
  }

  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  async function playSound() {
    let myJson;
    const settings  = await SecureStore.getItemAsync('pack-settings');
    console.log('value of settings: ', settings);
      if (settings) {
        myJson = JSON.parse(settings);
        if(myJson.vibrate) {
          Vibration.vibrate(10 * ONE_SECOND_IN_MS);
        }
        if (myJson.howl) {
          console.log('Loading Sound');
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audio/wolf8.mp3')
          );
          setSound(sound);
          console.log('Playing Sound');
          await sound.playAsync();
        }
      }
    speak();
  }

  return (
    <View testID="TimerScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="timerScreen.appName"
          leftIcon="back"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text style={TITLE} preset="header" tx="timerScreen.title" />
        <Text style={TAGLINE} tx="timerScreen.tagLine" />
        <Text style={TITLE}>{seconds}</Text>
        <View style={ALARM_SETTINGS_CONTAINER}>
          <View style={CHECKBOX_CONTAINER}>
            <CheckBox
              value={vibrate}
              onValueChange={setVibrate}
              style={CHECKBOX_STYLE}
            />
            <Text style={TAGLINE}>Vibrate?</Text>
            <CheckBox
              value={howl}
              onValueChange={setHowl}
              style={CHECKBOX_STYLE}
            />
            <Text style={TAGLINE}>Howl?</Text>
          </View>
        </View>
        <BulletItem text="Period : 1 (Starts 07:30)" />
        <BulletItem text="Period : 2 (Starts 09:10)" />
        <BulletItem text="Period : 3 (Starts 10:55)" />
        <Image source={logoRedTeam} style={REDTEAM} />
        <View style={LOVE_WRAPPER}>
          <Text style={LOVE} text="Made with" />
          <Image source={heart} style={HEART} />
        </View>
        <View style={LOVE_WRAPPER}>
          <Text style={LOVE} text="Parissa and Angelina" />
        </View>
        <View style={LOVE_WRAPPER}>
          <Text style={LOVE} text="(GOHS Red Team)"/>
        </View>
        <View>
          <Button
            style={TIMER}
            textStyle={TIMER_TEXT}
            tx="timerScreen.mute"
            onPress={playSound}
          />
        </View>
      </Screen>
    </View>
  )
})

async function schedulePushNotification() {
  // If Tues-Friday
  // 0730
  // 0910
  // 1055
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bell Reminder",
      body: 'Class is about to begin',
      data: { data: 'Period 1, start time 07:30' },
    },
    trigger: {
      hour: 7,
      minute: 25,
      repeats: true
    }
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bell Reminder",
      body: 'Class is about to begin',
      data: { data: 'Period 2, start time 07:30' },
    },
    trigger: {
      hour: 9,
      minute: 5,
      repeats: true
    }
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bell Reminder",
      body: 'Class is about to begin',
      data: { data: 'Period 2, start time 07:30' },
    },
    trigger: {
      hour: 10,
      minute: 55,
      repeats: true
    }
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
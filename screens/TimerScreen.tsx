import React, { useState, useEffect, useRef } from 'react';
import * as Calendar from 'expo-calendar';
import {Audio} from 'expo-av';

import { Image, ImageStyle, TextStyle, Vibration, View, ViewStyle } from "react-native"
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

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync();
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

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

  const [sound, setSound] = React.useState();
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  async function playSound() {
    Vibration.vibrate(10 * ONE_SECOND_IN_MS);
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/audio/wolf8.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

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
        <BulletItem text="Period : 0" />
        <BulletItem text="Period : 1" />
        <BulletItem text="Period : 2" />
        <BulletItem text="Period : 3" />
        <View>
          <Button
            style={TIMER}
            textStyle={TIMER_TEXT}
            tx="timerScreen.mute"
            onPress = {playSound}
          />
        </View>
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
      </Screen>
    </View>
  )
})

import * as React from 'react';
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native";
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../components"
import { color, spacing, typography } from "../theme";
import { Audio } from 'expo-av';

const GOHSLogo = require("../assets/images/NEW-GOHS.png")
const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const GOHSLogoStyle: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", marginBottom: 64 }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}


export default function WelcomeScreen() {
  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Bell Scheduler" />
        </Text>
        <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
        <Image
          source={GOHSLogo}
          style={GOHSLogoStyle}
        />
        <Text style={CONTENT}>
          Ready to allow the Bell Scheduler to remind you of the daily bell schedule?
        </Text>
        <Text style={CONTENT}>
          The Pack will howl at the end of every period and a few minutes before your next.
        </Text>
      </Screen>
    </View>
  );
}

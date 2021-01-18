import React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Header } from "../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../theme"

const GOHSSchedule = require("../assets/images/schedule.png")


const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1
}
const BOLD: TextStyle = { fontWeight: "bold" }
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

const GOHSScheduleStyle: ImageStyle = {
  marginVertical: spacing[5]
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const ScheduleScreen = observer(function ScheduleScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  return (
    <View testID="TimerScreen" style={ROOT}>
      <Screen style={CONTAINER} preset="scroll">
        <Header
          headerTx="timerScreen.appName"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <SafeAreaView>
          <ScrollView  horizontal={true}>
            <Image
              source={GOHSSchedule}
              style={GOHSScheduleStyle}
            />
          </ScrollView>
        </SafeAreaView>
      </Screen>
    </View>
  )
})

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LocalNotificationsScreen from "../screens/LocalNotificationsScreen";
import PushNotificationsScreen from "../screens/PushNotificationsScreen";

const BottomTab = createBottomTabNavigator();
export default function Router() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBarOptions={{ style: { backgroundColor: "black" } }}
      >
        <BottomTab.Screen
          name="LocalNotificationsScreen"
          component={LocalNotificationsScreen}
          options={{ title: "Local Notifications" }}
        />

        <BottomTab.Screen
          name="PushNotificationsScreen"
          component={PushNotificationsScreen}
          options={{ title: "Push Notifications" }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

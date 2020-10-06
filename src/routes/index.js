import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LocalNotificationsScreen from "../screens/LocalNotificationsScreen";
import PushNotificationsScreen from "../screens/PushNotificationsScreen";
import PushNotificationsCategoriesScreen from "../screens/PushNotificationsCategoriesScreen";

import { LocalNotificationsIcon, PushNotificationsIcon } from "../assets/icons";

const PushNotificationsStackNavigator = () => {
  const PushNotificationsStack = createStackNavigator();

  return (
    <PushNotificationsStack.Navigator>
      <PushNotificationsStack.Screen
        name="PushNotificationsScreen"
        component={PushNotificationsScreen}
        options={{ headerShown: false }}
      />

      <PushNotificationsStack.Screen
        name="PushNotificationsCategoriesScreen"
        component={PushNotificationsCategoriesScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          title: "Push Notifications Interativas",
        }}
      />
    </PushNotificationsStack.Navigator>
  );
};

export default function Router() {
  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBarOptions={{
          style: { backgroundColor: "black" },
          labelStyle: { marginBottom: 4 },
          iconStyle: { marginBottom: -4, marginTop: 4 },
        }}
      >
        <BottomTab.Screen
          name="LocalNotificationsScreen"
          component={LocalNotificationsScreen}
          options={{
            title: "Local Notifications",
            tabBarIcon: ({ focused }) => (
              <LocalNotificationsIcon focused={focused} />
            ),
          }}
        />

        <BottomTab.Screen
          name="PushNotificationsScreen"
          component={PushNotificationsStackNavigator}
          options={{
            title: "Push Notifications",
            tabBarIcon: ({ focused }) => (
              <PushNotificationsIcon focused={focused} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

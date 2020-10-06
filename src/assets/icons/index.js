import React from "react";
import { Foundation, AntDesign } from "@expo/vector-icons";

// Bottom-tab
export const LocalNotificationsIcon = ({ focused }) => (
  <AntDesign
    name="notification"
    size={24}
    color={focused ? "rgb(0, 122, 255)" : "rgb(255, 255, 255)"}
  />
);
export const PushNotificationsIcon = ({ focused }) => (
  <Foundation
    name="web"
    size={24}
    color={focused ? "rgb(0, 122, 255)" : "rgb(255, 255, 255)"}
  />
);

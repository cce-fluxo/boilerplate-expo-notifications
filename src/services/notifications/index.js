import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export * from "./getExpoPushToken";
export * from "./useReceivedNotification";
export * from "./scheduleLocalNotifcation";
export * from "./createTextInputNotificationCategory";
export * from "./dismissNotification";

import * as Notifications from "expo-notifications";

export const dismissNotification = async ({ identifier }) => {
  try {
    await Notifications.dismissNotificationAsync(identifier);
  } catch (error) {
    throw error;
  }
};

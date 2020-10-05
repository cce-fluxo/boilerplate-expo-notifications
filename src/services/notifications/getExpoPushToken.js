import * as Notifications from "expo-notifications";

export const getExpoPushNotificationsToken = async () => {
  try {
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();
    return expoPushToken;
  } catch (error) {
    throw error;
  }
};

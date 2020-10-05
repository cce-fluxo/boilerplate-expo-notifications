import { useEffect } from "react";
import * as Notifications from "expo-notifications";

/* This hook enables that when a notification is triggered on the user's device,
 either when the user is using the app (foreground) or in another app (background),
the functions handleForegroundNotification and handleBackgroundNotification are
called with some data of the notification as the parameter */

export const useReceivedNotification = ({
  handleForegroundNotification,
  handleBackgroundNotification,
}) => {
  useEffect(() => {
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      handleForegroundNotification
    );

    return () => foregroundSubscription.remove();
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      handleBackgroundNotification
    );

    return () => backgroundSubscription.remove();
  }, []);
};

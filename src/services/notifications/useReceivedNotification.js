import { useEffect } from "react";
import * as Notifications from "expo-notifications";

/* 
Este hook permite que quando uma notificação é acionada no dispositivo do usuário,
se o usuário está usando o aplicativo (foreground) ou em outro aplicativo (background),
as funções handleForegroundNotification e handleBackgroundNotification são
chamadas com dados da notificação como parâmetro */

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

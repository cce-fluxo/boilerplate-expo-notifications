import { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";

export const useNotificationsPermission = () => {
  const [hasNotificationsPermission, setHasNotificationsPermission] = useState(
    false
  );
  const [canAskForPermission, setCanAskForPermission] = useState(true);
  const [
    loadingNotificationsPermission,
    setLoadingNotificationsPermission,
  ] = useState(true);

  const getNotificationsPermission = async () => {
    setLoadingNotificationsPermission(true);

    try {
      const { status, canAskAgain } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      setCanAskForPermission(canAskAgain);

      if (status !== "granted") {
        const { status: askedStatus } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );

        if (askedStatus !== "granted") {
          setHasNotificationsPermission(false);
        } else {
          setHasNotificationsPermission(true);
        }
      } else {
        setHasNotificationsPermission(true);
      }
    } catch (error) {
      setHasNotificationsPermission(false);
    } finally {
      setLoadingNotificationsPermission(false);
    }
  };

  useEffect(() => {
    getNotificationsPermission();
  }, []);

  return {
    hasNotificationsPermission,
    loadingNotificationsPermission,
    canAskForPermission,
    getNotificationsPermission,
  };
};

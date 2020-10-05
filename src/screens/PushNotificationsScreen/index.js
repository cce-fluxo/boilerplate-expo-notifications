import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

import { expoPushNotificationsApi } from "../../services/apis";
import {
  useReceivedNotification,
  getExpoPushNotificationsToken,
} from "../../services/notifications";

const PushNotificationsScreen = () => {
  useReceivedNotification({
    handleBackgroundNotification: (notification) => console.log(notification),
    handleForegroundNotification: (notification) => console.log(notification),
  });

  const [expoPushToken, setExpoPushToken] = useState(null);
  useEffect(() => {
    const getExpoPushToken = async () => {
      const expoPushToken = await getExpoPushNotificationsToken();
      setExpoPushToken(expoPushToken);
    };

    getExpoPushToken();
  }, []);

  const [
    loadingSendPushNotification,
    setLoadingSendPushNotification,
  ] = useState(false);
  const [sendPushNotificationError, setSendPushNotificationError] = useState(
    null
  );

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationSubtitle, setNotificationSubtitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");

  const sendPushNotification = async () => {
    setLoadingSendPushNotification(true);
    setSendPushNotificationError(null);

    try {
      if (!expoPushToken) {
        const expoPushToken = await getExpoPushNotificationsToken();
        setExpoPushToken(expoPushToken);
      }

      const sendPushNotificationJSON = JSON.stringify({
        to: expoPushToken,
        title: notificationTitle || "Exemplo de Notificação",
        subtitle: notificationSubtitle || "Exemplo de Subtítulo",
        body: notificationBody || "Exemplo de mensagem",
      });

      await expoPushNotificationsApi.post("", sendPushNotificationJSON);
    } catch (error) {
      setSendPushNotificationError("Algum erro ocorreu");
    } finally {
      setLoadingSendPushNotification(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Push Notifications</Text>

      <Text style={styles.description}>
        Preencha os campos desejados e clique no botão para enviar e receber uma
        Push Notification
      </Text>

      <TextInput
        placeholder="Título"
        style={styles.textInput}
        value={notificationTitle}
        onChangeText={(text) => setNotificationTitle(text)}
      />

      <TextInput
        placeholder="Subtitulo"
        style={styles.textInput}
        value={notificationSubtitle}
        onChangeText={(text) => setNotificationSubtitle(text)}
      />

      <TextInput
        placeholder="Mensagem"
        style={styles.textInput}
        value={notificationBody}
        onChangeText={(text) => setNotificationBody(text)}
      />

      <View style={styles.spacer} />

      {loadingSendPushNotification ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Button
          title="Enviar Push Notification"
          onPress={sendPushNotification}
        />
      )}

      <Text style={styles.error}>{sendPushNotificationError}</Text>

      <Text style={styles.identifierTitle}>Seu Expo Push Token</Text>
      <Text style={styles.identifier}>{expoPushToken || "..."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 30,
  },
  description: {
    fontSize: 14,
    color: "black",
    alignSelf: "flex-start",
    marginHorizontal: 35,
    marginVertical: 10,
  },
  textInput: {
    width: 280,
    height: 40,
    padding: 5,
    marginVertical: 10,
    borderRadius: 2,
    color: "black",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    fontSize: 16,
  },
  spacer: {
    marginVertical: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  identifierTitle: {
    position: "absolute",
    bottom: 40,
    color: "black",
    fontSize: 20,
    alignSelf: "flex-start",
    marginHorizontal: 30,
    fontWeight: "bold",
  },
  identifier: {
    position: "absolute",
    bottom: 20,
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 10,
  },
});

export default PushNotificationsScreen;

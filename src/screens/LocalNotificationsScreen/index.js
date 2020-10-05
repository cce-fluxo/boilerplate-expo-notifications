import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

import NotificationsPermissionModal from "../../components/NotificationsPermissionModal";

import { useNotificationsPermission } from "../../services/permissions";
import {
  useReceivedNotification,
  scheduleLocalNotification,
} from "../../services/notifications";

const LocalNotificationsScreen = () => {
  const {
    hasNotificationsPermission,
    loadingNotificationsPermission,
    canAskForPermission,
    getNotificationsPermission,
  } = useNotificationsPermission();

  useReceivedNotification({
    handleBackgroundNotification: (notification) => console.log(notification),
    handleForegroundNotification: (notification) => console.log(notification),
  });

  const [notificationIdentifier, setNotificationIdentifier] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationSubtitle, setNotificationSubtitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [scheduleSeconds, setScheduleSeconds] = useState("");

  const sendLocalNotification = async () => {
    const identifier = await scheduleLocalNotification({
      title: notificationTitle,
      subtitle: notificationSubtitle,
      body: notificationBody,
      color: "#FFA500",
      data: { qualquerCoisa: "Dados" },

      seconds: parseInt(scheduleSeconds),
    });

    setNotificationIdentifier(identifier);
    setNotificationTitle("");
    setNotificationSubtitle("");
    setNotificationBody("");
    setScheduleSeconds("");
  };

  if (loadingNotificationsPermission) {
    return (
      <View style={styles.screenContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Local Notifications</Text>

      <Text style={styles.description}>
        Preencha os campos desejados e clique no botão para enviar e receber uma
        notificação local
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

      <TextInput
        placeholder="Agendar para X segundos"
        style={styles.textInput}
        keyboardType="number-pad"
        value={scheduleSeconds}
        onChangeText={(text) => setScheduleSeconds(text)}
      />

      <View style={styles.spacer} />

      <Button
        title="Enviar Local Notification"
        onPress={sendLocalNotification}
      />

      <Text style={styles.identifierTitle}>
        Identificador da Local Notification
      </Text>
      <Text style={styles.identifier}>
        {notificationIdentifier ||
          "Envie uma notificação e o identificador (id) da notificação aparecerá aqui"}
      </Text>

      <NotificationsPermissionModal
        isNotificationsPermissionModalVisible={!hasNotificationsPermission}
        message={
          "Você não concedeu permissões para utilizar notificações no seu dispositivo"
        }
        buttonText={"Conceder permissões"}
        onPress={() => getNotificationsPermission()}
      />
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

export default LocalNotificationsScreen;

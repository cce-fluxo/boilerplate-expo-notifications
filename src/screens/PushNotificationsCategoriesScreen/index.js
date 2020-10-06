import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  useReceivedNotification,
  getExpoPushNotificationsToken,
  createTextInputNotificationCategory,
  scheduleLocalNotification,
  dismissNotification,
} from "../../services/notifications";

const PushNotificationsCategoriesScreen = ({ route }) => {
  useReceivedNotification({
    handleBackgroundNotification: async (notification) => {
      if (notification.userText) {
        const notificationIdentifier =
          notification.notification.request.identifier;
        await dismissNotification({ identifier: notificationIdentifier });
      }
    },
    handleForegroundNotification: (notification) => console.log(notification),
  });

  const params = route.params;
  const [expoPushToken, setExpoPushToken] = useState(params?.expoPushToken);
  useEffect(() => {
    const getExpoPushToken = async () => {
      if (!params?.expoPushToken) {
        const expoPushToken = await getExpoPushNotificationsToken();
        setExpoPushToken(expoPushToken);
      }
    };

    getExpoPushToken();
  }, []);

  const [
    notificationTextInputPlaceholder,
    setNotificationTextInputPlaceholder,
  ] = useState("");
  const [
    notificationSubmitButtonTitle,
    setNotificationSubmitButtonTitle,
  ] = useState("");
  const sendTextInputPushNotification = async () => {
    try {
      await createTextInputNotificationCategory({
        placeholder: notificationTextInputPlaceholder,
        buttonTitle: notificationSubmitButtonTitle,
      });

      await scheduleLocalNotification({
        title: "Exemplo de Notificação com TextInput",
        subtitle: "Local Notifications",
        body: "O botão abaixo permite escrever uma mensagem",
        categoryIdentifier: notificationTextInputPlaceholder || "padrao",
      });

      /*
      Serviço do expo ainda não funcionando plenamente - usando notificações locais
      */

      // const sendPushNotificationJSON = JSON.stringify({
      //   to: expoPushToken,
      //   title: "Exemplo de Notificação",
      //   subtitle: "Exemplo de Subtítulo",
      //   body: "Exemplo de mensagem",
      //   _category: "@fluxoconsultoria/notifications",
      //   categoryId: "",
      //   category: "",
      //   categoryIdentifier: "",
      // });

      // await expoPushNotificationsApi.post("", sendPushNotificationJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
      >
        <Text style={styles.title}>Local Notification* com TextInput</Text>

        <Text style={styles.description}>
          Preencha os campos desejados e clique no botão para enviar e receber
          uma Local Notification com TextInput
          {"\n"}
          {"\n"}
          <Text style={{ fontWeight: "bold" }}>Observação*:</Text> Por hora
          usando Local Notifications porque a integração com o servidor de Push
          Notifications do expo ainda não está 100% funcional
        </Text>

        <TextInput
          placeholder="Placeholder do TextInput"
          style={styles.textInput}
          value={notificationTextInputPlaceholder}
          onChangeText={(text) => setNotificationTextInputPlaceholder(text)}
        />

        <TextInput
          placeholder="Título do botão (apenas IOS)"
          style={styles.textInput}
          value={notificationSubmitButtonTitle}
          onChangeText={(text) => setNotificationSubmitButtonTitle(text)}
        />

        <View style={styles.spacer} />

        <Button
          title="Enviar Local Notification"
          onPress={sendTextInputPushNotification}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    paddingTop: 20,
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
});

export default PushNotificationsCategoriesScreen;

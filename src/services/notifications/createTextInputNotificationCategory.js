import * as Notifications from "expo-notifications";

export const createTextInputNotificationCategory = async ({
  placeholder,
  buttonTitle,
}) => {
  try {
    await Notifications.setNotificationCategoryAsync(placeholder || "padrao", [
      {
        identifier: "Botão Enviar Mensagem",
        buttonTitle: "Enviar Mensagem",
        options: { opensAppToForeground: true },
        textInput: {
          placeholder: placeholder,
          submitButtonTitle: buttonTitle,
        },
      },
    ]);
  } catch (error) {
    throw error;
  }
};

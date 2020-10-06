import * as Notifications from "expo-notifications";

export const scheduleLocalNotification = async ({
  title,
  subtitle,
  body,
  color,
  data,
  categoryIdentifier,
  seconds,
  repeats,
}) => {
  try {
    const identfier = await Notifications.scheduleNotificationAsync({
      content: {
        title: title || "Exemplo de Título",
        subtitle: subtitle || "Exemplo de Subtítulo",
        body: body || "Exemplo de Mensagem",
        color: color || "#FFA500",
        data: data || { dados: "Exemplo de dados" },
        categoryIdentifier: categoryIdentifier || null,
      },
      trigger: seconds
        ? {
            seconds: seconds || null,
            repeats: repeats || false,
          }
        : null,
    });

    return identfier;
  } catch (error) {
    throw error;
  }
};

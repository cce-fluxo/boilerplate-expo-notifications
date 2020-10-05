import axios from "axios";

const BASE_URL = "https://exp.host/--/api/v2/push/send";

export const expoPushNotificationsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Content-Type": "application/json",
  },
});

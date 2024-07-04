import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function schedulePushNotification(title, body, trigger) {
  const existingNotifications =
    await Notifications.getAllScheduledNotificationsAsync();
  const isScheduled = existingNotifications.some(
    (notification) =>
      notification.content.title === title &&
      notification.content.body === body &&
      notification.trigger.date === trigger.date
  );

  if (!isScheduled) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: "default",
      },
      trigger: trigger,
    });
  }
}

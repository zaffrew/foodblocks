import {Notifications} from "expo";
import {ensureEnabled} from "./PermissionManager";
import * as Permissions from 'expo-permissions';

async function ensureNotificationsEnabled() {
    await ensureEnabled(Permissions.NOTIFICATIONS)
}

export async function pushNotification(title, body, date) {
    await ensureNotificationsEnabled()

    const notification = {
        title, body, ios: {
            //this line dictates whether notifications will be shown while the app is in the foreground
            _displayInForeground: true
        }
    }

    if (date) {
        return await Notifications.scheduleLocalNotificationAsync(notification, {time: date});
    } else {
        return await Notifications.presentLocalNotificationAsync(notification)
    }
}

export async function cancelNotification(notificationID) {
    await ensureNotificationsEnabled();
    await Notifications.cancelScheduledNotificationAsync(notificationID);
}

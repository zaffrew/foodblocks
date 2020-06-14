import {Notifications} from "expo";
import * as PermissionManager from "./PermissionManager";
import * as Permissions from 'expo-permissions';

export async function ensureNotificationsEnabled() {
    await PermissionManager.ensureEnabled(Permissions.NOTIFICATIONS)
}

export async function tryEnable() {
    return await PermissionManager.tryEnable(Permissions.NOTIFICATIONS)
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

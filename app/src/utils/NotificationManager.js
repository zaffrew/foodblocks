import {Notifications} from "expo";
import * as Permissions from 'expo-permissions';


export async function areNotificationsEnabled() {
    return (await Permissions.getAsync(Permissions.NOTIFICATIONS)) === 'granted'
}

export async function ensureNotificationsEnabled() {
    if (!await areNotificationsEnabled()) {
        return await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export async function pushNotification(title, body, time) {
    if (!await ensureNotificationsEnabled()) {
        return null;
    }

    const notification = {
        title, body, ios: {
            _displayInForeground: true
        }
    }

    if (time) {
        return await Notifications.scheduleLocalNotificationAsync(notification, {time});
    } else {
        return await Notifications.presentLocalNotificationAsync(notification)
    }
}

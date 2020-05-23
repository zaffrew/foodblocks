import * as Permissions from 'expo-permissions';

export async function isEnabled(permissionType) {
    return (await Permissions.getAsync(permissionType)).status === 'granted';
}

export async function ensureEnabled(permissionType) {
    if (!await isEnabled(permissionType) && !(await Permissions.askAsync(permissionType)).status === 'granted') {
        throw new Error('The user has not enabled notification permissions.')
    }
}

import * as Permissions from 'expo-permissions';

export async function isEnabled(permissionType) {
    return (await Permissions.getAsync(permissionType)).status === 'granted';
}

export async function ensureEnabled(permissionType) {
    if (!await tryEnable(permissionType)) {
        throw new Error('The permission "' + permissionType + '" is not enabled.')
    }
}

export async function tryEnable(permissionType) {
    return await isEnabled(permissionType) || (await Permissions.askAsync(permissionType)).status === 'granted'
}

import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
import colors from '../../settings/colors'
import * as PermissionManager from "./PermissionManager";

const foodblock_calendar_name = 'My foodblocks';

export async function ensureCalendarEnabled() {
    await PermissionManager.ensureEnabled(Permissions.CALENDAR)
}

export async function tryEnable() {
    return await PermissionManager.tryEnable(Permissions.CALENDAR)
}

export async function getFoodblocksCalendarSource() {
    await ensureCalendarEnabled();

    const calendars = await Calendar.getCalendarsAsync();

    const cals = calendars.filter(each => each.title === foodblock_calendar_name);
    if (cals && cals.length > 0) {
        return cals[0];
    }
    return null;
}

export async function createFoodblocksCalendar() {
    await ensureCalendarEnabled();

    const defaultCalendarSource =
        Platform.OS === 'ios'
            ? (await Calendar.getDefaultCalendarAsync()).source
            : {isLocalAccount: true, name: foodblock_calendar_name};

    await Calendar.createCalendarAsync({
        title: foodblock_calendar_name,
        color: colors.foodblocksRed,
        entityType: Calendar.EntityTypes.EVENT, //iOS only
        sourceId: defaultCalendarSource.id, //iOS only
        source: defaultCalendarSource, //android only
        name: foodblock_calendar_name, //android only
        ownerAccount: 'personal', //android only
        accessLevel: Calendar.CalendarAccessLevel.OWNER, //android only
    });
}

export async function createEvent(calendar, eventInfo) {
    await ensureCalendarEnabled();

    return await Calendar.createEventAsync(calendar.id, eventInfo);
}

export async function getBestCalendar() {
    //first see if the foodblocks calendar exists
    let calendar = await getFoodblocksCalendarSource();
    //if the calendar doesnt exist then we try and create a new one
    if (!calendar) {
        try {
            await createFoodblocksCalendar();
        } catch (err) {
            console.log('The foodblocks calendar could not be created, using default calendar.')
        }
        calendar = await getFoodblocksCalendarSource();
    }
    //if it still doesnt exist we go with the default calendar
    if (!calendar) {
        calendar = await Calendar.getDefaultCalendarAsync();
    }

    return calendar;
}

export async function deleteEvent(eventID) {
    await Calendar.deleteEventAsync(eventID)
}

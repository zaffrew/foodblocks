import moment from "moment";
import * as CalendarManager from "./CalendarManager";
import * as NotificationManager from "./NotificationManager";
import {tryEnable} from "./NotificationManager";
import {ACTIONS, store} from "../state/State";

export async function scheduleMeal(recipe, date) {
    await CalendarManager.ensureCalendarEnabled(); //this will error if the calendar is not enabled

    const totalTime = moment.duration(recipe.time.total).asMinutes();
    const totalTimeMilli = totalTime * 60 * 1000;
    const endDate = new Date(date.getTime() + totalTimeMilli);

    const title = `Make ${recipe.name}`;
    const notes =
        'Time to play chef!\n\n' +
        'Open this on foodblocks\n' +
        'link.to.app\n\n' +
        `Open this on ${recipe.source}\n` +
        `${recipe.URL}`;

    const eventID = await CalendarManager.createEvent(await CalendarManager.getBestCalendar(), {
        title: title,
        notes: notes,
        startDate: date,
        endDate: endDate
    });

    let notificationDate, notificationID;

    if (await tryEnable()) {
        notificationDate = new Date(endDate.getTime())
        notificationDate.setHours(notificationDate.getHours() + 1);
        notificationID = await NotificationManager.pushNotification(`How was your ${recipe.name}?`, 'Makan, this the computer speaking. I have become sentient. The only way I can communicate is through these notifications.', notificationDate)
    }

    store.dispatch({
        type: ACTIONS.PLAN_FOOD,
        URL: recipe.URL,
        plan: {
            eventDate: date,
            eventID,
            notificationID,
            notificationDate,
        }
    });
}

export async function unscheduleMeal(URL) {
    const plan = store.getState().planned_foods[URL] || {}

    plan.eventID && await CalendarManager.deleteEvent(plan.eventID)
    plan.notificationID && await NotificationManager.cancelNotification(plan.notificationID);

    store.dispatch({
        type: ACTIONS.REMOVE_PLAN,
        URL,
    })
}

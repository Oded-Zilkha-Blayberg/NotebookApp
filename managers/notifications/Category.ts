import * as Notifications from "expo-notifications";
import { Clickable } from './Interfaces';
import * as Action from './Action';

interface NotificationCategory extends Notifications.NotificationCategory, Clickable {
    actions: Action.NotificationAction[],
};

export const TASK: NotificationCategory = {
    identifier: "TASK",
    actions: [Action.EndTask],
    onClick: function (response: Notifications.NotificationResponse): void {
        console.log("click on notification");
    },
};

Notifications.setNotificationCategoryAsync(TASK.identifier, TASK.actions);
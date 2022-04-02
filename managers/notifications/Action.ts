import * as Notifications from "expo-notifications";
import { Clickable } from './Interfaces';

export interface NotificationAction extends Notifications.NotificationAction, Clickable {};

export const EndTask: NotificationAction = {
    identifier: "EndTask",
    buttonTitle: "סיום",
    onClick: function (response: Notifications.NotificationResponse): void {
        console.log("click on end-task");
    },
};
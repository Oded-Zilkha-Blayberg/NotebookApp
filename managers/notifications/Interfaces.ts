import * as Notifications from "expo-notifications";

export interface Clickable {
    onClick: (response: Notifications.NotificationResponse) => void,
};
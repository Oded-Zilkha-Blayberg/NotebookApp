import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Category from './Category';
import * as Action from './Action';
import Task from "../tasks/Task";
import { AndroidNotificationPriority } from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// export default function Notification() {
//     const [expoPushToken, setExpoPushToken] = useState("");
//     const [notification, setNotification] = useState(false);
//     const notificationListener = useRef();
//     const responseListener = useRef();

//     useEffect(() => {
//         registerForPushNotificationsAsync().then((token) =>
//             setExpoPushToken(token)
//         );

//         notificationListener.current =
//             Notifications.addNotificationReceivedListener((notification) => {
//                 setNotification(notification);
//             });

//         responseListener.current =
//             Notifications.addNotificationResponseReceivedListener((response) => {
//                 console.log(response);
//                 console.log("aaaa")
//             });

//         return () => {
//             Notifications.removeNotificationSubscription(
//                 notificationListener.current
//             );
//             Notifications.removeNotificationSubscription(responseListener.current);
//         };
//     }, []);

//     return (
//         null
//     );
// }

export async function schedulePushNotification(task, notificationType = Category.TASK) {
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: task.title,
            body: task.title,
            categoryIdentifier: notificationType.identifier,
            // sound: task.important ? "defaultCritical" : "default",
            priority: task.important
            ? AndroidNotificationPriority.HIGH : AndroidNotificationPriority.DEFAULT,
            // sticky: true,
        },
        trigger: {
            // date: task.datetime,
            date: Date.now() + 1000
        },
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response:\n" + JSON.stringify(response))
        if (response?.actionIdentifier == Notifications.DEFAULT_ACTION_IDENTIFIER) {
            Category[response?.notification?.request?.content?.categoryIdentifier]?.onClick(response);
        } else {
            Action[response?.actionIdentifier]?.onClick(response);
        }
    });
    console.log("notif id on scheduling", id)
    return id;
}

// async function registerForPushNotificationsAsync() {
//     let token;
//     if (Constants.isDevice) {
//         const { status: existingStatus } =
//             await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== "granted") {
//             const { status } = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }
//         if (finalStatus !== "granted") {
//             alert("Failed to get push token for push notification!");
//             return;
//         }
//         token = (await Notifications.getExpoPushTokenAsync()).data;
//         console.log(token);
//     } else {
//         alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//         Notifications.setNotificationChannelAsync("default", {
//             name: "default",
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             sound: true,
//             lightColor: "#FF231F7C",
//             lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
//             bypassDnd: true,
//         });
//     }

//     return token;
// }

// export async function cancelNotification(notifId) {
//     await Notifications.cancelScheduledNotificationAsync(notifId);
// }
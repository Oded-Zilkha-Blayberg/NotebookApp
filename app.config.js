import 'dotenv/config';

export default {
    "expo": {
        "name": "NotebookApp",
        "slug": "NotebookApp",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        notification: {
            icon: "https://icons-for-free.com/iconfiles/png/512/notification+remind+reminder+ring+ringing+schedule+sound+icon-1320168708857990942.png",
            color: "#ffffff",
            //sounds: ["./local/assets/notification-sound.wav",]
            androidMode: "collapse",
            androidCollapsedTitle: "#{unread_notifications} תזכורות",
        },
        "ios": {
            "supportsTablet": true
        },
        "android": {
            package: "com.notebook.notebookapp",
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#FFFFFF"
            },
            permissions: [
                "READ_CALENDAR",
                "WRITE_CALENDAR",
            ],
        },
        "web": {
            "favicon": "./assets/favicon.png"
        },
        plugins: [
            "@react-native-firebase/app",
        ],
        extra: {
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            googleAuthClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            googleAuthClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }
    }
};

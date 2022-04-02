import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from 'firebase/firestore';
import { schedulePushNotification } from '../notifications/NotificationsManager';
import Firebase from '../../config/firebase';

class Task implements FirestoreDataConverter<Task> {
    private _id: string;
    private _title: string;
    private _datetime?: Date;
    private _checked: boolean;
    private _important: boolean;
    private _notificationId: string;
    private _lastUpdateTime: Date;
    private _owner: string;
    private _creationTime: Date;

    constructor(title: string, datetime: Date = null, important: boolean = false) {
        this.title = title;
        this._datetime = datetime; //TODO: use this.datetime -> using datetime() setter...
        this._checked = false;
        this._important = important;
        this._creationTime = this._lastUpdateTime = new Date();
        this._owner = Firebase.auth().currentUser.uid;

        if (this._datetime && this.title.startsWith("א")) {
            this.createNotification();
        }
    }

    toFirestore(): DocumentData {
        return {
            title: this._title,
            reminderDateTime: this._datetime,
            isDone: this._checked,
            isImportant: this._important,
            lastUpdateTime: this._lastUpdateTime,
            owner: this._owner,
            creationTime: this._creationTime,
        }
    }

    fromFirestore(taskSnapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): Task {
        const data = taskSnapshot.data(options)!;
        this._id = data.id;
        this._title = data.title;
        this._datetime = data.reminderDateTime;
        this._checked = data.isDone;
        this._important = data.isImportant;
        this._lastUpdateTime = data.lastUpdateTime;
        this._owner = data.owner;
        this._creationTime = data.creationTime;
        return this;
    }

    check() {
        this._checked = !this.checked;
    }

    private async createNotification() {
        this._notificationId = await schedulePushNotification(this);
    }

    get title() {
        return this._title;
    }

    get datetime() {
        return this._datetime;
    }

    get checked() {
        return this._checked;
    }

    get important() {
        return this._important;
    }

    set title(title: string) {
        this._title = title || "תזכורת";
    }

    set datetime(datetime: Date) {
        if (!datetime) {
            this._datetime = null;
        } else if (datetime > (new Date())) {
            this._datetime = datetime;
        } else {
            console.error("Task datetime must be at future!");
        }
    }
}

export const taskConverter = {
    toFirestore(task: WithFieldValue<Task>): DocumentData {
        return task.toFirestore;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Task {
        console.log("converter!!!")
        console.log(JSON.stringify(snapshot))
        const data = snapshot.data()!;
        return new Task(null).fromFirestore(snapshot);
    },
}

export default Task;
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from "../../config/firebase";
import Task, {taskConverter} from './Task';
import firebase from 'firebase/compat/app';

// const db = Firebase.firestore();

export async function getAllTasks() {
    const a = await (await getDocs(collection(firestore, "/tasks"))).size;
    console.log(a)
    console.log("aaaaa")
    const querySnapshot = await getDocs(collection(firestore, "tasks"));
    querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`)
    })
    console.log("bbbbbb")
    console.log(JSON.stringify(querySnapshot));
    console.log("cccccccc")
    console.log(JSON.stringify(querySnapshot.docs));

    // const tasksSnap = firebase.firestore().collection('tasks').doc().get();
    // const tasks = (await tasksSnap).data();
    // console.log(JSON.stringify(tasks))
    // querySnapshot.forEach(doc => {
    //     doc.data.
    // })
    // querySnapshot.docs.map(taskDoc => new Task())
}
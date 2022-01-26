import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Layout, Icon, Modal, Card, Input } from '@ui-kitten/components';
//import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import TasksList from '../components/TasksList';
import TopMenu from '../components/TopMenu';
import AddTaskBottomSheet from '../components/AddTaskBottomSheet';

const PlusIcon = (props) => (
  <Icon {...props} name='plus'/>
);

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        let data = new Array(8).fill({
            title: "פריט",
            datetime: null,
            checked: false,
            creationTime: Date.now(),
            lastUpdateTime: Date.now(),
        });
        
        data.push({title: "להתקשר למכללה למנהל", datetime: 1642886826464, checked: false, creationTime: Date.now(), lastUpdateTime: Date.now()});
        data.push({title: "דוח 1", datetime: 11142886861740, checked: false, creationTime: Date.now(), lastUpdateTime: Date.now()});
        data.push({title: "להתקשר למוסך", datetime: 1643016264253, checked: false, important: true, creationTime: Date.now(), lastUpdateTime: Date.now()});
        data.push({title: "תזכורת", datetime: 1643103353481, checked: false, creationTime: Date.now(), lastUpdateTime: Date.now()});
        data.push({title: "להתקשר ל... 23 בינואר", datetime: 1642973386409, checked: false, creationTime: Date.now(), lastUpdateTime: Date.now()});
        data.push({title: "בדיקת קורונה", datetime: 1643204716333, checked: false, creationTime: Date.now(), lastUpdateTime: Date.now()});

        data.sort((currentTask, nextTask) => currentTask.datetime && (currentTask.datetime > nextTask.datetime));

        this.state = {
            showAddTaskBottomSheet: false,
            tasks: data,
            updateTasksList: false,
        };
    };
    
    addNewTask = (newTask) => {
        this.setState({
            tasks: [...this.state.tasks, {
                title: newTask.title,
                checked: false,
                datetime: newTask.datetime,
                creationTime: Date.now(),
                lastUpdateTime: Date.now(),
            }],
            updateTasksList: true,
        });

        setTimeout(() => {
            this.setState({updateTasksList: false});
        });
    };

    closeAddTaskBottomSheet = () => {
        this.setState((state, props) => ({
            showAddTaskBottomSheet: !state.showAddTaskBottomSheet,
        }));
    }

    render() {
        return (
            <Layout style={styles.container} level="4">
                <TopMenu
                />
                <TasksList
                data={this.state.tasks}
                updateTasksList={this.state.updateTasksList}
                />
                <Button
                style={styles.floatActionButton}
                accessoryLeft={PlusIcon}
                onPress={this.closeAddTaskBottomSheet}
                />
                <AddTaskBottomSheet
                visible={this.state.showAddTaskBottomSheet}
                close={this.closeAddTaskBottomSheet}
                saveTask={this.addNewTask}
                />
            </Layout>
        );
    };
};

// export default HomeScreen = () => {
//     const [showModal, setShowModal] = React.useState(false);
//     const [taskTitel, setTaskTitel] = React.useState('');

//     let [data, setData] = React.useState([]);

//     data.push({title: "להתקשר למכללה למנהל", datetime: 1642886826464, checked: false,});
//     data.push({title: "דוח 1", datetime: 11142886861740, checked: false,});
//     data.push({title: "להתקשר למוסך", datetime: 1643016264253, checked: false, important: true,});
//     data.push({title: "תזכורת", datetime: 1643103353481, checked: false,});
//     data.push({title: "להתקשר ל... 23 בינואר", datetime: 1642973386409, checked: false,});

//     data = [...data, ...(new Array(8).fill({
//         title: "פריט",
//         datetime: null,
//         checked: false,
//     }))];

//     data.sort((currentTask, nextTask) => currentTask.datetime && (currentTask.datetime > nextTask.datetime));

//     const { user } = React.useContext(AuthenticatedUserContext);

//     const addNewTask = () => {
//         console.log("aaaaaaaaaaaaaaaaaaa")
//         data.push({title: taskTitel, datetime: (new Date()).getTime()});
//         console.log(data)
//     };

//     return (
//         <Layout style={styles.container} level="4">
//             <TopMenu/>
//             {/* <View style={styles.row}>
//                 <Text style={styles.title}>Welcome {user.email}!</Text>
//             </View>
//             <Text style={styles.text}>Your UID is: {user.uid}</Text> */}
//             <TasksList data={data}/>
//             <Button style={styles.floatActionButton} accessoryLeft={PlusIcon} onPress={() => setShowModal(!showModal)} />

//             <Modal
//             style={{width: "100%", position: "absolute", top: "70%", height: "30%"}}
//             visible={showModal}
//             backdropStyle={styles.backdrop}
//             onBackdropPress={() => setShowModal(!showModal)}>
//                 <Card disabled={true} style={styles.modalCard}>
//                     <Input placeholder="מטלה" value={taskTitel} onChangeText={nextValue => setTaskTitel(nextValue)} />
//                     <View style={{flexDirection: "row", justifyContent: "flex-end", paddingTop: 16}}>
//                         <Button size="small" onPress={addNewTask}>שמור</Button>
//                     </View>
//                 </Card>
//             </Modal>
//         </Layout>
//     );
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff',
    },
    floatActionButton: {
        width: 60, 
        height: 60,
        borderRadius: 30,
        //backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        height: "100%"
        //width: 100,
        //height: 100,
        // position: "absolute",
        // bottom: 0,
        //right: 0,
    },
});
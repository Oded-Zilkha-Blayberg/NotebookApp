import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Icon } from '@ui-kitten/components';
//import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import TasksList from '../components/TasksList';
import TopMenu from '../components/TopMenu';
import AddTaskBottomSheet from '../components/AddTaskBottomSheet';

import Task from '../managers/tasks/Task';
import { getAllTasks } from '../managers/tasks/TasksManager';
import GlobalStyle from '../theme/GlobalStyle';

const PlusIcon = (props) => (
  <Icon {...props} name='plus'/>
);

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        getAllTasks();

        let data = new Array(8).fill(new Task());

        data.push(new Task("להתקשר למכללה למנהל", 1642886826464, true));
        data.push(new Task("להתקשר ל... 23 בינואר", 1642973386409));
        data.push(new Task("להתקשר למוסך", Date.now() + 20000000));
        data.push(new Task("בדיקת קורונה", Date.now() + 86400000, true));
        data.push(new Task("להתקשר ל...", Date.now() + 172800000));
        data.push(new Task("דוח 1", 11142886861740));

        data.sort((currentTask, nextTask) => currentTask.datetime && (currentTask.datetime > nextTask.datetime));

        this.state = {
            showAddTaskBottomSheet: false,
            tasks: data,
            updateTasksList: false,
        };
    };
    
    addNewTask = (newTask) => {
        this.setState({
            tasks: [...this.state.tasks, new Task(newTask.title, newTask.datetime, newTask.important)],
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
            <Layout style={GlobalStyle.container} level="4">
                <TopMenu
                navigation={this.props.navigation}
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

const styles = StyleSheet.create({
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
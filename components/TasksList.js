import React from 'react';
import { StyleSheet, SectionList, SafeAreaView } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import TaskCard from './TaskCard';
import { isTimeOver, isToday, isTomorrow, isInMoreXDaysOrMore } from '../formats/dateForamt';
import GlobalStyle from '../theme/GlobalStyle';

export default TasksList = (props) => {
    const theme = useTheme();

    return (
        <TasksListComponent {...props} theme={theme} />
    );
};

class TasksListComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tasksBySections: this.updateTasks(),
        };
    };

    componentDidUpdate(prevProps) {
        if (prevProps.updateTasksList !== this.props.updateTasksList && this.props.updateTasksList) {
            this.setState((state, props) => ({
                tasksBySections: this.updateTasks(),
            }))
        }
    };

    updateTasks = () => {
        const data = this.props.data.sort((currTask, nextTask) => currTask.datetime < nextTask.datetime);
        return [
            {title: "אחרי המועד", data: data.filter(task => !task.checked && task.datetime && isTimeOver(new Date(task.datetime)))},
            {title: "היום", data: data.filter(task => !task.checked && task.datetime && isToday(new Date(task.datetime)) && !isTimeOver(new Date(task.datetime)))},
            {title: "מחר", data: data.filter(task => !task.checked && task.datetime && isTomorrow(new Date(task.datetime)))},
            {title: "מאוחר יותר", data: data.filter(task => !task.checked && isInMoreXDaysOrMore(new Date(task.datetime), 2))},
            {title: "ללא תאריך", data: data.filter(task => !task.checked && !task.datetime)},
            {title: "הושלם", data: data.filter(task => task.checked)},
        ];
    };

    checkTask = () => {
        this.setState({
            tasksBySections: this.updateTasks(),
        })
    }

    renderSectionTitle = (title, data) => (
        data.length ?
        <Text
        category="h6"
        appearance="hint"
        style={[GlobalStyle.subtitle, {backgroundColor: this.props.theme['background-basic-color-4']}]}
        >{title}</Text>
        : null
    );

    renderItem = (info) => (
        <TaskCard {...info} check={this.checkTask}></TaskCard>
    );

    render() {
        return (
            <SafeAreaView>
                <SectionList
                sections={this.state.tasksBySections}
                keyExtractor={(item, index) => item + index}
                renderItem={this.renderItem}
                renderSectionHeader={({section: {title, data}}) => this.renderSectionTitle(title, data)}
                contentContainerStyle={[GlobalStyle.bodyItem, styles.contentContainer]}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true}
                overScrollMode="never"
                />
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 150,
    },
});
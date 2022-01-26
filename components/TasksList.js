import React from 'react';
import { StyleSheet, SectionList, SafeAreaView } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import TaskCard from './TaskCard';
import { isTimeOver, isToday, isTomorrow, isInMoreXDaysOrMore } from '../formats/dateForamt';

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
        return [
            {title: "אחרי המועד", data: this.props.data.filter(task => !task.checked && task.datetime && isTimeOver(new Date(task.datetime)))},
            {title: "היום", data: this.props.data.filter(task => !task.checked && task.datetime && isToday(new Date(task.datetime)) && !isTimeOver(new Date(task.datetime)))},
            {title: "מחר", data: this.props.data.filter(task => !task.checked && task.datetime && isTomorrow(new Date(task.datetime)))},
            {title: "מאוחר יותר", data: this.props.data.filter(task => !task.checked && isInMoreXDaysOrMore(new Date(task.datetime), 2))},
            {title: "ללא תאריך", data: this.props.data.filter(task => !task.checked && !task.datetime)},
            {title: "הושלם", data: this.props.data.filter(task => task.checked)},
        ];
    };

    renderSectionTitle = (title) => (
        <Text category="h6" style={[styles.sectionTitle, {backgroundColor: this.props.theme['background-basic-color-4']}]}>{title}</Text>
    );

    renderItem = (info) => (
        <TaskCard {...info}></TaskCard>
    );

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                sections={this.state.tasksBySections}
                keyExtractor={(item, index) => item + index}
                renderItem={this.renderItem}
                renderSectionHeader={({section: {title}}) => this.renderSectionTitle(title)}
                style={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true}
                overScrollMode="never"
                />
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    contentContainer: {
    },
    sectionTitle: {
        paddingTop: 16,
        paddingBottom: 6,
    },
});
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Card, Input, Text, ListItem, Icon, useTheme } from '@ui-kitten/components';
import DatetimePicker from './DatetimePicker';
import BottomSheet from "./BottomSheet";
import { shortDatetimeString } from '../formats/dateForamt';
import themeColors from '../theme/theme.json';

const ClockIcon = (props) => (
    <Icon {...props} name='clock-outline'/>
);

export default AddTaskBottomSheet = (props) => {
    const theme = useTheme();

    return (
        <AddTaskBottomSheetComponent {...props} theme={theme} />
    );
};

class AddTaskBottomSheetComponent extends BottomSheet {
    constructor(props) {
        super(props);
        this.state = {
            newTask: {
                title: "",
                datetime: null,
                important: false,
            },
            modalHeight: 130,
        };
        this.datetimePicker = React.createRef();
    }

    RemoveDatetimeSelect = (props) => (
        <Button
        size="small"
        appearance="ghost"
        status="basic"
        accessoryLeft={<Icon {...props} name='close-outline'/>}
        onPress={() => this.updateNewTaskDatetime(null, 130)}
        ></Button>
    );

    closeBottomSheet = () => {
        this.props.close();
        this.cleanNewTask();
    }

    updateNewTaskTitel = (title) => {
        this.setState(prevState => ({
            newTask: {
                ...prevState.newTask,
                title,
            },
        }));
    }

    updateNewTaskDatetime = (datetime, modalHeight=176) => {
        this.setState(prevState => ({
            newTask: {
                ...prevState.newTask,
                datetime,
            },
            modalHeight: modalHeight,
        }));
    }

    updateNewTaskImportant = () => {
        this.setState(prevState => ({
            newTask: {
                ...prevState.newTask,
                important: !prevState.newTask.important,
            }
        }));
    }

    saveTask = () => {
        this.props.saveTask(this.state.newTask);
        this.closeBottomSheet();
        this.cleanNewTask();
    }

    cleanNewTask = () => {
        this.setState({
            newTask: {
                title: "",
                datetime: null,
                important: false,
            },
            modalHeight: 130,
        });
    }

    openDatetimePicker = () => {
        this.datetimePicker.current.openPicker();
    }

    render() {
        return (
            <Modal
            style={[styles.modal, {height: this.state.modalHeight,
                top: this.state.screenShortHeight - this.state.modalHeight}]}
            visible={this.props.visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={this.closeBottomSheet}>
                <Card
                disabled={true}
                style={styles.modalCard}>
                    {this.state.newTask.datetime ?
                    <ListItem
                    title={() =>
                        <Text
                        category="s1"
                        status="basic"
                        style={{alignSelf: "flex-start"}}
                        onPress={this.openDatetimePicker}>
                            {shortDatetimeString(this.state.newTask.datetime)}
                        </Text>
                    }
                    accessoryLeft={ClockIcon}
                    accessoryRight={this.RemoveDatetimeSelect}
                    style={styles.selectedDateListItem}
                    disabled
                    /> : null
                    }
                    <Input
                    placeholder="מטלה"
                    autoFocus
                    value={this.state.newTask.title}
                    onChangeText={this.updateNewTaskTitel}
                    />
                    <View style={[styles.actionsBar, {paddingTop: 16}]}>
                        <View style={styles.actionsBar}>
                            <DatetimePicker
                            screenShortHeight={this.state.screenShortHeight}
                            save={this.updateNewTaskDatetime}
                            ref={this.datetimePicker}
                            selectedDate={this.state.newTask.datetime}
                            actionIconStyle={styles.actionIcon}
                            theme={this.props.theme}
                            />
                            <Icon
                            name="alert-circle-outline"
                            fill={this.state.newTask.important ? themeColors['color-warning-500'] : this.props.theme['text-hint-color'] }
                            style={[styles.actionIcon, {marginStart: 10}]}
                            onPress={this.updateNewTaskImportant}
                            />
                        </View>
                        <Button
                        size="small"
                        disabled={!this.state.newTask.title && !this.state.newTask.datetime}
                        onPress={this.saveTask}>
                            שמור
                        </Button>
                    </View>
                </Card>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        height: "100%",
    },
    actionsBar: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modal: {
        width: "100%",
        position: "absolute",
    },
    selectedDateListItem: {
        paddingHorizontal: 0,
        paddingTop: 0,
    },
    actionIcon: {
        height: 25,
        width: 25,
    },
})
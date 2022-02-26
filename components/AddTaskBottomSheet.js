import React from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Card, Input, Text, List, ListItem, Divider, Icon } from '@ui-kitten/components';
import DatetimePicker from '../components/DatetimePicker';
import BottomSheet from "./BottomSheet";
import { shortDatetimeString } from '../formats/dateForamt';

const ClockIcon = (props) => (
    <Icon {...props} name='clock-outline'/>
);

export default class AddTaskBottomSheet extends BottomSheet {
    constructor(props) {
        super(props);
        this.state = {
            newTask: {
                title: "",
                datetime: null,
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
                    <View style={styles.actionsBar}>
                        <DatetimePicker
                        screenShortHeight={this.state.screenShortHeight}
                        save={this.updateNewTaskDatetime}
                        ref={this.datetimePicker}
                        selectedDate={this.state.newTask.datetime}
                        />
                        <Button
                        size="small"
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
        paddingTop: 16,
    },
    modal: {
        width: "100%",
        position: "absolute",
    },
    selectedDateListItem: {
        paddingHorizontal: 0,
        paddingTop: 0,
    },
})
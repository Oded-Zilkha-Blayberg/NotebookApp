import React from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Card, Input } from '@ui-kitten/components';
import DatetimePicker from '../components/DatetimePicker';
import BottomSheet from "./BottomSheet";

export default class AddTaskBottomSheet extends BottomSheet {
    constructor(props) {
        super(props);

        this.state = {
            newTask: {
                title: "",
                datetime: null,
            },
        };
    }

    closeBottomSheet = () => {
        this.props.close();
    }

    updateNewTaskTitel = (title) => {
        this.setState({
            newTask: {
                title: title,
            },
        });
    }

    saveTask = () => {
        this.props.saveTask(this.state.newTask);
        this.closeBottomSheet();
        this.setState({
            newTask: {
                title: "",
                datetime: null,
            },
        });
    }

    render() {
        return (
            <Modal
            style={[styles.modal, {top: this.state.screenShortHeight - styles.modal.height}]}
            visible={this.props.visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={this.closeBottomSheet}>
                <Card
                disabled={true}
                style={styles.modalCard}>
                    <Input
                    placeholder="מטלה"
                    autoFocus
                    value={this.state.newTask.title}
                    onChangeText={this.updateNewTaskTitel}
                    />
                    <View style={styles.actionsBar}>
                        <DatetimePicker
                        screenShortHeight={this.state.screenShortHeight}
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
        height: 130,
    },
})
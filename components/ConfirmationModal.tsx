import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Card, Text, Button } from "@ui-kitten/components";

interface ConfirmationModalProps {
    message: string;
    confirmText: string;
    confirmAction: () => void;
    cancelText: string;
    cancelAction: () => void;
}

interface ConfirmationModalState {
    showModal: boolean;
}

export default class ConfirmationModal
extends React.Component<ConfirmationModalProps, ConfirmationModalState> {

    constructor(props: ConfirmationModalProps) {
        super(props);
        this.state = {
            showModal: false
        };
    };

    show = () => {
        this.setState({ showModal: true });
    };

    handleConfirm = () => {
        this.hide();
        if (this.props.confirmAction) {
            this.props.confirmAction();
        }
    };

    handleCancel = () => {
        this.hide();
        if (this.props.cancelAction) {
            this.props.cancelAction();
        }
    };

    hide = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <Modal
            visible={this.state.showModal}
            backdropStyle={styles.backdrop}
            onBackdropPress={this.hide}>
                <Card disabled={true}>
                    <Text category="h6">{this.props.message}</Text>
                    <View style={{flexDirection: "row", justifyContent: "flex-end", paddingTop: 16}}>
                        <Button
                        appearance="ghost"
                        status="basic"
                        onPress={this.handleCancel}>{this.props.cancelText}</Button>
                        <Button
                        appearance="ghost"
                        status="danger"
                        onPress={this.handleConfirm}>{this.props.confirmText}</Button>
                    </View>
                </Card>
            </Modal>
        )
    };
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text, Button, Icon, Modal, Card } from '@ui-kitten/components';
import DatePicker from 'react-native-date-picker-bugfix';

const ClockIcon = (props) => (
  <Icon {...props} name='clock-outline'/>
);

export default class DatetimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            selectedDate: null,
        };
    }

    openPicker = () => {
        this.setState({
            showModal: true,
            selectedDate: this.props.selectedDate || new Date(),
        });
    }

    closePicker = () => {
        this.setState({
            showModal: false,
        });
    }

    save = () => {
        this.closePicker();
        this.props.save(this.state.selectedDate);
    }

    render() {
        return (
            <View>
                <Button
                size="small"
                appearance="outline"
                accessoryLeft={ClockIcon}
                onPress={() => this.openPicker()}
                />

                {/* <DatePicker
                modal
                open={this.state.showModal}
                onConfirm={() => this.setState((state, props) => ({showModal: !state.showModal}))}
                onCancel={() => this.setState((state, props) => ({showModal: !state.showModal}))}
                date={this.state.selectedDate}
                mode="time"
                androidVariant="iosClone"
                locale="he"
                minimumDate={new Date()}
                onDateChange={(date) => this.setState({selectedDate: date})}
                fadeToColor="none"
                //textColor="#ffffff"
                /> */}
                
                <Modal
                style={[styles.modal, {top: this.props.screenShortHeight - styles.modal.height}]}
                visible={this.state.showModal}
                backdropStyle={styles.backdrop}
                onBackdropPress={this.closePicker}>
                    <Card disabled={true} style={styles.modalCard}>
                        <Text style={{fontSize: 20}}>בחר תאריך</Text>
                        <View style={styles.listsView}>
                            <DatePicker
                            date={this.state.selectedDate}
                            mode="datetime"
                            androidVariant="iosClone"
                            locale="he"
                            minimumDate={new Date()}
                            onDateChange={(date) => this.setState({selectedDate: date})}
                            fadeToColor="none"
                            textColor="#ffffff"
                            is24hourSource="device"
                            />
                        </View>
                        <View style={styles.actionsBar}>
                            <Button
                            size="medium"
                            appearance="ghost"
                            onPress={this.closePicker}>
                                ביטול
                            </Button>
                            <Text appearance="hint" style={{textAlignVertical: "center", fontSize: 20}}>|</Text>
                            <Button
                            size="medium"
                            appearance="ghost"
                            onPress={this.save}>
                                אישור
                            </Button>
                        </View>
                    </Card>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        marginHorizontal: 15,
    },
    modal: {
        width: "100%",
        position: "absolute",
        height: 335,
    },
    listsView: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 16,
    },
    actionsBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 16,
    },
});
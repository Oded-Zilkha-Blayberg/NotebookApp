import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text, Button, Icon, Modal, Card, List, ListItem } from '@ui-kitten/components';
import { hebrewDateOnlyString, hebrewDateAndMonthShort } from "../formats/dateForamt";
import ScrollPicker from "./ScrollPicker";

const ClockIcon = (props) => (
  <Icon {...props} name='clock-outline'/>
);

const DATE_OPTIONS_LIST_INIT_SIZE = 30;
const MINUTE_IN_MILLISECONDS = 60000;
const HOUR_IN_MILLISECONDS = 3600000;
const DAY_IN_MILLISECONDS = 86400000;

export default class DatetimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            dateOnOpen: null,
            selectedDatetime: Date.now(),
            data: new Array(30),

            dateOptionsList: [],
            minuteOptionsList: [],
            hourOptionsList: [],

            selectedDate: null,
            selectedHour: null,
            selectedDateIndex: 0,
            selectedHourIndex: 0,
        };

        this.datePicker = React.createRef();
        this.hourPicker = React.createRef();
    };

    openPicker = () => {
        const nowMillis = Date.now();
        this.setState((state, props) => ({
            showModal: !state.showModal,
            dateOnOpen: nowMillis,
            selectedDatetime: nowMillis,
            dateOptionsList: this.getDateOptionsListValues(nowMillis, nowMillis).list,
            hourOptionsList: this.getHourOptionsListValues(nowMillis, nowMillis).list,
        }));

    };

    renderDateItem = ({ item, index }) => {
        const dateStringByIndex = (index) => {
            return index < 2 
            ? ""
            : index == 2
            ? "היום"
            : hebrewDateAndMonthShort(new Date(this.state.dateOnOpen + DAY_IN_MILLISECONDS * index));
        };
        
        return <ListItem style={styles.listItem}>
            <Text style={styles.listItemText}>
                {dateStringByIndex(index)}
            </Text>
        </ListItem>
    };

    renderMinuteItem = ({ item, index }) => {
        return <ListItem style={[index == 0 ? {borderTopWidth: 1, borderBottomWidth: 1} : {}, styles.listItem]}>
                    <Text style={styles.listItemText}>
                        {("0"
                        + (new Date(this.state.dateOnOpen + MINUTE_IN_MILLISECONDS * index))
                        .getMinutes().toString()).slice(-2)}
                    </Text>
                </ListItem>
    };

    renderHoursItem = ({ item, index }) => {
        return <ListItem style={styles.listItem}>
            <Text style={styles.listItemText}>
                {("0"
                + (new Date(this.state.dateOnOpen + HOUR_IN_MILLISECONDS * index))
                .getHours().toString()).slice(-2)}
            </Text>
        </ListItem>
    };

    getDateOptionsListValues = (startDateMillis = Date.now(),
                                selectedDatetime = this.state.selectedDatetime) => {
        // Date without time
        const selectedDateOnly = new Date((new Date(selectedDatetime)).toDateString());
        const startDateOnly = new Date((new Date(startDateMillis)).toDateString());
        const daysBetweenStartTimeAndSelectedTime
        = (selectedDateOnly - startDateOnly) / DAY_IN_MILLISECONDS;
        let datesList = [];

        for (let index = 0; index < daysBetweenStartTimeAndSelectedTime + DATE_OPTIONS_LIST_INIT_SIZE; index++) {
            datesList.push(new Date(startDateMillis + DAY_IN_MILLISECONDS * index))
        }

        return {
            list: datesList,
            dateIndex: daysBetweenStartTimeAndSelectedTime,
        };
    }

    getHourOptionsListValues = (startDateMillis = Date.now(),
                                selectedDatetime = this.state.selectedDatetime) => {
        // console.log("selectedDatetime: " + selectedDatetime)
        // console.log("startDateMillis: " + startDateMillis)
        const hoursBetweenStartTimeAndSelectedTime
        = (selectedDatetime - startDateMillis) / HOUR_IN_MILLISECONDS;

        //console.log("hoursBetweenStartTimeAndSelectedTime: " + hoursBetweenStartTimeAndSelectedTime)

        const hoursList = new Array(hoursBetweenStartTimeAndSelectedTime
            + DATE_OPTIONS_LIST_INIT_SIZE * 24).fill("");

        // let hoursList = [];

        // for (let index = 0;
        //     index < hoursBetweenStartTimeAndSelectedTime + DATE_OPTIONS_LIST_INIT_SIZE * 24;
        //     index++) {
        //     hoursList.push(new Date(startDateMillis + HOUR_IN_MILLISECONDS * index));
        // }

        return {
            list: hoursList,
            hourIndex: hoursBetweenStartTimeAndSelectedTime,
        };
    }

    // getHourOptionsListValues = (startDateMillis = Date.now(),
    //                             selectedDatetime = this.state.selectedDatetime) => {
    //     const hoursBetweenStartTimeAndSelectedTime
    //     = (selectedDatetime - startDateMillis) / HOUR_IN_MILLISECONDS;
    //     let hoursList = [];

    //     for (let index = 0;
    //         index < hoursBetweenStartTimeAndSelectedTime + DATE_OPTIONS_LIST_INIT_SIZE * 24;
    //         index++) {
    //         hoursList.push(new Date(startDateMillis + HOUR_IN_MILLISECONDS * index));
    //     }

    //     return {
    //         list: hoursList,
    //         hourIndex: hoursBetweenStartTimeAndSelectedTime,
    //     };
    // }

    onSelectDate = (data, selectedIndex) => {
        const newDatetime = (new Date(this.state.dateOnOpen + selectedIndex * DAY_IN_MILLISECONDS)).getTime();
        // let newDatetime = data;
        // newDatetime = newDatetime.setHours(new Date(this.state.selectedDatetime).getHours());
        const hourOptionsListValues = this.getHourOptionsListValues(this.state.dateOnOpen, newDatetime);
        this.setState((state, props) => ({
            selectedDatetime: newDatetime,
            dateOptionsList: this.getDateOptionsListValues(state.dateOnOpen, newDatetime).list,
            hourOptionsList: hourOptionsListValues.list,
        }));
        //this.datePicker.scrollToIndex(selectedIndex);
        this.hourPicker.scrollToIndex(hourOptionsListValues.hourIndex);
    }

    onSelectHour = (data, selectedIndex) => {
        const newDatetime = (new Date(this.state.dateOnOpen + selectedIndex * HOUR_IN_MILLISECONDS)).getTime();
        const dateOptionsListValues = this.getDateOptionsListValues(this.state.dateOnOpen, newDatetime);
        this.setState((state, props) => ({
            selectedDatetime: newDatetime,
            dateOptionsList: dateOptionsListValues.list,
            hourOptionsList: this.getHourOptionsListValues(state.dateOnOpen, newDatetime).list,
        }));
        this.datePicker.scrollToIndex(dateOptionsListValues.dateIndex);
        //this.hourPicker.scrollToIndex(selectedIndex);
    }

    // someOtherFunc(){
    //     this.sp.scrollToIndex(2);   // select 'c'
    //     let selectedValue = this.sp.getSelected();  // returns 'c'
    // }

    render() {
        return (
            <View>
                <Button
                size="small"
                appearance="outline"
                accessoryLeft={ClockIcon}
                onPress={this.openPicker}
                />
                
                <Modal
                style={[styles.modal, {top: this.props.screenShortHeight - styles.modal.height}]}
                visible={this.state.showModal}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => this.setState((state, props) => ({showModal: !state.showModal}))}>
                    <Card disabled={true} style={styles.modalCard}>
                        <Text style={{fontSize: 20}}>
                            {hebrewDateOnlyString(new Date(this.state.selectedDatetime))}
                            {", " + (new Date(this.state.selectedDatetime)).getHours()
                            + ":" + (new Date(this.state.selectedDatetime)).getMinutes()}
                        </Text>
                        <View style={styles.listsView}>
                            <ScrollPicker
                            ref={(sp) => this.datePicker = sp}
                            dataSource={this.state.dateOptionsList}
                            //selectedIndex={0}
                            itemHeight={50}
                            wrapperHeight={250}
                            highlightColor={'#d8d8d8'}
                            renderItem={(data, index, isSelected) => {
                                return(
                                    <View>
                                        <Text>{hebrewDateAndMonthShort(data)}</Text>
                                    </View>
                                )
                            }}
                            onValueChange={this.onSelectDate}
                            />

                            <ScrollPicker
                            ref={(sp) => this.hourPicker = sp}
                            dataSource={this.state.hourOptionsList}
                            //selectedIndex={0}
                            itemHeight={50}
                            wrapperHeight={250}
                            highlightColor={'#d8d8d8'}
                            renderItem={(data, index, isSelected) => {
                                return(
                                    <View>
                                        <Text>{("0" + (new Date(this.state.dateOnOpen
                                        + index * HOUR_IN_MILLISECONDS))
                                        .getHours().toString()).slice(-2)}</Text>
                                    </View>
                                )
                            }}
                            onValueChange={this.onSelectHour}
                            />
                            {/* <List
                            style={{maxHeight: 250}}
                            data={this.state.data}
                            renderItem={this.renderDateItem}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            initialScrollIndex={0}
                            focusable={true}                            
                            />
                            <List
                            style={{maxHeight: 250}}
                            data={this.state.data}
                            renderItem={this.renderMinuteItem}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            />
                            <List
                            style={{maxHeight: 250}}
                            data={this.state.data}
                            renderItem={this.renderHoursItem}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            /> */}
                        </View>
                        <View style={styles.actionsBar}>
                            <Button
                            size="medium"
                            appearance="ghost"
                            onPress={() => {this.setState({showModal: !this.state.showModal})}}>
                                ביטול
                            </Button>
                            <Text appearance="hint" style={{textAlignVertical: "center", fontSize: 20}}>|</Text>
                            <Button
                            size="medium"
                            appearance="ghost"
                            onPress={() => {}}>
                                אישור
                            </Button>
                        </View>
                    </Card>
                </Modal>
            </View>
        );
    };
};

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
        height: 400,
    },
    listsView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 16
    },
    listItem: {
        height: 50,
    },
    listItemText: {
        flex: 1,
        textAlign: "center"
    },
    actionsBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 16,
    },
});
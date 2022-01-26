import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Card, Text, CheckBox } from '@ui-kitten/components';
import { hebrewDateString } from '../formats/dateForamt';

export default TaskCard = (info) => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Card
        style={styles.item}
        status={info.item.datetime && (new Date().getTime()) > info.item.datetime ? "danger" : info.item.important ? "info" : null}
        >
            <View style={{flexDirection: "row", marginRight: -24, marginLeft: -14, marginVertical: -16}}>
                <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
                    <View style={{flexDirection: "column", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 20}}>
                        <CheckBox
                        style={{}}
                        status="control"
                        checked={checked}
                        onChange={nextValue => setChecked(nextValue)}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flexDirection: "column", paddingVertical: 20, paddingHorizontal: 10}}>
                    <Text category="h6">
                        {info.item.title}
                    </Text>
                    { info.item.datetime && hebrewDateString(new Date(info.item.datetime))
                    ? <Text status={(new Date().getTime()) > info.item.datetime ? 'danger' : 'basic'}>
                        {hebrewDateString(new Date(info.item.datetime))}
                    </Text> : null}
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    item: {
        marginVertical: 4,
        flex: 1,
    },
});
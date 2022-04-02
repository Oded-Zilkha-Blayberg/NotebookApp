import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Card, Text, CheckBox, Icon } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import theme from '../theme/theme.json';
import { hebrewDateString } from '../formats/dateForamt';
import Task from '../managers/tasks/Task';

type Props = {
    item: Task
    section: Task[]
    check: any
};

type State = {
};

class TaskCard extends React.Component<Props, State> {
    importantIconRef: React.RefObject<Icon<unknown>>;

    constructor(props: Props) {
        super(props);
        this.importantIconRef = React.createRef();
    }

    componentDidMount(): void {
        if (this.props.item.important) {
            this.importantIconRef.current.startAnimation();
        }
    }

    cardStatus = (): EvaStatus => {
        return this.props.item.datetime && (new Date()) > this.props.item.datetime
        && !this.props.item.checked
        ? "danger"
        : null;
    }

    check = () => {
        this.props.item.check();
        this.props.check();
    }

    render() {
        return (
            <Card
            style={styles.item}
            status={this.cardStatus()}
            >
                <View style={styles.row}>
                    <TouchableWithoutFeedback onPress={this.check}>
                        <View style={styles.singleRowBoxColumn}>
                            <CheckBox
                            status="basic"
                            checked={this.props.item.checked}
                            onChange={this.check}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.textColumn}>
                        <Text
                        category="h6"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[styles.title, this.props.item.checked ? styles.checkedTitle : null]}
                        >
                            {this.props.item.title}
                        </Text>
                        { !this.props.item.checked && this.props.item.datetime && hebrewDateString(new Date(this.props.item.datetime))
                        ? <Text status={(new Date()) > this.props.item.datetime ? 'danger' : 'basic'}>
                            {hebrewDateString(new Date(this.props.item.datetime))}
                        </Text> : null}
                    </View>
                    {this.props.item.important
                    ? <View style={styles.singleRowBoxColumn}>
                        <Icon
                        name="alert-circle-outline"
                        fill={theme['color-warning-500']}
                        style={styles.importantIcon}
                        animation="pulse"
                        ref={this.importantIconRef}
                        />
                    </View> : null}
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 4,
        flex: 1,
    },
    row: {
        flexDirection: "row",
        marginRight: -24,
        marginLeft: -14,
        marginVertical: -16
    },
    singleRowBoxColumn: {
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    textColumn: {
        flexDirection: "column",
        paddingVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
        alignItems: "flex-start"
    },
    title: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 10,
        direction: "rtl"
    },
    checkedTitle: {
        textDecorationLine: "line-through",
    },
    importantIcon: {
        height: 25,
        width: 25,
    },
});

export default TaskCard;
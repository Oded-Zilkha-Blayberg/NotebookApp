import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Layout, Icon, Modal, Card, Input } from '@ui-kitten/components';

export default class AddButton extends React.Component {
    constructor(props) {

    };

    render() {
        return (
            <Button
            style={styles.floatActionButton}
            accessoryLeft={PlusIcon}
            onPress={() => this.setState((state, props) => ({showModal: !state.showModal}))}
            />
        );
    };
};

const styles = StyleSheet.create({
    floatActionButton: {
        width: 60, 
        height: 60,
        borderRadius: 30,
        //backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        height: "100%"
        //width: 100,
        //height: 100,
        // position: "absolute",
        // bottom: 0,
        //right: 0,
    },
});
import React from "react";
import { Dimensions, Keyboard } from 'react-native';

export default class BottomSheet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenShortHeight: Dimensions.get("screen").height,
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (e) => {
        this.setState((state, props) => ({
            screenShortHeight: Dimensions.get("screen").height - e.endCoordinates.height - 25,
        }));
    }

    _keyboardDidHide = () => {
        this.setState((state, props) => ({
            screenShortHeight: Dimensions.get("screen").height,
        }));
    }
}
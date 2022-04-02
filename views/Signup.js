import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Button, Icon, Input } from '@ui-kitten/components';
import GlobalStyle from '../theme/GlobalStyle';
import HebrewAuthError from '../valueSets/AuthError-HE';

import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default SignupScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signupError, setSignupError] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} onPress={toggleSecureEntry}/>
        </TouchableWithoutFeedback>
    );

    const onSignup = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.createUserWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setSignupError(HebrewAuthError(error));
        }
    };

    return (
        <Layout style={GlobalStyle.container} level="4">
            <View style={GlobalStyle.header}>
                <Text category="h1" style={GlobalStyle.pageTitle}>הירשם</Text>
            </View>
            <View style={[GlobalStyle.body, {justifyContent: "center"}]}>
                <View style={GlobalStyle.bodyItem}>
                    <Input placeholder="אימייל" value={email}
                    onChangeText={nextValue => setEmail(nextValue)}
                    style={{width: "100%", paddingVertical: "5%"}} textAlign="right"/>
                    
                    <Input placeholder="סיסמא" value={password}
                    onChangeText={nextValue => setPassword(nextValue)}
                    style={{width: "100%", paddingVertical: "5%"}} textAlign="right"
                    accessoryRight={renderIcon} secureTextEntry={secureTextEntry}/>

                    {signupError ? <Text category="s1" status="warning">{signupError}</Text> : null}
                </View>
                <View style={GlobalStyle.bodyItem}>
                    <Button onPress={onSignup}>הירשם</Button>
                </View>
                <View style={GlobalStyle.bodyItem}>
                    <Text>אתה כבר רשום לאפליקציה? <Text status="primary"
                                                    onPress={() => navigation.navigate('Login')}>
                                                        התחבר
                                                    </Text>
                    </Text>
                </View>
            </View>
        </Layout>
    );
};
import React from 'react';
import Constants from 'expo-constants';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Button, Icon, Input, useTheme } from '@ui-kitten/components';
import GlobalStyle from '../theme/GlobalStyle';
import HebrewAuthError from '../valueSets/AuthError-HE';
import Firebase from '../config/firebase';

import 'firebase/compat/auth';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const auth = Firebase.auth();

const GoogleIcon = (props) => (
    <Icon name='google' {...props}/>
);

WebBrowser.maybeCompleteAuthSession();

export default LoginScreen = ({ navigation }) => {
    const theme = useTheme();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const [googleRequest, googleResponse, googleLogin] = Google.useIdTokenAuthRequest({
        clientId: Constants.manifest.extra.googleAuthClientId,
        clientSecret: Constants.manifest.extra.googleAuthClientSecret,
    });

    React.useEffect(() => {
        if (googleResponse?.type === 'success') {
            const {id_token} = googleResponse.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [googleResponse]);

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setLoginError(HebrewAuthError(error));
        }
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} onPress={toggleSecureEntry}/>
        </TouchableWithoutFeedback>
    );

    return (
        <Layout style={[GlobalStyle.container, {backgroundColor: theme['text-basic-color']}]} level="4">
            <View style={[GlobalStyle.header, {marginBottom: 30}]}>
                <Text
                category="h1"
                style={[GlobalStyle.pageTitle, {color: theme['background-basic-color-4']}]}
                >התחבר</Text>
            </View>
            <View
            style={
                [GlobalStyle.body,
                {
                    justifyContent: "center",
                    // borderTopLeftRadius: 50,
                    // borderTopRightRadius: 50,
                    borderRadius: 25,
                    margin: 5,
                    backgroundColor: theme['background-basic-color-4'],
                }
            ]}>
                <View style={GlobalStyle.bodyItem}>
                    <Input placeholder="אימייל" value={email}
                    onChangeText={nextValue => setEmail(nextValue)}
                    style={{width: "100%", paddingVertical: "5%"}} textAlign="right"/>
                    
                    <Input placeholder="סיסמא" value={password}
                    onChangeText={nextValue => setPassword(nextValue)}
                    style={{width: "100%", paddingVertical: "5%"}} textAlign="right"
                    accessoryRight={renderIcon} secureTextEntry={secureTextEntry}/>

                    {loginError ? <Text category="s1" status="warning">{loginError}</Text> : null}
                </View>
                <View style={GlobalStyle.bodyItem}>
                    <Button onPress={onLogin}>התחבר</Button>
                    <View style={{alignSelf: "center", paddingVertical: "5%"}}>
                        <Text category="h6" appearance="hint">או</Text>
                    </View>
                    <Button accessoryLeft={GoogleIcon} status="basic"
                    onPress={() => googleLogin()} disabled={!googleRequest}>התחבר עם חשבון גוגל</Button>
                </View>
                <View style={GlobalStyle.bodyItem}>
                    <Text>
                        עדיין אין לך משתמש באפליקציה? <Text status="primary"
                                                        onPress={() => navigation.navigate('Signup')}>
                                                            הירשם
                                                        </Text>
                    </Text>
                </View>
            </View>
        </Layout>
    );
};
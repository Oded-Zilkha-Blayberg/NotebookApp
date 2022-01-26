import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Button, Icon, Input } from '@ui-kitten/components';
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
        <Layout style={styles.pageLayout} level="4">
            <Text category="h1" style={GlobalStyle.pageTitle}>התחבר</Text>
            <View>
                <Input placeholder="אימייל" value={email}
                onChangeText={nextValue => setEmail(nextValue)}
                style={{width: "100%", paddingVertical: "5%"}} textAlign="right"/>
                
                <Input placeholder="סיסמא" value={password}
                onChangeText={nextValue => setPassword(nextValue)}
                style={{width: "100%", paddingVertical: "5%"}} textAlign="right"
                accessoryRight={renderIcon} secureTextEntry={secureTextEntry}/>

                {loginError ? <Text category="s1" status="warning">{loginError}</Text> : null}
            </View>
            <View>
                <Button onPress={onLogin}>התחבר</Button>
                <View style={{alignSelf: "center", paddingVertical: "5%"}}>
                    <Text category="h6" appearance="hint">או</Text>
                </View>
                <Button accessoryLeft={GoogleIcon} status="basic"
                onPress={() => googleLogin()} disabled={!googleRequest}>התחבר עם חשבון גוגל</Button>
            </View>
            <View>
                <Text>
                    עדיין אין לך משתמש באפליקציה? <Text status="primary"
                                                    onPress={() => navigation.navigate('Signup')}>
                                                        הירשם
                                                    </Text>
                </Text>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    pageLayout: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: "5%",
    },
});
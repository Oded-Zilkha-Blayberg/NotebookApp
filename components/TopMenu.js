import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TopNavigationAction, Icon, OverflowMenu,
    MenuItem, Modal, Button, Card } from '@ui-kitten/components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const SettingsIcon = (props) => (
    <Icon {...props} name="settings"/>
);

const LogoutIcon = (props) => (
    <Icon {...props} name="log-out"/>
);

export default TopMenu = () => {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = React.useState(false);

    const handleSignOut = async () => {
        setShowLogoutConfirmation(!setShowLogoutConfirmation);
        try {
            await auth.signOut();
        } catch (error) {
            console.warn(error);
        }
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleLogoutAction = () => {
        setMenuVisible(!menuVisible)
        setShowLogoutConfirmation(!showLogoutConfirmation);
    };

    const closeLogoutModal = () => {
        setShowLogoutConfirmation(!setShowLogoutConfirmation);
    };

    const renderMenuAction = () => (
        <TopNavigationAction
        icon={MenuIcon}
        onPress={toggleMenu}
        style={{alignSelf: "flex-end"}}
        />
    );

    const menuItemText = (text) => (
        <Text category="p1">{text}</Text>
    );

    return (
        <React.Fragment>
            <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
                <MenuItem
                title={() => menuItemText("הגדרות")}
                accessoryLeft={SettingsIcon}
                style={styles.menuItem}
                />
                <MenuItem
                title={() => menuItemText("התנתק")}
                accessoryLeft={LogoutIcon}
                style={styles.menuItem}
                visible={showLogoutConfirmation}
                onPress={toggleLogoutAction}
                />
            </OverflowMenu>

            <Modal
            visible={showLogoutConfirmation}
            backdropStyle={styles.backdrop}
            onBackdropPress={closeLogoutModal}>
                <Card disabled={true}>
                    <Text category="h6">האם אתה בטוח שברצונך להתנתק?</Text>
                    <View style={{flexDirection: "row", justifyContent: "flex-end", paddingTop: 16}}>
                        <Button
                        appearance="ghost"
                        status="basic"
                        onPress={closeLogoutModal}>לא</Button>
                        <Button
                        appearance="ghost"
                        status="danger"
                        onPress={handleSignOut}>כן</Button>
                    </View>
                </Card>
            </Modal>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        justifyContent: "flex-start",
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
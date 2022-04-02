import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Layout, List, ListItem, Text, Icon, Divider, Button, Modal, Card } from "@ui-kitten/components";
import ConfirmationModal from "../components/ConfirmationModal";
import GlobalStyle from "../theme/GlobalStyle";
import firebase from "firebase/compat";
import { ThemeContext } from "../theme/themeContext";

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			username: "",
			isLoading: true,
		};

		this.signOutConfirmation = React.createRef();
		this.deleteAccountConfirmation = React.createRef();
	}

	static contextType = ThemeContext;

	// get the user's firebase account info
	componentDidMount() {
		const { currentUser } = firebase.auth();
		this.setState({ email: currentUser.email });
		this.setState({ username: currentUser.displayName });
		this.setState({ isLoading: false });
	}

	// change the user's firebase account info
	// user can change their email, username, and password
	// user can also change the app's theme
	// user can also sign out of the app
	// user can also delete their account
	// use eva icons for icons
	render() {
		if (this.state.isLoading) {
			return null;
		} else {
			return (
				<React.Fragment>
				<Layout style={GlobalStyle.container} level="4">
					<View style={GlobalStyle.header}>
						<Text category="h1" style={GlobalStyle.pageTitle}>הגדרות</Text>
					</View>
					<View style={GlobalStyle.body}>
						<View style={[GlobalStyle.bodyItem, {width: "100%"}]}>
						{/* <List
						data={this.state.listItems}
						renderItem={(item) => (
							<ListItem
							title={item.title}
							icon={item.icon}
							key={item.key}
							style={styles.listItem}
							/>
						)}
						style={styles.list}
						/> */}
						<Text
						category="h6"
						appearance="hint"
						style={GlobalStyle.subtitle}
						>משתמש</Text>
						<ListItem
						title="שם משתמש"
						description={this.state.username}
						accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
						accessoryRight={(props) => <Icon {...props} name="arrow-ios-back" />}
						/>
						<Divider/>
						<ListItem
						title="דואר אלקטרוני"
						description={this.state.email}
						accessoryLeft={(props) => <Icon {...props} name="at" />}
						accessoryRight={(props) => <Icon {...props} name="arrow-ios-back" />}
						/>
						<Divider/>
						<ListItem
						title="סיסמה"
						accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
						accessoryRight={(props) => <Icon {...props} name="arrow-ios-back" />}
						/>
						<Text
						category="h6"
						appearance="hint"
						style={GlobalStyle.subtitle}
						>אפליקציה</Text>
						<ListItem
						title="התראות"
						accessoryLeft={(props) => <Icon {...props} name="bell-outline" />}
						accessoryRight={(props) => <Icon {...props} name="arrow-ios-back" />}
						/>
						<Divider/>
						<ListItem
						title="ערכת נושא"
						description={this.context.theme.name}
						accessoryLeft={(props) => <Icon {...props} name="moon-outline" />}
						accessoryRight={(props) => <Icon {...props} name="arrow-ios-back" />}
						onPress={() => this.props.navigation.navigate("Settings-SelectTheme")}
						/>
						<Button
						appearance="outline"
						status="basic"
						style={{marginTop: 40}}
						onPress={() => this.signOutConfirmation.current.show()}
						>התנתק</Button>
						<Button
						appearance="outline"
						status="danger"
						style={{marginTop: 20}}
						onPress={() => this.deleteAccountConfirmation.current.show()}
						// onPress={() => firebase.auth().currentUser.delete()}
						>מחק חשבון</Button>
						</View>
					</View>
				</Layout>
				<ConfirmationModal
				message="האם אתה בטוח שברצונך להתנתק?"
				confirmText="כן"
				confirmAction={() => firebase.auth().signOut()}
				cancelText="לא"
				ref={this.signOutConfirmation}
				/>
				<ConfirmationModal
				message="האם אתה בטוח שברצונך למחוק את החשבון? פעולה זו לא ניתנת לביטול"
				confirmText="כן"
				cancelText="לא"
				ref={this.deleteAccountConfirmation}
				/>
				</React.Fragment>
			);
		}
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		fontWeight: "bold"
	},
	list: {
		flex: 1,
		width: "100%",
		// alignItems: "center",
		// justifyContent: "center"
	},
	listItem: {
		width: "100%",
		// alignItems: "center",
		// justifyContent: "center"
	}
});
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: 50,
	},
    header: {
		flex: 1,
		alignItems: "center",
        justifyContent: 'space-around',
        paddingHorizontal: "5%",
	},
    body: {
		flex: 10,
		alignItems: "center",
	},
    bodyItem: {
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
    },
    pageTitle: {
        alignSelf: "flex-start",
        paddingRight: 10,
    },
    subtitle: {
        paddingTop: 16,
        paddingBottom: 6,
    },
    radioItem: {
        paddingTop: 16,
        paddingBottom: 6,
    },
});
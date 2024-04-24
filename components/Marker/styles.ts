import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		padding: 3,
		margin: 3,
		borderRadius: 50,
		backgroundColor: "white",
	},
	selectedContainer: {
		width: 50,
		height: 50,
		padding: 5,
		margin: 10,
		borderRadius: 50,
		zIndex: 10,
	},
	zoomedContainer: {
		flexDirection: "row",
		height: 60,
		padding: 5,
		margin: 10,
		borderRadius: 30,
		backgroundColor: "white",
		shadowColor: "black",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		overflow: "hidden",
	},
	companyBadgeWrapper: {
		zIndex: 1,
		padding: 2,
		position: "absolute",
		top: 0,
		right: 0,
		borderRadius: 30,
		backgroundColor: "white",
	},
	companyBadge: {
		width: 18,
		height: 18,
		borderRadius: 15,
	},
	logo: {
		width: 34,
		height: 34,
		borderRadius: 30,
	},
	selectedLogo: {
		width: 40,
		height: 40,
		borderRadius: 45,
	},
	details: {
		gap: 3,
		padding: 5,
		maxWidth: 180,
		justifyContent: "center",
	},
	title: {
		color: "black",
	},
	company: {
		color: "gray"
	},
	zoomedVideoContainer: {
		alignItems: "center",
	},
	videoImageWrapper: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: "white",
		overflow: "hidden",
	},
	videoImage: {
		width: 100,
		height: 150,
		borderRadius: 10,
	},
	selectedCompanyBadgeWrapper: {
		top: 10,
		right: 10,
	},
});

export default styles;

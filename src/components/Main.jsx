import React from "react";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";

// import Text from "./Text";
// import RepositoryList from "./RepositoyList";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.bgSecondary,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			{/* <Text>Rate Repository Application</Text> */}
			<RepositoryList />
		</View>
	);
};

export default Main;

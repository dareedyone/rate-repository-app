import React from "react";
import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoyList";

// import Text from "./Text";
// import RepositoryList from "./RepositoyList";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			{/* <Text>Rate Repository Application</Text> */}
			<RepositoryList />
			{/* <>
				<Text>Simple text</Text>
				<Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
				<Text fontWeight="bold" fontSize="subheading">
					Bold subheading
				</Text>
				<Text color="textSecondary">Text with secondary color</Text> 
			</>*/}
		</View>
	);
};

export default Main;

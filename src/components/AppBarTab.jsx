import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
	text: {
		color: "#FFFFFF",
	},
});

const AppBarTab = () => {
	return (
		<TouchableWithoutFeedback>
			<Text style={styles.text} fontWeight="bold">
				Repositories
			</Text>
		</TouchableWithoutFeedback>
	);
};

export default AppBarTab;

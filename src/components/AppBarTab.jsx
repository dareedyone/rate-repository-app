import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
	text: {
		color: theme.colors.colorWhite,
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

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";
import Text from "./Text";

const MyComp = ({ text, ...props }) => {
	return (
		<TouchableOpacity {...props}>
			<Text style={styles.text} fontWeight="bold">
				{text}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	text: {
		color: theme.colors.colorWhite,
	},
});

const AppBarTab = ({ text, route }) => {
	return (
		<Link
			to={route ? route : "/"}
			text={text}
			component={MyComp}
			activeOpacity={0.5}
		/>
	);
};

export default AppBarTab;

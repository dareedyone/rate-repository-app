import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 30,
		padding: 30,
		backgroundColor: theme.colors.bgPrimary,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<AppBarTab />
		</View>
	);
};

export default AppBar;

import React, { useContext } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { AUTHORIZED_USER } from "../graphql/queries";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Text from "./Text";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 30,
		padding: 30,
		backgroundColor: theme.colors.bgPrimary,
	},
});

const AppBar = () => {
	const { data } = useQuery(AUTHORIZED_USER);
	const authStorage = useContext(AuthStorageContext);
	const apolloClient = useApolloClient();
	const history = useHistory();
	console.log("query data", data);
	const handleLogOut = () => {
		authStorage.removeAccessToken();
		apolloClient.resetStore();
		history.push("/signin");
	};
	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab text="Repositories" />
				{data?.authorizedUser ? (
					<TouchableOpacity
						style={{ marginLeft: 15, activeOpacity: 0.5 }}
						onPress={handleLogOut}
					>
						<Text style={{ color: "white" }} fontWeight="bold">
							Log out
						</Text>
					</TouchableOpacity>
				) : (
					<AppBarTab route="/signin" text="Sign in" />
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;

import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryItemView from "./RepositoryItemView";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";

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
			<Switch>
				<Route path="/signin" exact>
					<SignIn />
				</Route>
				<Route path="/repoview/:id" exact>
					<RepositoryItemView />
				</Route>
				<Route path="/" exact>
					<RepositoryList />
				</Route>
				<Redirect to="/" />
			</Switch>
		</View>
	);
};

export default Main;

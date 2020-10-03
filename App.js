import React from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from "./src/utils/apolloClient";

import Main from "./src/components/Main";

const App = () => {
	const apolloClient = createApolloClient();
	return (
		<NativeRouter>
			<ApolloProvider client={apolloClient}>
				<Main />
			</ApolloProvider>
		</NativeRouter>
	);
};

export default App;

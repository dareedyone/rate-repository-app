import ApolloClient from "apollo-boost";
import Constants from "expo-constants";

const createApolloClient = () => {
	return new ApolloClient({
		// Replace the IP address part with your own IP address!
		// eslint-disable-next-line no-undef
		uri: Constants.manifest.extra.apollo_uri,
	});
};

export default createApolloClient;

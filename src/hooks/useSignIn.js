import { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../graphql/mutation";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
	const authStorage = useContext(AuthStorageContext);
	const [mutateWith, result] = useMutation(SIGN_IN);
	const apolloClient = useApolloClient();
	const signIn = async (credentials) => {
		//the name of the variable declared in the mutation schema must be used, i guess it is the case for apollo-boost
		await mutateWith({ variables: { credentials } });
		const token = result.data.authorize.accessToken;
		console.log("token here", token);
		authStorage.setAccessToken(token);
		apolloClient.resetStore();
	};

	return [signIn];
};

export default useSignIn;

import { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../graphql/mutation";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
	const authStorage = useContext(AuthStorageContext);
	const [mutateWith] = useMutation(SIGN_IN);
	const apolloClient = useApolloClient();
	const signIn = async (credentials) => {
		//the name of the variable declared in the mutation schema must be used, i guess it is the case for apollo-boost
		const result = await mutateWith({ variables: { credentials } });
		console.log("result here", result?.data?.authorize?.accessToken);
		authStorage.setAccessToken(result?.data?.authorize?.accessToken);
		apolloClient.resetStore();
	};

	return [signIn];
};

export default useSignIn;

import { useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../graphql/mutation";

const useSignIn = () => {
	const [mutateWith, result] = useMutation(SIGN_IN);

	const signIn = async (credentials) => {
		//the name of the variable declared in the mutation schema must be used, i guess it is the case for apollo-boost
		await mutateWith({ variables: { credentials } });

		return result;
	};

	return [signIn, result];
};

export default useSignIn;

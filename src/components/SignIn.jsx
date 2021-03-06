import { Formik } from "formik";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router-native";

const styles = {
	container: {
		backgroundColor: "white",
		padding: 15,
	},
	input: {
		padding: 15,
		borderWidth: 1,
		marginVertical: 4,
		borderRadius: 4,
	},
	button: {
		padding: 15,
		marginVertical: 4,
		borderRadius: 4,
		textAlign: "center",
		backgroundColor: theme.colors.primary,
		color: theme.colors.colorWhite,
	},
};

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput
				style={styles.input}
				name="username"
				placeholder="Username"
				testID="usernameField"
			/>
			<FormikTextInput
				style={styles.input}
				secureTextEntry={true}
				name="password"
				placeholder="Password"
				testID="passwordField"
			/>
			<TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}>
				<Text style={styles.button}>Sign in</Text>
			</TouchableWithoutFeedback>
		</View>
	);
};

export const SignInFormContainer = ({ handleSubmit }) => {
	const initialValues = { username: "", password: "" };
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();
	const history = useHistory();
	const handleSubmit = async ({ username, password }) => {
		try {
			await signIn({ username, password });
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};
	return <SignInFormContainer handleSubmit={handleSubmit} />;
};

export default SignIn;

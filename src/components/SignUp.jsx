import { Formik } from "formik";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router-native";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/mutation";

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
	username: yup
		.string()
		.required("Username is required")
		.max(30, "username must not be more than 30 characters"),
	password: yup
		.string()
		.required("Password is required")
		.min(5, "password given too short!")
		.max(30, "password must not be more than 50 characters"),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password"), null], "passwords don't match")
		.required("password confirm is required"),
});

const SignUpForm = ({ onSubmit }) => {
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
			<FormikTextInput
				style={styles.input}
				secureTextEntry={true}
				name="passwordConfirm"
				placeholder="Confirm password"
				testID="passwordField"
			/>
			<TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}>
				<Text style={styles.button}>Sign Up</Text>
			</TouchableWithoutFeedback>
		</View>
	);
};

export const SignUpFormContainer = ({ handleSubmit }) => {
	const initialValues = { username: "", password: "", passwordConfirm: "" };
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignUp = () => {
	const [signIn] = useSignIn();
	const history = useHistory();
	const [mutateWith] = useMutation(CREATE_USER);
	const handleSubmit = async ({ username, password }) => {
		try {
			await mutateWith({ variables: { user: { username, password } } });
			await signIn({ username, password });
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};
	return <SignUpFormContainer handleSubmit={handleSubmit} />;
};

export default SignUp;

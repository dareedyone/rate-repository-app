import { Formik } from "formik";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
// import useSignIn from "../hooks/useSignIn";
// import { useHistory } from "react-router-native";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_REVIEW } from "../graphql/mutation";
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
	ownerName: yup.string().required("Repository owner username is required"),
	repositoryName: yup.string().required("Repository name is required"),
	rating: yup
		.number()
		.typeError("Rating must be a number")
		.required("Rating is required")
		.min(0, "Rating between 0 and 100")
		.max(100, "Rating must be between 0 and 100"),
	text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput
				style={styles.input}
				name="ownerName"
				placeholder="Repository owner username"
				testID="usernameField"
			/>
			<FormikTextInput
				style={styles.input}
				name="repositoryName"
				placeholder="Repository name"
				testID="nameField"
			/>
			<FormikTextInput
				style={styles.input}
				name="rating"
				type="number"
				placeholder="Rating between 0 and 100"
				testID="ratingField"
			/>
			<FormikTextInput
				style={styles.input}
				name="text"
				placeholder="Review"
				multiline={true}
				testID="reviewField"
			/>
			<TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}>
				<Text style={styles.button}>Create a review</Text>
			</TouchableWithoutFeedback>
		</View>
	);
};

export const ReviewFormContainer = ({ handleSubmit }) => {
	const initialValues = {
		ownerName: "",
		repositoryName: "",
		rating: "",
		text: "",
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const Review = () => {
	const [mutateWith] = useMutation(CREATE_REVIEW);
	const history = useHistory();
	const handleSubmit = async (review) => {
		// console.log(review);
		//their is no number input type in react-native so it throws graphql error
		try {
			const { data } = await mutateWith({
				variables: { review: { ...review, rating: Number(review.rating) } },
			});
			history.push(`/repoview/${data.createReview.repositoryId}`);

			// console.log("result", result);
		} catch (e) {
			console.log("catch runs");
			console.log(e);
		}
	};
	return <ReviewFormContainer handleSubmit={handleSubmit} />;
};

export default Review;

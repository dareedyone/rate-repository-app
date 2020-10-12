import { useMutation, useQuery } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../graphql/mutation";
import { format } from "date-fns";
import React from "react";
import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from "react-native";
import { useHistory } from "react-router-native";
import { AUTHORIZED_USER } from "../graphql/queries";
import theme from "../theme";
import { ItemSeparator } from "./SingleRepository";
const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.colorWhite,
		paddingVertical: 20,
		paddingHorizontal: 23,
	},
	main: {
		display: "flex",
		flexDirection: "row",
	},
	rating: {
		borderColor: theme.colors.primary,
		borderWidth: 3,
		width: 60,
		height: 60,
		borderRadius: 30,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	ratingText: {
		fontSize: 25,
		color: theme.colors.primary,
		margin: 0,
		includeFontPadding: false,
		textAlignVertical: "center",
	},
	username: {
		fontWeight: "bold",
		fontSize: 17,
		marginBottom: 5,
	},
	reviewDate: {
		color: theme.colors.textSecondary,
		marginBottom: 10,
	},
	textContainer: { paddingLeft: 18, width: "80%" },
	separator: {
		height: 15,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 17,
	},
	redButton: {
		backgroundColor: "#D6394C",
		color: theme.colors.colorWhite,
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 5,
		fontWeight: "bold",
	},
	blueButton: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.colorWhite,
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 5,
		fontWeight: "bold",
	},
});
const UserReviews = () => {
	const history = useHistory();
	const { data, loading, refetch } = useQuery(AUTHORIZED_USER, {
		variables: { includeReviews: true },
	});
	const [mutateWith] = useMutation(DELETE_REVIEW);
	if (loading) return <Text>loading</Text>;

	// console.log("data", data);
	const reviewNodes = data?.authorizedUser
		? data?.authorizedUser?.reviews?.edges?.map((edge) => edge.node)
		: [];

	const handleRepoView = (id) => {
		history.push(`/repoview/${id}`);
	};

	const handleDelete = (id) => {
		Alert.alert(
			"Delete review",
			"Are you sure you want to delete this review?",
			[
				{ text: "CANCEL" },
				{
					text: "DELETE",
					onPress: async () => {
						await mutateWith({ variables: { id } });
						refetch();
					},
				},
			]
		);
	};

	console.log("reviewNodes", reviewNodes);
	const ReviewItem = ({ review }) => {
		return (
			<View style={styles.container}>
				<View style={styles.main}>
					<View style={styles.rating}>
						<Text style={styles.ratingText}>{review.rating}</Text>
					</View>

					<View style={styles.textContainer}>
						<Text style={styles.username}>{review.user.username}</Text>
						<Text style={styles.reviewDate}>
							{format(new Date(review.createdAt), "dd.MM.yyyy")}
						</Text>
						<Text>{review.text}</Text>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableHighlight
						onPress={() => handleRepoView(review.repositoryId)}
					>
						<Text style={styles.blueButton}>View repository</Text>
					</TouchableHighlight>

					<TouchableHighlight onPress={() => handleDelete(review.id)}>
						<Text style={styles.redButton}>Delete review</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	};
	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <ReviewItem review={item} />}
		/>
	);
};

export default UserReviews;

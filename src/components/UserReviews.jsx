import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AUTHORIZED_USER } from "../graphql/queries";
import theme from "../theme";
import { ItemSeparator } from "./SingleRepository";
const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.colorWhite,
		paddingVertical: 20,
		paddingHorizontal: 23,
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
});
const UserReviews = () => {
	const { data, loading } = useQuery(AUTHORIZED_USER, {
		variables: { includeReviews: true },
	});
	if (loading) return <Text>loading</Text>;

	// console.log("data", data);
	const reviewNodes = data?.authorizedUser
		? data?.authorizedUser?.reviews?.edges?.map((edge) => edge.node)
		: [];

	// console.log("reviewNodes", reviewNodes);
	const ReviewItem = ({ review }) => {
		return (
			<View style={styles.container}>
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

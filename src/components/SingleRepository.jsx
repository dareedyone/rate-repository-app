import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
//test file show
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

export const ItemSeparator = () => <View style={styles.separator} />;
const SingleRepository = () => {
	const { id } = useParams();

	const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
		fetchPolicy: "cache-and-network",
		variables: { id, first: 5 },
	});

	const handleFetchMore = () => {
		console.log("review handleFectch ran");
		const canFetchMore =
			!loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
		if (!canFetchMore) return;
		fetchMore({
			query: GET_REPOSITORY,
			variables: {
				id,
				after: data.repository.reviews.pageInfo.endCursor,
				first: 5,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				console.log("see this more result", fetchMoreResult);
				const nextResult = {
					repository: {
						...fetchMoreResult.repository,
						reviews: {
							...fetchMoreResult.repository.reviews,
							edges: [
								...previousResult.repository.reviews.edges,
								...fetchMoreResult.repository.reviews.edges,
							],
						},
					},
				};

				return nextResult;
			},
		});
	};
	console.log("data", data);
	const reviewNodes = data?.repository
		? data?.repository?.reviews?.edges?.map((edge) => edge.node)
		: [];

	console.log("reviewNodes", reviewNodes);

	if (loading) return <Text>loading</Text>;
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
			onEndReached={handleFetchMore}
			onEndReachedThreshold={0.5}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <ReviewItem review={item} />}
			ListHeaderComponent={() => (
				<View>
					<RepositoryItem singleView={true} item={data.repository} />
					<ItemSeparator />
				</View>
			)}
		/>
	);
};

export default SingleRepository;

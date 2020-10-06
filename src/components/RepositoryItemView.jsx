import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 23,
	},
});
const RepositoryItemView = () => {
	const { id } = useParams();

	const { loading, data } = useQuery(GET_REPOSITORY, {
		variables: { id },
	});
	if (loading) return <Text>loading</Text>;
	return (
		<View>
			<RepositoryItem singleView={true} item={data.repository} />
		</View>
	);
};

export default RepositoryItemView;

import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 23,
	},
	separator: {
		height: 15,
	},
});

// const repositories = [
// 	{
// 		id: "jaredpalmer.formik",
// 		fullName: "jaredpalmer/formik",
// 		description: "Build forms in React, without the tears",
// 		language: "TypeScript",
// 		forksCount: 1589,
// 		stargazersCount: 21553,
// 		ratingAverage: 88,
// 		reviewCount: 4,
// 		ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
// 	},
// 	{
// 		id: "rails.rails",
// 		fullName: "rails/rails",
// 		description: "Ruby on Rails",
// 		language: "Ruby",
// 		forksCount: 18349,
// 		stargazersCount: 45377,
// 		ratingAverage: 100,
// 		reviewCount: 2,
// 		ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
// 	},
// 	{
// 		id: "django.django",
// 		fullName: "django/django",
// 		description: "The Web framework for perfectionists with deadlines.",
// 		language: "Python",
// 		forksCount: 21015,
// 		stargazersCount: 48496,
// 		ratingAverage: 73,
// 		reviewCount: 5,
// 		ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
// 	},
// 	{
// 		id: "reduxjs.redux",
// 		fullName: "reduxjs/redux",
// 		description: "Predictable state container for JavaScript apps",
// 		language: "TypeScript",
// 		forksCount: 13902,
// 		stargazersCount: 52869,
// 		ratingAverage: 0,
// 		reviewCount: 0,
// 		ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
// 	},
// ];
const SearchBarComp = ({ setReposOption }) => {
	const [searchText, setSearchText] = React.useState("");
	const [searchKeyword] = useDebounce(searchText, 500);
	const onChangeSearch = (query) => setSearchText(query);
	useEffect(() => {
		setReposOption({ searchKeyword });
	}, [searchKeyword]);

	return (
		<Searchbar
			style={{ marginBottom: 15 }}
			placeholder="Search"
			onChangeText={onChangeSearch}
			value={searchText}
		/>
	);
};
//since class component is used i don''t have to set a global var inacse component rerender to reset value
export const Dropdown = ({ setReposOption }) => {
	return (
		<RNPickerSelect
			onValueChange={(value) => {
				{
					/* console.log("let's see those values", value); */
				}
				setReposOption(JSON.parse(value));
			}}
			items={[
				{
					label: "Latest repositories",
					value: JSON.stringify({
						orderBy: "CREATED_AT",
						orderDirection: "DESC",
					}),
				},
				{
					label: "Highest rated repositories",
					value: JSON.stringify({
						orderBy: "RATING_AVERAGE",
						orderDirection: "DESC",
					}),
				},
				{
					label: "Lowest rated repositories",
					value: JSON.stringify({
						orderBy: "RATING_AVERAGE",
						orderDirection: "ASC",
					}),
				},
			]}
		/>
	);
};
const ItemSeparator = () => <View style={styles.separator} />;

// export const RepositoryListContainer = ({ repositories, setReposOption }) => {
// 	// Get the nodes from the edges array
// 	const history = useHistory();
// 	// console.log("setRepo REACH RPLC", setReposOption);
// 	// console.log(repositories);
// 	return (
// 		<FlatList
// 			data={repositories}
// 			ItemSeparatorComponent={ItemSeparator}
// 			ListHeaderComponent={() => (
// 				<View style={{ padding: 15 }}>
// 					<SearchBarComp setReposOption={setReposOption} />
// 					<Dropdown setReposOption={setReposOption} />
// 				</View>
// 			)}
// 			renderItem={({ item }) => (
// 				<RepositoryItem item={item} history={history} />
// 			)}
// 			keyExtractor={(item) => item.id}

// 			// other props
// 		/>
// 	);
// };

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		// this.props contains the component's props
		const props = this.props;
		return (
			<View style={{ padding: 15 }}>
				<SearchBarComp setReposOption={props.setReposOption} />
				<Dropdown setReposOption={props.setReposOption} />
			</View>
		);
	};

	render() {
		return (
			<FlatList
				data={this.props.repositories}
				onEndReached={this.props.onEndReach}
				onEndReachedThreshold={0.5}
				ItemSeparatorComponent={ItemSeparator}
				ListHeaderComponent={this.renderHeader}
				renderItem={({ item }) => (
					<RepositoryItem item={item} history={this.props.history} />
				)}
				keyExtractor={(item) => item.id}

				// other props
			/>
		);
	}
}

const RepositoryList = () => {
	const { repositories, setReposOption, fetchMore } = useRepositories();
	// console.log(fetchMore);
	// console.log(fetchMore, "is there ?");
	const repositoryNodes = repositories
		? repositories?.edges?.map((edge) => edge.node)
		: [];
	const history = useHistory();
	console.log(repositoryNodes);
	const onEndReach = () => {
		fetchMore();
	};
	return (
		<RepositoryListContainer
			setReposOption={setReposOption}
			repositories={repositoryNodes}
			history={history}
			onEndReach={onEndReach}
		/>
	);
};

export default RepositoryList;

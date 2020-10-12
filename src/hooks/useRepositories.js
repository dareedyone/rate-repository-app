import { useQuery } from "@apollo/react-hooks";
import { useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
	const [reposOption, setReposOption] = useState({
		orderBy: "CREATED_AT",
		orderDirection: "DESC",
	});
	// const av = { ...reposOption, first: 5 };
	// console.log("reposOPtion here", reposOption);
	// console.log("WHTAS UP HERE", av);
	const {
		data,
		// eslint-disable-next-line no-unused-vars
		error,
		fetchMore,
		loading,
		...result
	} = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables: {
			...reposOption,
			first: 8,
		},
	});

	const handleFetchMore = () => {
		console.log("handleFectch ran");
		const canFetchMore =
			!loading && data && data.repositories.pageInfo.hasNextPage;
		if (!canFetchMore) return;
		fetchMore({
			query: GET_REPOSITORIES,
			variables: {
				after: data.repositories.pageInfo.endCursor,
				first: 8,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				const nextResult = {
					repositories: {
						...fetchMoreResult.repositories,
						edges: [
							...previousResult.repositories.edges,
							...fetchMoreResult.repositories.edges,
						],
					},
				};

				return nextResult;
			},
		});
	};

	return {
		repositories: data?.repositories,
		loading,
		setReposOption,
		fetchMore: handleFetchMore,
		...result,
	};
};

export default useRepositories;

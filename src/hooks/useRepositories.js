import { useQuery } from "@apollo/react-hooks";
import { useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
	const [reposOption, setReposOption] = useState({
		orderBy: "CREATED_AT",
		orderDirection: "DESC",
	});
	const {
		data,
		// eslint-disable-next-line no-unused-vars
		error,
		loading,
	} = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables: { ...reposOption },
	});
	return { repositories: data?.repositories, loading, setReposOption };
};

export default useRepositories;

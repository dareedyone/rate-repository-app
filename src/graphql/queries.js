import { gql } from "apollo-boost";
export const GET_REPOSITORIES = gql`
	query repositories(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
		$after: String
		$first: Int
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
			pageInfo {
				hasNextPage
				totalCount
				startCursor
				endCursor
			}
			edges {
				cursor
				node {
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					forksCount
					ownerAvatarUrl
					description
					language
				}
			}
		}
	}
`;
export const AUTHORIZED_USER = gql`
	query {
		authorizedUser {
			id
			username
		}
	}
`;

export const GET_REPOSITORY = gql`
	query repository($id: ID!, $first: Int, $after: String) {
		repository(id: $id) {
			id
			ownerName
			name
			createdAt
			fullName
			ratingAverage
			reviewCount
			stargazersCount
			forksCount
			ownerAvatarUrl
			description
			language
			url
			reviews(first: $first, after: $after) {
				edges {
					node {
						id
						text
						rating
						createdAt
						repositoryId
						user {
							id
							username
						}
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					totalCount
					hasNextPage
				}
			}
		}
	}
`;

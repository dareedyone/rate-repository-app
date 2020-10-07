import { gql } from "apollo-boost";
export const GET_REPOSITORIES = gql`
	query {
		repositories {
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
	query repository($id: ID!) {
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
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}
`;

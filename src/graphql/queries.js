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

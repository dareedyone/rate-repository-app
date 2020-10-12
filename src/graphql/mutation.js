import { gql } from "apollo-boost";
export const SIGN_IN = gql`
	mutation authorize($credentials: AuthorizeInput!) {
		authorize(credentials: $credentials) {
			accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation createReview($review: CreateReviewInput!) {
		createReview(review: $review) {
			id
			user {
				id
				username
			}
			rating
			createdAt
			text
			repositoryId
		}
	}
`;
export const CREATE_USER = gql`
	mutation createUser($user: CreateUserInput!) {
		createUser(user: $user) {
			id
			username
			createdAt
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation DeleteReview($id: ID!) {
		deleteReview(id: $id)
	}
`;

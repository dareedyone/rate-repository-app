import React from "react";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
	describe("RepositoryListContainer", () => {
		it("renders repository information correctly", () => {
			const { getAllByTestId } = render(
				<RepositoryListContainer repositories={repositories} />
			);

			const repositories = {
				pageInfo: {
					totalCount: 8,
					hasNextPage: true,
					endCursor:
						"WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
					startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
				},
				edges: [
					{
						node: {
							id: "jaredpalmer.formik",
							fullName: "jaredpalmer/formik",
							description: "Build forms in React, without the tears",
							language: "TypeScript",
							forksCount: 1619,
							stargazersCount: 21856,
							ratingAverage: 88,
							reviewCount: 3,
							ownerAvatarUrl:
								"https://avatars2.githubusercontent.com/u/4060187?v=4",
						},
						cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
					},
					{
						node: {
							id: "async-library.react-async",
							fullName: "async-library/react-async",
							description: "Flexible promise-based React data loader",
							language: "JavaScript",
							forksCount: 69,
							stargazersCount: 1760,
							ratingAverage: 72,
							reviewCount: 3,
							ownerAvatarUrl:
								"https://avatars1.githubusercontent.com/u/54310907?v=4",
						},
						cursor:
							"WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
					},
				],
			};
			// Add your test code here
			expect(getAllByTestId("repositoryName"))[0].toHaveTextContext(
				"jaredpalmer/formik"
			);
			expect(getAllByTestId("repositoryDescription"))[0].toHaveTextContext(
				"Build forms in React, without the tears"
			);
			expect(getAllByTestId("repositoryLanguage"))[0].toHaveTextContext(
				"TypeScript"
			);
			expect(getAllByTestId("repositoryStargazersCount"))[0].toHaveTextContext(
				"21.8k"
			);
			expect(getAllByTestId("repositoryForksCount"))[0].toHaveTextContext(
				"1.6k"
			);
			expect(getAllByTestId("repositoryReviewCount"))[0].toHaveTextContext("3");
			expect(getAllByTestId("repositoryRatingAverage"))[0].toHaveTextContext(
				"88"
			);
		});
	});
});

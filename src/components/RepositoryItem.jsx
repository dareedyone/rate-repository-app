import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.colorWhite,
		paddingVertical: 20,
		paddingHorizontal: 23,
	},
	headerContainer: {
		display: "flex",
		flexDirection: "row",
	},
	headerAvatar: {
		alignSelf: "flex-start",
		width: 50,
		height: 50,
	},
	headerTextsContainer: {
		marginLeft: 20,
		display: "flex",
		justifyContent: "space-between",
	},
	headerName: {
		fontWeight: "bold",
	},
	headerDescription: {
		color: theme.colors.textSecondary,
		width: "95%",
		padding: 5,
	},
	headerLanguage: {
		display: "flex",
		flexDirection: "row",
	},
	headerLanguageBtn: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 4,
		paddingHorizontal: 8,
		flexGrow: 0,
		borderRadius: 3,
		marginTop: 5,
	},
	headerLanguageText: {
		color: theme.colors.colorWhite,
	},
	flexBrowserCustom: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingTop: 10,
	},
	footerEach: {
		textAlign: "center",
	},
	footerKey: {
		color: theme.colors.textSecondary,
	},
	githubButton: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 9,
		flexGrow: 0,
		borderRadius: 3,
		marginVertical: 15,
	},

	githubButtonText: {
		color: theme.colors.colorWhite,
		textAlign: "center",
		fontWeight: "bold",
	},
});
const RepositoryItem = ({ item, history, singleView }) => {
	const convertAndRound = (index, params) => {
		const first = params.substr(0, index);
		const last = params.substr(index, 2);
		const decimalArr = last.split("");
		const decimal = Math.round(Number(`${decimalArr[0]}.${decimalArr[1]}`));
		return decimal <= 0 ? (params = first) : (params = first + "." + decimal);
	};
	const formatToThousand = (params) => {
		params = String(params);
		if (params.length <= 3) return params;
		switch (params.length) {
			case 4:
				params = convertAndRound(1, params);
				break;
			case 5:
				params = convertAndRound(2, params);
				break;
			case 6:
				params = convertAndRound(3, params);
				break;
			default:
				return null;
		}
		return (params += "k");
	};

	const goToGithub = () => {
		Linking.openURL(item.url);
	};

	const goToRepoView = () => {
		history.push(`/repoview/${item.id}`);
	};

	const UnpressableRepo = () => {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Image
						style={styles.headerAvatar}
						source={{ uri: item.ownerAvatarUrl }}
					/>
					<View style={styles.headerTextsContainer}>
						<Text testID="repositoryName" style={styles.headerName}>
							{item.fullName}
						</Text>
						<Text
							testID="repositoryDescription"
							style={styles.headerDescription}
						>
							{item.description}
						</Text>
						<View style={styles.headerLanguage}>
							<View style={styles.headerLanguageBtn}>
								<Text
									testID="repositoryLanguage"
									style={styles.headerLanguageText}
								>
									{item.language}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.flexBrowserCustom}>
					<View>
						<Text testID="repositoryStargazersCount" style={styles.footerEach}>
							{formatToThousand(item.stargazersCount)}
						</Text>
						<Text style={styles.footerKey}>Stars</Text>
					</View>

					<View>
						<Text testID="repositoryForksCount" style={styles.footerEach}>
							{formatToThousand(item.forksCount)}
						</Text>
						<Text style={styles.footerKey}>Forks</Text>
					</View>

					<View>
						<Text testID="repositoryReviewCount" style={styles.footerEach}>
							{item.reviewCount}
						</Text>
						<Text style={styles.footerKey}>Reviews</Text>
					</View>

					<View>
						<Text testID="repositoryRatingAverage" style={styles.footerEach}>
							{item.ratingAverage}
						</Text>
						<Text style={styles.footerKey}>Rating </Text>
					</View>
				</View>
				{singleView && (
					<TouchableOpacity
						onPress={goToGithub}
						activeOpacity={0.9}
						style={styles.githubButton}
					>
						<Text style={styles.githubButtonText}>Open in Github</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	};

	return singleView ? (
		<UnpressableRepo />
	) : (
		<TouchableOpacity onPress={goToRepoView}>
			<UnpressableRepo />
		</TouchableOpacity>
	);
};

export default RepositoryItem;

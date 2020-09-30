import React from "react";
import { TextInput as NativeTextInput } from "react-native";
import theme from "../theme";

// const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [style, error && { borderColor: theme.colors.danger }];

	return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;

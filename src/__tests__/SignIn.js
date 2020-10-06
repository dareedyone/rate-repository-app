import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInFormContainer } from "../components/SignIn";
// ...

describe("SignIn", () => {
	describe("SignInContainer", () => {
		it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
			// render the SignInContainer component, fill the text inputs and press the submit button
			const handleSubmit = jest.fn();
			const { getByTestId } = render(
				<SignInFormContainer handleSubmit={handleSubmit} />
			);

			fireEvent.changeText(getByTestId("usernameField"), "kalle");
			fireEvent.changeText(getByTestId("passwordField"), "password");

			fireEvent.press(getByTestId("submitButton"));

			await waitFor(() => {
				// expect the onSubmit function to have been called once and with a correct first argument
				expect(handleSubmit).toHaveBeenCalledTimes(1);

				expect(handleSubmit.mock.calls[0][0]).toEqual({
					username: "kalle",
					password: "password",
				});
			});
		});
	});
});

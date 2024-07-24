import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userSlice from "../Reducers/userSlice";
import SignUp from "../Components/Signup";

// Mock axios
const mock = new MockAdapter(axios);

const initialState = {
  user: {
    loading: false,
    error: null,
    success: false,
  },
};

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  preloadedState: initialState,
});

test("renders SignUp component and submits form", async () => {
  // Mock the API response
  mock.onPost("/api/v1/users/signup").reply(200, {
    data: { success: true, token: "fake-token" },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/sign-up"]}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Check if the SignUp component renders correctly
  expect(screen.getByText("Sign Up")).toBeInTheDocument();
  expect(screen.getByText("Enter your details to sign up")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("name@mail.com")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("********")).toBeInTheDocument();

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "Abhishek" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Sahu" },
  });
  fireEvent.change(screen.getByPlaceholderText("name@mail.com"), {
    target: { value: "test1@test.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("********"), {
    target: { value: "123456" },
  });
  fireEvent.change(screen.getByPlaceholderText("********"), {
    target: { value: "password123" },
  });

  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });
  const input = screen.getByLabelText("Avatar");
  fireEvent.change(input, { target: { files: [file] } });

  // Submit the form
  fireEvent.click(screen.getByText("Sign Up"));

  // Wait for the API call to complete and check if the navigation occurred
  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBeTruthy();
  });
});

test("renders SignIn component at /sign-in path", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/sign-in"]}>
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("test")).toBeInTheDocument();
});

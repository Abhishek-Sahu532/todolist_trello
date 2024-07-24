import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userSlice from "../Reducers/userSlice";
import SignIn from "../Components/Signin";

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

test("renders SignIn component and submits form", async () => {
  // Mock the API response
  mock.onPost("/api/v1/users/signin").reply(200, {
    data: { success: true, token: "fake-token" },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/sign-in"]}>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Check if the SignIn component renders correctly
  expect(screen.getByText("Sign In")).toBeInTheDocument();
  expect(
    screen.getByText("Enter your email and password to sign in")
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText("name@mail.com")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("********")).toBeInTheDocument();

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText("name@mail.com"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("********"), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Sign In"));

  // Wait for the API call to complete and check if the navigation occurred
  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(
      JSON.stringify({
        email: "test@example.com",
        password: "password123",
      })
    );
  });
});

test("renders AddTask component at /add-a-task path", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/add-a-task"]}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="add-a-task" element={<AddTask />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Task 1")).toBeInTheDocument(); //
});

test("renders SignUp component at /sign-up path", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/sign-up"]}>
        <Routes>
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("")).toBeInTheDocument();
});

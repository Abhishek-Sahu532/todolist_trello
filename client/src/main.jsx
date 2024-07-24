import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SignIn from "./Components/Signin.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Components/Signup.jsx";
import Root from "./Components/Root.jsx";
import AddTask from "./Components/AddTask.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
				path: '/',
				element: <PrivateRoute />,
				children: [
					{
						path: '/',
						element: <Root />,
					},
				],
			},
      {
				path: '/',
				element: <PrivateRoute />,
				children: [
					{
						path: 'add-a-task',
						element: <AddTask />,
					},
				],
			},

      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

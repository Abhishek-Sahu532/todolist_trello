import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import taskSlice from '../Reducers/taskSlice';
import userSlice from '../Reducers/userSlice';
import Root from './Root';
import PrivateRoute from './PrivateRoute';
import AddTask from './AddTask';


// Mock axios
const mock = new MockAdapter(axios);

const initialState = {
  tasks: {
    loading: false,
    error: null,
    todo: [],
    inProgress: [],
    done: [],
  },
};

const store = configureStore({
  reducer: {
    tasks: taskSlice,
    user: userSlice
  },
  preloadedState: initialState,
});

test('renders Root component at root path', async () => {
  // Mock the API response
  mock.onGet('/api/v1/tasks/tasks').reply(200, {
    data: [
      { _id: '1', processTitle: 'todo', title: 'Task 1' },
      { _id: '2', processTitle: 'inProgress', title: 'Task 2' },
      { _id: '3', processTitle: 'done', title: 'Task 3' },
    ],
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    </Provider>
  );

  // Waiting for the API call to complete
  await waitFor(() => {
    expect(screen.getByText('TODO')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
  expect(screen.getByText('Task 3')).toBeInTheDocument();
});

test('renders AddTask component at /add-a-task path', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/add-a-task']}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="add-a-task" element={<AddTask />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Task 1')).toBeInTheDocument(); 
});

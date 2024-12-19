import React from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

import UsersLists from "./components/UsersLists.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AuthProvider from "./Authcontext/AuthProvider"; // Ensure this is correctly imported
import ProtectedRoute from "./authProviderRouter/protectedRoute.jsx";
import AuthenticatedRouterProvider from "./authProviderRouter/AuthenticatedRouterProvider.jsx";
import Editusers from "./components/editusers.jsx";
import InActiveUsers from "./components/InActiveUsers.jsx";
import TopUsersFrequancy from "./components/TopUsersFrequancy.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute>
                <Editusers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersLists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/top-users-frequency"
            element={
              <ProtectedRoute>
                <TopUsersFrequancy />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/inactive-users"
            element={
              <ProtectedRoute>
                <InActiveUsers />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <AuthenticatedRouterProvider router={router}>
      <RouterProvider router={router} />
    </AuthenticatedRouterProvider>
  );
}

export default App;

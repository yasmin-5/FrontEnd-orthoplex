import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./authProviderRouter/protectedRoute";
import Editusers from "./components/editusers";
import UsersLists from "./components/UsersLists";
import InActiveUsers from "./components/InActiveUsers";
import TopUsersFrequency from "./components/TopUsersFrequancy";

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
          path="/inactive-users"
          element={
            <ProtectedRoute>
              <InActiveUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/top-users-frequency"
          element={
            <ProtectedRoute>
              <TopUsersFrequency />
            </ProtectedRoute>
          }
        />
      </Route>
    </Route>
  )
);

export default router;

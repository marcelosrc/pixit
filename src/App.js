import { HashRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, HandleLogout } from "./features/components/CheckAuth";
import "./features/common/Common.module.css";
import Home from "./pages/Home";
import GeneralFeed from "./features/generalFeed/GeneralFeed";
import AnyUserFeed from "./features/anyUserFeed/AnyUserFeed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <GeneralFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <ProtectedRoute>
                <AnyUserFeed />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<HandleLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

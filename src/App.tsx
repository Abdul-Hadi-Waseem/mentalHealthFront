import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./constants/constants";
import AppLayout from "./Layout/AppLayout";
import ProtectedRoute from "../src/components/ProtectedRoute"; // Import your ProtectedRoute component

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {appRoutes.map((route) => {
            if (
              [
                7, 9, 10, 11, 14, 15, 16, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                30, 31, 32, 33, 34,
              ].includes(route.id)
            ) {
              // Check if the route is protected
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<ProtectedRoute element={route.Component} />}
                />
              );
            } else {
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={route.Component}
                />
              );
            }
          })}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;

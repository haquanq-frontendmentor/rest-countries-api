import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-950">
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
};

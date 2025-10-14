import { Outlet, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Country } from "./pages/Country";
import { CountryDetail } from "./pages/CountryDetail";

export const App = () => {
  return (
    <Routes>
      <Route
        element={
          <div className="min-h-screen bg-gray-50 dark:bg-blue-950">
            <Header title="Where in the world?" />
            <main>
              <Outlet />
            </main>
          </div>
        }
      >
        <Route index element={<Country />} />
        <Route path=":countryNameSlug" element={<CountryDetail />} />
      </Route>
    </Routes>
  );
};

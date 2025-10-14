import { Route, Routes } from "react-router";
import { Country } from "./pages/Country";
import { CountryDetail } from "./pages/CountryDetail";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-950">
      <Routes>
        <Route index element={<Country />} />
        <Route path=":countryNameSlug" element={<CountryDetail />} />
      </Routes>
    </div>
  );
};

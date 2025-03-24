import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout"; // ✅ Ensure Layout is handling Outlet properly
import Home from "./components/Home/Home.jsx"; 
import HousePrediction from "./components/HousePrediction"; // ✅ Import the new page
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="predict" element={<HousePrediction />} /> {/* ✅ Corrected Route */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

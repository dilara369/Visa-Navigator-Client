import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import AllVisas from "./../pages/AllVisas";
import AddVisa from "../pages/AddVisa";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VisaDetails from "./../pages/VisaDetails";
import MyApplications from "../pages/MyApplications";
import MyAddedVisas from "../pages/MyAddedVisas";
import PrivetRoute from "./PrivetRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />, // Error page for unmatched routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-visas",
        element: <AllVisas />,
        loader: () =>
          fetch("http://localhost:4800/all-visas"),
      },
      {
        path: "/visa-details/:id",
        element: (
          <PrivetRoute>
            <VisaDetails />
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:4800/visa-details/${params.id}`
          ),
      },
      {
        path: "/add-visa",
        element: (
          <PrivetRoute>
            <AddVisa />
          </PrivetRoute>
        ),
      },
      {
        path: "/my-added-visas",
        element: (
          <PrivetRoute>
            <MyAddedVisas />
          </PrivetRoute>
        ),
        loader: () =>
          fetch("http://localhost:4800/all-visas"),
      },
      {
        path: "/my-applications",
        element: (
          <PrivetRoute>
            <MyApplications />
          </PrivetRoute>
        ),
        loader: () =>
          fetch("http://localhost:4800/all-visas"),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;

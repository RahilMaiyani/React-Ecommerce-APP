import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
        {
            index: true,
            element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
            ),
        },
        ],
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        ),
    },
    {
        path: "/cart",
        element: (
            <ProtectedRoute>
            <Cart />
            </ProtectedRoute>
        ),
    },
    {
        path: "product/:id",
        element: (
            <ProtectedRoute>
                <ProductDetails />
            </ProtectedRoute>
        ),
    }

]);
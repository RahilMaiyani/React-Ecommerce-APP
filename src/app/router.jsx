import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import PublicRoute from "../components/PublicRoute";



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
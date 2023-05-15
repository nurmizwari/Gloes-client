import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../page/PrivateRoute";
import Home from "../page/Home";
import Login from "../page/Login";
import AddDocument from "../page/AddDocument";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/addDocument",
        element: <AddDocument />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

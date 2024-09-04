import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Layout from "./pages/Layout.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Departments from "./pages/Departments.tsx";
import Roles from "./pages/Roles.tsx";
import CreateNewDepartment from "./pages/CreateNewDepartment.tsx";
import UpdateDepartment from "./pages/UpdateDepartment.tsx";
import Employees from "./pages/Employees.tsx";
import EmployeePage from "./pages/Employee.tsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Employees />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },

      {
        path: "/employee/:id",
        element: <EmployeePage />,
      },

      {
        path: "/employee",
        element: <EmployeePage />,
      },
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/new-department",
        element: <CreateNewDepartment />,
      },
      {
        path: "/update-department",
        element: <UpdateDepartment />,
      },
      {
        path: "/roles",
        element: <Roles />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="top-left"/>
  </Provider>
);

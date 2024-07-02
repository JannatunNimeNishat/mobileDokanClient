import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "../pages/product/CreateProduct";
import ProductList from "../pages/product/ProductList";
import EditProduct from "../pages/product/EditProduct";
import CreateSale from "../pages/sale/CreateSale";
import SaleHistory from "../pages/sale/SaleHistory";
import CreateVariant from "../pages/product/CreateVariant";
import { routeGenerator } from "../utils/routeGenerators";
import { superAdminPaths } from "./superAdmin.routes";
import { branchManagerPaths } from "./branchManager.routes";
import { sellerPaths } from "./seller.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { USER_ROLE } from "../components/layout/Sidebar";

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/SUPER_ADMIN',
    element:<ProtectedRoute role={USER_ROLE.SUPER_ADMIN}>
      <App/>
    </ProtectedRoute>,
    children:routeGenerator(superAdminPaths)
  },
  {
    path:'/BRANCH_MANAGER',
    element:<ProtectedRoute role={USER_ROLE.BRANCH_MANAGER}>
      <App/>
    </ProtectedRoute>,
    children:routeGenerator(branchManagerPaths)
  },
  {
    path:'/SELLER',
    element:<ProtectedRoute role={USER_ROLE.SELLER}>
      <App/>
    </ProtectedRoute>,
    children:routeGenerator(sellerPaths)
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
/*
{
    path: "/",
    element: <App />,
    children: [
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/product-list",
        element: <ProductList />,
      },
      {
        path:'/edit-product/:id',
        element:<EditProduct/>
      },
      {
        path:'/create-sale',
        element:<CreateSale/>
      },
      {
        path:'/sale-history',
        element:<SaleHistory/>
      },
      {
        path:'/create-variant/:id',
        element:<CreateVariant/>
      }
    ],
  },
*/

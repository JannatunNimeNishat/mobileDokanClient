import ManagerDashboard from "../pages/dasbhoard/ManagerDashboard";
import SuperAdminDashboard from "../pages/dasbhoard/SuperAdminDashboard";
import CreateProduct from "../pages/product/CreateProduct";
import CreateVariant from "../pages/product/CreateVariant";
import EditProduct from "../pages/product/EditProduct";
import ProductList from "../pages/product/ProductList";
import CreateSale from "../pages/sale/CreateSale";
import SaleHistory from "../pages/sale/SaleHistory";

export const branchManagerPaths = [
    {
        name:'Dashboard',
        path:'dashboard',
        // element:<ManagerDashboard/>
        element:<SuperAdminDashboard/>
    },
    {
        name:'Product Management',
        children:[
            {
                name:'Create Product',
                path:'create-product',
                element:<CreateProduct/>
            },
            {
                name:'Product List',
                path:'product-list',
                element:<ProductList/>
            },
            {
                path:'edit-product/:id',
                element:<EditProduct/>
            }, 
            {
                path:'create-variant/:id',
                element:<CreateVariant/>
            }, 
            
        ]
    },
    
    /* {
        name:'Create Sell',
        path:'create-sell',
        element:<CreateSale/>
    },
    {
        name:'Sell History',
        path:'sell-history',
        element:<SaleHistory/>
    }, */

]
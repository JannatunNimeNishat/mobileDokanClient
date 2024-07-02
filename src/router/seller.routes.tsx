import SellerDashboard from "../pages/dasbhoard/SellerDashboard";
import CreateSale from "../pages/sale/CreateSale";
import SaleHistory from "../pages/sale/SaleHistory";

export const sellerPaths = [
    /* {
        name:'Dashboard',
        path:'dashboard',
        element:<SellerDashboard/>
    }, */
        {
            name:'Create Sell',
            path:'create-sell',
            element:<CreateSale/>
        },
        {
            name:'Sell History',
            path:'sell-history',
            element:<SaleHistory/>
        },
    
]
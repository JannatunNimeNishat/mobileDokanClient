import { Button } from "antd";
import MainSearch from "../../components/form/MainSearch";
import FilterProductModal from "../../components/modal/FilterProductModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/features/product/productApi";
import { Link, NavLink } from "react-router-dom";
import ProductTable from "../../components/ui/ProductTable";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { TUser, currentUserToken } from "../../redux/features/auth/authSlice";
import { decodeToken } from "../../utils/decodeToken";


const ProductList = () => {

  const [queryParma, setQueryParma] = useState();

  const { data: productData, isLoading: isDataLoading, isFetching:isProductListDataFetching } =
    useGetAllProductsQuery(queryParma);
  const token = useAppSelector(currentUserToken);
  let user:TUser | null = null; 
  if(token){
    user = decodeToken(token); 
  }

  const data = productData?.data;


  return (
    <div
    // style={{ height: "100vh" }}
    >
      <h1>This is product list page</h1>
      <hr style={{ margin: "10px 0" }} />
      {/* buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <FilterProductModal setQueryParma={setQueryParma} />
          <MainSearch setQueryParma={setQueryParma} name="search_product" />
        </div>
        <NavLink to={`/${user?.userRole}/create-product`}>
          <Button>Create Product</Button>
        </NavLink>
      </div>
      {/* product table */}
      <div style={{ margin: "20px 10px" }}>
        <ProductTable isProductListDataFetching={isProductListDataFetching} user={user} data={data}  />
      </div>
    </div>
  );
};

export default ProductList;

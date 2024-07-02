import { WalletOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import {
  useGetSingleDayTotalSaleQuery,
  useGetTotalSaleQuery,
} from "../../redux/features/sale/saleApi";
import PieChartTopSellingProducts from "../../components/charts/PieChartTopSellingProducts";
import BarChartDayWiseWeeklySells from "../../components/charts/BarChartDayWiseWeeklySells";
import StockAlertTable from "../../components/charts/StockAlertTable";

const SuperAdminDashboard = () => {
  const { data: totalSaleData } = useGetTotalSaleQuery(undefined);
  const { data: singleDayTotalSaleData } =
    useGetSingleDayTotalSaleQuery(undefined);
  const { data: allProductsData } = useGetAllProductsQuery(undefined);

  const totalSale = totalSaleData?.data[0]?.totalSell || 0;
  const todaysTotalSale = singleDayTotalSaleData?.data || 0;
  const allProductsCount =  allProductsData?.data?.reduce((total:any, product:any) => total + product.quantity, 0);

  return (
    <div style={{margin:'0 0'}}>
     
      <Row gutter={20}   justify={"space-between"}>
        {/* total sales */}
        <Col
          //span={7}
          xs={24}
          md={10}
          lg={7}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            backgroundColor: "white",
            height: "120px",
          }}
        >
          <WalletOutlined style={{ fontSize: "40px", color: "#07c" }} />
          <div>
            <p style={{ color: "gray" }}>TOTAL SALES</p>
            <h1>${totalSale}</h1>
          </div>
        </Col>
        {/* todays sales */}
        <Col
         // span={7}
          xs={24}
          md={10}
          lg={7}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            backgroundColor: "white",
            height: "120px",
          }}
        >
          <WalletOutlined style={{ fontSize: "40px", color: "#08c" }} />
          <div>
            <p style={{ color: "gray" }}>TODAYS SALES</p>
            <h1>${todaysTotalSale}</h1>
          </div>
        </Col>
        {/* Total products */}
        <Col
          //span={8}
          xs={24}
          md={10}
          lg={8}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            backgroundColor: "white",
            height: "120px",
          }}
        >
          <WalletOutlined style={{ fontSize: "40px", color: "#08c" }} />
          <div>
            <p style={{ color: "gray" }}>TOTAL PRODUCT</p>
            <h1>{allProductsCount}</h1>
          </div>
        </Col>
       
      </Row>
      {/* Top Selling Products and This Weeks Sales */}
      <div style={{ marginTop: "40px", paddingTop: "20px" }}>
        <Row justify={"space-between"}>
          <Col xs={24} lg={11}  style={{backgroundColor:'white',padding:'25px 25px', }}>
            <h2>Top Selling Products</h2>
            <PieChartTopSellingProducts />
            
          </Col>
          <Col xs={24} lg={11}  style={{backgroundColor:'white',padding:'25px 25px', }}>
          <h2 style={{marginBottom:'15px'}}>This Weeks Sales</h2>
            <BarChartDayWiseWeeklySells />
          </Col>
        </Row>
      </div>

        {/* stock alert */}
        <div style={{ marginTop: "40px", paddingTop: "20px",backgroundColor:'white',padding:'25px 25px', }}>
            <h2 style={{ marginBottom: "20px"}}>Stock Alert</h2>
        <StockAlertTable/>
        </div>

    </div>
  );
};

export default SuperAdminDashboard;

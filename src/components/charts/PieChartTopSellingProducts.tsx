import { Pie } from "@ant-design/charts";
import { useGetTopSellingProductsQuery } from "../../redux/features/sale/saleApi";

const PieChartTopSellingProducts = () => {
  const { data: topSellingProductsData } =
    useGetTopSellingProductsQuery(undefined);

  const topSellingProducts = topSellingProductsData?.data?.map((item:any) => ({
    type: item?.productName,
    value: Number(item?.percentage),
  }));

  const config = {
    appendPadding: 10,
    data: topSellingProducts,
    angleField: "value",
    colorField: "type",
    radius: .9,

    /* label: {
      type: "spider",
      labelHeight: 10,
      content:({type,value}:any)=>`${type}\n${value}%`,
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ], */
  };
  return <Pie   height={400}
  
  {...config} />;
};

export default PieChartTopSellingProducts;

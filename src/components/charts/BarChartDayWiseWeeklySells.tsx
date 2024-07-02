import { Column } from "@ant-design/charts";
import { useGetDayWiseWeeklySellsQuery } from "../../redux/features/sale/saleApi";

const BarChartDayWiseWeeklySells = () => {
  const { data: dayWiseWeeklySellData } =
    useGetDayWiseWeeklySellsQuery(undefined);
  const dayWiseWeeklySell = dayWiseWeeklySellData?.data?.map((item: any) => ({
    type: item?.dayOfWeek,
    sales: item?.totalSales,
  }));


  const config = {
    data: dayWiseWeeklySell,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
    minColumnWidth: 10,
    maxColumnWidth: 10,
  };
  return <Column height={400} {...config} />;
};

export default BarChartDayWiseWeeklySells;

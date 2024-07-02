import { Table } from "antd";
import { useGetSaleAlertQuery } from "../../redux/features/product/productApi";


const StockAlertTable = () => {
  
    const {data:saleAlert} = useGetSaleAlertQuery(undefined);

    const tableData = saleAlert?.data?.map((item:any)=>({
        key:item?._id,
        name:item?.name,
        imageURL:item?.imageURL,
        quantity:item?.quantity,
        brand:item?.brand
    }))

      const columns = [
        
        {
          title: 'Image',
          key: 'imageURL',
          render:({imageURL}:any)=> (
            <img style={{height:'40px',width:'40px'}} src={imageURL}/>
          )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
        {
          title: 'Brand',
          dataIndex: 'brand',
          key: 'brand',
        },
        {
          title: 'Quantity',
          key: 'quantity',
          render:({quantity}:any)=> (<p style={{color:'red', fontWeight:'bold'}}>{quantity}</p>)
        },
      ];
      
    return  <Table size="small"  dataSource={tableData} columns={columns} />;
};

export default StockAlertTable;
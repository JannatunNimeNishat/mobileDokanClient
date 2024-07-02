import Search from "antd/es/input/Search";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { Button, Table } from "antd";

import SaleModal from "./SaleModal";
import InvoiceModalComponent from "../../components/modal/InvoiceModalComponent";

const CreateSale = () => {
  const [searchTerm, setSearchTerm] = useState({});
  const {
    data,
    isLoading: isSearchLoading,
    isFetching,
  } = useGetAllProductsQuery(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setInvoiceIsModalOpen] = useState(false);
  const [sellData,setSellData] = useState({});
  const [selectSaleItem, setSelectSaleItem] = useState({});

  const showModal = (product: any) => {
    setSelectSaleItem(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInvoiceModalCancel = () => {
    setInvoiceIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "brand",
      dataIndex: "brand",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
          
            showModal(record);
          }}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Sell
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Sell page:</h1>
      <Search
        allowClear
        style={{ marginTop: "15px" }}
        placeholder="Search a product"
        onChange={(e) => setSearchTerm({ searchTerm: e.target.value })}
        enterButton
      />

      {/* table */}
      <div style={{ marginTop: "15px" }}>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={data?.data}
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* sale modal and form */}
      {isModalOpen && (
        <SaleModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCancel={handleCancel}
          selectSaleItem={selectSaleItem}
          setInvoiceIsModalOpen={setInvoiceIsModalOpen} 
          setSellData={setSellData}
        />
      )}

      {
        isInvoiceModalOpen && (
          <InvoiceModalComponent isInvoiceModalOpen={isInvoiceModalOpen} handleInvoiceModalCancel={handleInvoiceModalCancel} sellData={sellData}/>
        )
      }


    </div>
  );
};

export default CreateSale;

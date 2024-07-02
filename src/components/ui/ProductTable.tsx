import { Button, Checkbox, Popconfirm, Space, Table, message } from "antd";
import React, { useState } from "react";

import { DeleteFilled, DeleteOutlined, EditFilled } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteMultipleProductsMutation,
  useDeleteProductMutation,
} from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { USER_ROLE } from "../layout/Sidebar";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  imageURL: string;
}

const ProductTable = ({ data,  user,isProductListDataFetching }: any) => {
  
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const [deleteMultipleProducts] = useDeleteMultipleProductsMutation();

  const onSelectChange = (key: string) => {
    const updateSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((item) => item !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(updateSelectedRowKeys);
  };

  const handleDelete = async (product: any) => {
    const toastId = toast.loading("Product is deleting please wait...");
    try {
      const res = await deleteProduct(product._id).unwrap();
      toast.success("Product is successfully deleted", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const handleEdit = async (product: any) => {
    navigate(`/${user?.userRole}/edit-product/${product?._id}`);
  };
  const handleVariant = async (product: any) => {
    navigate(`/${user?.userRole}/create-variant/${product?._id}`);
  };

  const multipleDeleteHandle = async () => {
    try {
      await deleteMultipleProducts(selectedRowKeys);
      message.success(`Successfully deleted ${selectedRowKeys?.length}`);
      setSelectedRowKeys([]);
    } catch (error) {
    
      message.error("Something went wrong while deleting multiple products");
    }
  };

  const columns: any = [
    {
      title: (
        <>
          {user?.userRole === USER_ROLE.SUPER_ADMIN && (
            <Button
              onClick={multipleDeleteHandle}
              disabled={selectedRowKeys?.length === 0}
            >
              <DeleteOutlined />
            </Button>
          )}
        </>
      ),
      // dataIndex: "checkbox",
      dataIndex: "select",
      key: "select",
      width: "5%",
      render: (_text: any, record: any) => (
        <>
          {user?.userRole === USER_ROLE.SUPER_ADMIN && (
            <Checkbox
              checked={selectedRowKeys?.includes(record._id)}
              onChange={() => onSelectChange(record._id)}
            />
          )}
        </>
      ),
    },

    {
      title: "Image",
      dataIndex: "imageURL",
      render: (imageURL: string) => (
        <img src={imageURL} style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      // sorter: (a, b) => a?.price - b?.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditFilled
            style={{ color: "blue" }}
            onClick={() => handleEdit(record)}
          />
          <Button size="small" onClick={() => handleVariant(record)}>
            variant
          </Button>

          {
            user?.userRole === USER_ROLE.SUPER_ADMIN && <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <p style={{ color: "red", cursor: "pointer" }}>
              <DeleteFilled />
            </p>
          </Popconfirm>
          }

          
        </Space>
      ),
    },
  ];

 

  return (
    <div>
      <Table
      loading={isProductListDataFetching}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        /* rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          checkStrictly: true,
        }} */
      />
    </div>
  );
};

export default ProductTable;

import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { useCreateSaleMutation } from "../../redux/features/sale/saleApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TUser, currentUserToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { decodeToken } from "../../utils/decodeToken";

const SaleModal = ({
  isModalOpen,
  setIsModalOpen,
  handleCancel,
  selectSaleItem,
  setInvoiceIsModalOpen,
  setSellData
}: any) => {
  const today = new Date();
  const [createSale] = useCreateSaleMutation();
  const [quantity, setQuantity] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const navigate = useNavigate();
  const token = useAppSelector(currentUserToken);
  let user:TUser | null = null;
  if(token){
    user = decodeToken(token);
  }


  const onQuantityChange = (value: any) => {
  
    if(value > selectSaleItem?.quantity || value <=0){
      return 0;
    }
    const price = Number((value * (selectSaleItem?.price || 0)).toFixed(2));
    setQuantity(value);
    setCalculatedPrice(price);
  };

  const onFinish = async (values: any) => {
    const toastId = toast.loading("Sales is processing please wait...");
   
    const formattedToday = moment(today).toISOString();
    const salesData = {
      product_id: selectSaleItem?._id,
      quantity: values?.quantity,
      buyer_name: values?.buyerName,
      sale_date: formattedToday,
      price: calculatedPrice,
      productName:selectSaleItem?.name,
      imageURL:selectSaleItem?.imageURL
    };

    try {
      const res = await createSale(salesData).unwrap();
    
      if(res?.success){
        setIsModalOpen(false);
        setSellData(res?.data?.newSale);
        setInvoiceIsModalOpen(true)
        toast.success("Sales is successfully created", {
          id: toastId,
          duration: 2000,
        });
      }
    //  navigate(`/${user?.userRole}/sell-history`);
    } catch (error) {
      
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }

   
  };

  const onFinishFailed = (errorInfo: any) => {
  
    toast.error("Something went wrong",errorInfo);
  };

  return (
    <>
      <Modal
        title="Sales:"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          variant="filled"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            productName: selectSaleItem?.name,
            quantity: undefined,
            buyerName: undefined,
            DatePicker: moment(today),
          }}
        >
          <Form.Item label="Product Name" name="productName">
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please enter quantity!" },
              ({ getFieldValue }) => ({
                validator(_, value) {

                  if (!value) {
                    return Promise.resolve();
                  }
                  if (value <= 0) {
                    return Promise.reject(new Error("Please enter a positive number!"));
                  }
                  if (value > selectSaleItem?.quantity) {;
                    return Promise.reject(new Error(`${selectSaleItem?.quantity} product available`));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              onChange={onQuantityChange}
            />
          </Form.Item>
          <p
            style={{
              marginLeft: "10px",
              marginTop: "-10px",
              marginBottom: "10px",
            }}
          >
            Price:
            <span style={{ marginLeft: "10px", border: "" }}>
              {calculatedPrice} $
            </span>
          </p>

          <Form.Item
            label="Buyer"
            name="buyerName"
            rules={[{ required: true, message: "Please enter buyers name!" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="DatePicker" name="DatePicker">
            <DatePicker showToday showNow disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SaleModal;

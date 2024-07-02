import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { imageUploader } from "../../utils/imageUploader";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
 
} from "antd";

import { useGetSingleProductQuery, useUpdateProductMutation } from "../../redux/features/product/productApi";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";
import { currentUserToken } from "../../redux/features/auth/authSlice";
import { decodeToken } from "../../utils/decodeToken";



const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: singleProduct, isLoading: isSingleProductLoading } =
    useGetSingleProductQuery(id);

 const [updateProduct] = useUpdateProductMutation()

  if (isSingleProductLoading) {
    return <p>Loading...</p>;
  }

  

  const onFinish = async(data:any) => {
    const toastId = toast.loading("Uploading please wait...");
    try {
      let uploadedImage;
      if (data?.photo) {
        uploadedImage = await imageUploader(
          data?.photo?.fileList[0].originFileObj
        );
      }
      

      const updatedData = {
        price: data?.productPrice || singleProduct?.data?.price,
        quantity: data?.quantity || singleProduct?.data?.quantity,
        brand: data?.brand || singleProduct?.data?.brand,
        model: data?.model || singleProduct?.data?.model,
        os:  data?.os || singleProduct?.data?.os,
        storage_capacity: data?.StorageCapacity || singleProduct?.data?.storage_capacity,
        screen_size:data.screenSize || singleProduct?.data?.screen_size,
        camera:data.camera || singleProduct?.data?.camera,
        name: data.productName  ||singleProduct?.data?.name,
        release_date: moment(data?.DatePicker || singleProduct?.data?.release_date).format('YYYY-MM-DD'),
        imageURL: uploadedImage?.url || singleProduct?.data?.imageURL
      }

const res = await updateProduct({id:singleProduct?.data?._id,updatedData:updatedData}).unwrap();
    
      toast.success("Product Uploaded successfully", {
        id: toastId,
        duration: 2000,
      });
      // navigate(`/${user?.userRole}/product-list`);
   

    } catch (error:any) {
    
      toast.success(error?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }

  };

  const onFinishFailed = (errorInfo: any) => {
   
  };

 
  const beforeUpload = (file:any) => {
  
  };

  
  const onChange = (info:any) => {
   
  };

  return (
    <div
      style={{
        margin: "0 20px",
        padding: "25px 20px",
        border: "1px solid gray",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Edit Product</h2>
      <hr />
      <div style={{ margin: "20px 20px" }}>
        <Form
          variant="filled"
         // style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={
            {
             
            productPrice:singleProduct?.data?.price,
            quantity:singleProduct?.data?.quantity,
           // DatePicker:singleProduct?.data?.release_date,
           brand:singleProduct?.data?.brand,
            model: singleProduct?.data?.model,
            os: singleProduct?.data?.model,
            StorageCapacity: singleProduct?.data?.storageCapacity,
            screenSize:singleProduct?.data?.screen_size,
            camera: singleProduct?.data?.camera,
            productName:singleProduct?.data?.name
         

            }
          }
        >
          <Row
            style={{
              display: "flex",
             // width: "900px",
             maxWidth:'100%',
              padding: "15px",
              gap: "15px",
            }}
          >
            <Col lg={10} style={{ marginRight: "0px" }}>
              <Form.Item label="Product Name" name="productName">
                <Input />
              </Form.Item>

              <Form.Item label="Product Price" name="productPrice">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Brand" name="brand">
                <Input />
              </Form.Item>

              <Form.Item label="Quantity" name="quantity">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Release data" name="DatePicker">
                <DatePicker 
                // defaultValue={moment(singleProduct?.data?.release_date,'YYY-MM-DD')}
                defaultValue={moment(singleProduct?.data?.release_date, 'YYYY-MM-DD') as any} 
                />
              </Form.Item>
            </Col>
            <Col lg={10}>
              {/* Storage Capacity: */}
              <Form.Item label="Storage Capacity:" name="StorageCapacity">
                <Select
                defaultValue={singleProduct?.data?.storage_capacity}
                >
                  <Select.Option value="16GB">16GB</Select.Option>
                  <Select.Option value="32GB">32GB</Select.Option>
                  <Select.Option value="64GB">64GB</Select.Option>
                  <Select.Option value="128GB">128GB</Select.Option>
                </Select>
              </Form.Item>
              {/* os */}
              <Form.Item label="OS:" name="os">
                <Select
                defaultValue={singleProduct?.data?.os}
                >
                  <Select.Option value="iOS">iOS</Select.Option>
                  <Select.Option value="Android">Android</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Screen Size" name="screenSize">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Camera: " name="camera">
                <InputNumber />
              </Form.Item>
              <div style={{marginLeft:'15px'}}>
                <p>Previous image:</p>
                  <img src={singleProduct?.data?.imageURL } id="previous_img" alt="" style={{height:'50px',width:'50px'}}/>
                </div>
             
              <Form.Item
                label="Photo"
                name="photo"
              >
                <Upload
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  maxCount={1} 
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;

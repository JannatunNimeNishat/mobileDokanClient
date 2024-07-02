import { Button, Col, Image, Row } from "antd";
import MainForm from "../../components/form/MainForm";
import MainInput from "../../components/form/MainInput";
import MainSelect from "../../components/form/MainSelect";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import MainFileInput from "../../components/form/MainFileInput";
import { imageUploader } from "../../utils/imageUploader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { TUser, currentUserToken } from "../../redux/features/auth/authSlice";
import { decodeToken } from "../../utils/decodeToken";

type TCreateProduct = {
  imageURL: string;
  productBrand: string;
  productCamera: number;
  productModel: string;
  productName: string;
  productOS: string;
  productPrice: number;
  productQuantity: number;
  productScreenSize: number;
  release_date: string;
  storageCapacity: number;
  image: any;
};

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const token = useAppSelector(currentUserToken);
  let user:TUser;
  if(token){
    user = decodeToken(token);
  }
  const navigate = useNavigate();
  const methods = useForm(); 
  const onSubmit = async (data: TCreateProduct) => {
    const toastId = toast.loading("Uploading please wait...");
    try {
      const uploadedImage = await imageUploader(
        data?.image?.fileList[0].originFileObj
      );
      if (
        Number(data?.productPrice) <= 0 ||
        Number(data?.productQuantity) <= 0 ||
        Number(data?.productScreenSize) <= 0 ||
        Number(data?.productCamera) <= 0
      ) {
        return toast(
          "productPrice,productQuantity, productScreenSize, productCamera can not be 0 or less then 0 ",
          { id: toastId, duration: 2000 }
        );
      }
      const productData = {
        name: data?.productName,
        //name: 1,
        price: Number(data?.productPrice),
        quantity: Number(data?.productQuantity),
        release_date: data?.release_date,
        brand: data?.productBrand,
        model: data?.productModel,
        os: data?.productOS,
        storage_capacity: data?.storageCapacity,
        screen_size: Number(data?.productScreenSize),
        camera: Number(data?.productCamera),
        imageURL: uploadedImage.url,
      };

      const res = await createProduct(productData).unwrap();

      toast.success("Product Uploaded successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user?.userRole}/product-list`)
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div style={{margin:'0 20px',padding:'25px 20px' , border:'1px solid gray', borderRadius:'10px'}}>
      <h2 style={{ marginBottom: "10px" }}>Create Product</h2>
      <hr />
      <div style={{ margin: "0 20px" }}>
        <MainForm onSubmit={onSubmit} methods={methods}>
          <Row>
            <Col lg={12}>
              <MainInput
                name="productName"
                type="text"
                label="Product Name: "
                placeholder="Enter product name"
              />
              <MainInput
                name="productPrice"
                type="number"
                label="Product price: "
                placeholder="Enter product price"
              />
              <MainInput
                name="productQuantity"
                type="number"
                label="Product Quantity: "
                placeholder="Enter product quantity"
              />
              <MainSelect
                name="storageCapacity"
                label="Storage Capacity: "
                defaultValue="Select One"
                options={[
                  { id: 1, value: "16GB" },
                  { id: 1, value: "32GB" },
                  { id: 1, value: "64GB" },
                  { id: 1, value: "128GB" },
                ]}
              />

              <MainInput
                name="productScreenSize"
                type="number"
                label="Screen Size: "
                placeholder="Enter product ScreenSize"
              />
              <MainFileInput name="image" label="Product Image: " />
            </Col>
            <Col lg={12}>
              <MainInput
                name="release_date"
                type="date"
                label="Release date: "
              />
              <MainInput name="productBrand" type="text" label="Brand: "  placeholder="Enter product brand name"/>
              <MainInput name="productModel" type="text" label="Model: "  placeholder="Enter product model"/>
              <MainSelect
                name="productOS"
                label="OS: "
                defaultValue="Select a OS"
                options={[
                  { id: 1, value: "iOS" },
                  { id: 1, value: "Android" },
                ]}
              />
              <MainInput name="productCamera" type="number" label="Camera: "  placeholder="Enter product camera size"/>
            </Col>
          </Row>
          <div style={{ width: "200px", margin: "0 auto" }}>
            <Button htmlType="submit">Submit</Button>
          </div>
        </MainForm>
      </div>
    </div>
  );
};

export default CreateProduct;

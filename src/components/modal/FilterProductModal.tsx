import { FilterOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import MainForm from "../form/MainForm";
import MainInput from "../form/MainInput";
import MainSelect from "../form/MainSelect";
import { useForm } from "react-hook-form";

type TModalInput = {
  screenSize?:string;
  brand?:string;
  camera?:string;
  maxPrice?:number;
  minPrice?:number;
  productOS?:string;
  releaseDate?:string;
  storageCapacity?:string;
};
const FilterProductModal = ({setQueryParma}:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm(); 
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (value:TModalInput) => {

    const modalInput:any = {};
    modalInput.brand = value?.brand || null;
    modalInput.release_date = value?.releaseDate || null;
    modalInput.minPrice = Number(value?.minPrice) || null;
    modalInput.maxPrice = Number(value?.maxPrice) || null;
    modalInput.os = value?.productOS || null;
    modalInput.storage_capacity = value?.storageCapacity || null;
    switch (value?.screenSize) {
        case '6 Inch and Above':
            modalInput.min_screen_size = 6;
            modalInput.max_screen_size = 8;
            break;
        case '5.6 - 6 Inch':
            modalInput.min_screen_size = 5.6;
            modalInput.max_screen_size = 6;
            break;
        case '5.1 - 5.5 Inch':
            modalInput.min_screen_size = 5.1;
            modalInput.max_screen_size = 5.5;
            break;
    
        default:
          modalInput.min_screen_size =null;
            modalInput.max_screen_size = null;
            break;
    }
    switch (value?.camera) {
        case '10-15MP':
            modalInput.min_camera = 10;
            modalInput.max_camera = 15;
            break;
        case '16-20MP':
            modalInput.min_camera = 16;
            modalInput.max_camera = 20;
            break;
        case '21MP and Above':
            modalInput.min_camera = 21;
            modalInput.max_camera = 100;
            break;
    
        default:
          modalInput.min_camera = null;
          modalInput.max_camera = null;
            break;
    }
    setQueryParma(modalInput)
    methods.reset();
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          /* border: "1px solid lightBlue",
          color: "lightBlue",
          height: "35px",
          fontSize: "16px", */
        }}
      >
        Filter <FilterOutlined />
      </Button>
      <Modal
        title="Filter"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        // footer={[<Button key="submit"></Button>]}
        footer
      >
        <MainForm onSubmit={onSubmit} methods={methods} >
          <Row>
            <Col lg={8}>
              <div style={{ display: "flex", marginBottom: "-15px" }}>
                <MainInput name="minPrice" type="number" label="MinPrice: " required={false}/>
                <MainInput name="maxPrice" type="number" label="MaxPrice: " required={false}/>
              </div>
              <MainSelect
                name="storageCapacity"
                label="Storage Capacity: "
                 //defaultValue="Select One"
                required={false}
                options={[
                  { id: 1, value: "16GB" },
                  { id: 2, value: "32GB" },
                  { id: 3, value: "64GB" },
                  { id: 4, value: "128GB" },
                ]}
              />
              <MainSelect
                name="screenSize"
                label="Screen Size: "
                 //defaultValue="Select one"
                required={false}
                options={[
                  { id: 1, value: "6 Inch and Above" },
                  { id: 2, value: "5.6 - 6 Inch" },
                  { id: 3, value: "5.1 - 5.5 Inch" },
                ]}
              />
              <MainInput
                name="releaseDate"
                type="date"
                label="Release Date: "
                required={false}
              />
            </Col>
            <Col sm={8} lg={8} 
            style={{ marginLeft: "15px",  width:'600px' }}
            >
              <MainSelect
                name="brand"
                label="Brand: "
                 //defaultValue="Select one"
                required={false}
                options={[
                  { id: 1, value: "iPhone" },
                  { id: 2, value: "Samsung" },
                  { id: 3, value: "Google" },
                ]}
              />

              <MainSelect
                name="productOS"
                label="OS: "
                 //defaultValue="Select one"
                required={false}
                options={[
                  { id: 1, value: "iOS" },
                  { id: 2, value: "Android" },
                ]}
              />
              <MainSelect
                name="camera"
                label="Camera: "
                 //defaultValue="Select one"
                required={false}
                options={[
                  { id: 1, value: "10-15MP" },
                  { id: 2, value: "16-20MP" },
                  { id: 4, value: "21MP and Above" },
                ]}
              />
            </Col>
          </Row>
          <Button
            htmlType="submit"
            onClick={handleOk}
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              width: "250px",
              border: "1px solid purple",
              color: "purple",
            }}
          >
            Submit
          </Button>
        </MainForm>
      </Modal>
    </>
  );
};

export default FilterProductModal;

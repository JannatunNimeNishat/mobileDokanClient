import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { Controller } from "react-hook-form";

type TMainFileInputProps = {
    name:string;
    label?:string;
    required?:boolean
}


const MainFileInput = ({label,name,required=true}:TMainFileInputProps) => {
  return (
    <div style={{ margin: "20px" }}>
      {label ? (
        <label style={{ fontWeight: "500" }} htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        rules={{
          required: required,
        }}
        render={({ field }) => (
          <>
            <Upload {...field}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </>
        )}
      />
      {/* {errors.name && <small>'This is required.'</small>} */}
    </div>
  );
};

export default MainFileInput;

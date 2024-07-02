import { Select } from "antd";
import { Controller } from "react-hook-form";

type TOptions = {
    id:number;
    value:string;
}

type TInputProps = {
    name:string;
    label?:string;
    required?:boolean;
    defaultValue?:string;
   options?:TOptions[]
}


const MainSelect = ({name,label,required=true,options,defaultValue=''}:TInputProps) => {
    return (
        <div style={{margin:'20px'}}> 
        {label ? <label style={{fontWeight:'500'}}  htmlFor={name}>{label}</label>:null}
        <Controller
        name={name}
        rules={{
         //  required: true,
          required: required,
          }}
        render={({field})=> <>
       <Select 
       {...field}
       style={{marginTop:'5px', display:'block'}}
       defaultValue={defaultValue}
    
    //    defaultValue={defaultValue ? [defaultValue] : []}
    // defaultValue={defaultValue ? [defaultValue] : []}
    // defaultValue={defaultValue || undefined}
    // defaultValue={defaultValue ? [defaultValue] : undefined}
       >
        {
            options?.map((option,index) =><Select.Option key={index} value={option.value}>{option.value}</Select.Option> )
        }
        
       </Select>
        </>}
        />
        {/* {errors.name && <small>'This is required.'</small>} */}
        
    </div>
    );
};

export default MainSelect;
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
    //   onSubmit: SubmitHandler<FieldValues>;
      onSubmit: SubmitHandler<any>;
      children: ReactNode;
      methods:any
    }

// const MainForm = ({onSubmit,children,form}:TFormProps) => {
const MainForm = ({onSubmit,children,methods}:TFormProps) => {
    // const methods = useForm();
    return (
        <FormProvider {...methods}>
         {/* <FormProvider {...form}> */}
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default MainForm;
import { Button, Col, Row } from "antd";
import Lottie from "lottie-react";
import MainForm from "../components/form/MainForm";
import MainInput from "../components/form/MainInput";
import login_register_animation from "../assets/login_register_animation.json";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { decodeToken } from "../utils/decodeToken";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { USER_ROLE } from "../components/layout/Sidebar";

type TLoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm(); 
  const onSubmit = async (data: TLoginData) => {
    const toastId = toast.loading("Logging, please wait...");
    try {
      const userLoginData = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userLoginData).unwrap();
      const decodedUserData:TUser = decodeToken(res?.data?.token);
      dispatch(setUser({user:decodedUserData,token:res?.data?.token}));
      toast.success("Successfully LoggedIn", { id: toastId, duration: 2000 });
      //  navigate('/');
      if(decodedUserData?.userRole === USER_ROLE.SUPER_ADMIN || decodedUserData?.userRole === USER_ROLE.BRANCH_MANAGER){
        navigate(`/${decodedUserData?.userRole}/product-list`);
      }else{
        navigate(`/${decodedUserData?.userRole}/create-sell`);
      }
    } catch (error: any) {
      toast.error(`${error?.data?.message}`, { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row
      justify="center"
      align={"middle"}
       style={{ margin: "20px 20px",  }}
    >
      <Col xl={12}>
        <Lottie style={{ margin: "20px"}} animationData={login_register_animation} loop={true} />
      </Col>
      <Col xl={12}>
        <div
          style={{
            border: "1px solid lightblue",
            width: "350px",
            margin: "0 auto",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "10px 10px 30px lightblue",
          }}
        >
          <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>signIn:</h2>
          <MainForm onSubmit={onSubmit} methods={methods}>
            <MainInput name="email" type="email" label="email: " />
            <MainInput name="password" type="password" label="password: " />
            <div style={{ margin: "0 auto", width: "150px" }}>
              <Button
                style={{
                  width: "150px",
                  backgroundColor: "lightblue",
                  fontWeight: "600",
                  color: "black",
                }}
                htmlType="submit"
              >
                Login
              </Button>
            </div>
            <p
              style={{ textAlign: "center", width: "full", marginTop: "10px" }}
            >
              Do not have an account ?{" "}
              <Link
                to={"/register"}
                style={{ color: "blue", fontWeight: "500" }}
              >
                Register
              </Link>
            </p>
          </MainForm>
        </div>
      </Col>
    </Row>
  );
};

export default Login;

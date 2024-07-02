
import Lottie from 'lottie-react';
import login_register_animation from '../assets/login_register_animation.json';
import { Button, Col, Row } from 'antd';
import MainForm from '../components/form/MainForm';
import MainInput from '../components/form/MainInput';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../redux/features/auth/authApi';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import MainFileInput from '../components/form/MainFileInput';
import { imageUploader } from '../utils/imageUploader';

type TRegisterData = {
    userName:string;
    email:string;
    password:string;
    imageURL?:any;

}
 type TUserData = {
    name:string,
    email:string,
    password:string,
    imageURL?:string,
 }
const Register = () => {

    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const methods = useForm(); 
    const onSubmit = async(data:TRegisterData) =>{
       const toastId = toast.loading('Registering, please wait...');
        try {
            const userData:TUserData = {
                name:data?.userName,
                email:data?.email,
                password:data?.password,
            }
            
            let uploadedImage;
            if(data?.imageURL !== undefined){
                uploadedImage = await imageUploader(
                    data?.imageURL?.fileList[0].originFileObj
                    );

                    userData.imageURL = uploadedImage.url;
                }

            const res = await register(userData).unwrap();
            toast.success('Successfully Registered',{id:toastId, duration:2000});
            if(res.success === true){
                navigate('/login');
            }
            if(res.success === false){
                toast.error(res.message,{id:toastId, duration:2000});
            }
        } catch (error:any) {
          
            toast.error(`${error?.data?.message}`,{id:toastId,duration:2000})
        }
    }


    return (
        <Row justify="center" align={"middle"} style={{margin:'20px 20px'}}>
            <Col xl={12}>
            <Lottie style={{ margin: "20px"}}  animationData={login_register_animation} loop={true} 
            />
            </Col>
            <Col xl={12}>
            <div style={{border:'1px solid lightblue',width:'350px', margin:'0 auto', padding:'20px 30px', borderRadius:'15px', boxShadow:'10px 10px 30px lightblue'}}>
                <h2 style={{marginTop:'10px',marginBottom:'10px'}}>SignUp:</h2>
                <MainForm onSubmit={onSubmit} methods={methods}>
                    <MainInput name='userName' type='text' label='userName: '/>
                    <MainInput name='email' type='email' label='email: '/>
                    <MainInput name='password' type='password' label='password: '/>
                    {/* <MainInput name='imageURL' type='text' label='imageURL: ' required={false}/> */}
                    <MainFileInput name="imageURL" label="image: " />
                    <div style={{margin:'0 auto', width:'150px'}}>
                    <Button style={{width:'150px',backgroundColor:'lightblue',fontWeight:'600', color:'black'}} htmlType='submit'>Submit</Button>
                    </div>
                    <p style={{textAlign:'center',width:'full', marginTop:'10px'}}>Already have an account ?  <Link to={'/login'} style={{color:'blue',fontWeight:'500'}}>Login</Link></p>
                </MainForm>
            </div>
            </Col>
        </Row>
    );
};

export default Register;
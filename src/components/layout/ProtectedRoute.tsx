import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ReactNode } from "react";
import { TUser, logout } from "../../redux/features/auth/authSlice";
import { decodeToken } from "../../utils/decodeToken";

type TProtectedRoute = { children: ReactNode; role: string | undefined };

const ProtectedRoute = ({ children,role }: TProtectedRoute) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  let user: TUser | null = null;
  if (token) {
    user = decodeToken(token);
  }

  if(role !== undefined && role !==(user?.userRole)){
    dispatch(logout());
    return <Navigate to={'/login'} replace={true}/>
  }


  if (token) {
    return <>{children}</>;
  }
  return <Navigate to={"/login"} replace={true}></Navigate>;
};

export default ProtectedRoute;

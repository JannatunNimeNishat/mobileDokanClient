import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Layout 
   style={{ height: "100%" }}
    >
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
            color: "black",
            height: "70px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              padding: 0,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                width: "300px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  
                }}
              >
                <img
                  style={{
                    height: "35px",
                    width: "35px",
                  }}
                  src={user?.imageURL || ''}
                  alt=""
                />
                <h4>{user?.userName?.substring(0, 10)}</h4>
              </div>
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

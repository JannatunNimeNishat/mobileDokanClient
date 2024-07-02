import {  Layout, Menu } from 'antd';
import { useAppSelector } from '../../redux/hooks';
import { TUser, currentUserToken } from '../../redux/features/auth/authSlice';
import { decodeToken } from '../../utils/decodeToken';
import { sidebarItemsGenerators } from '../../utils/sidebarItemsGenerators';
import { superAdminPaths } from '../../router/superAdmin.routes';
import { branchManagerPaths } from '../../router/branchManager.routes';
import { sellerPaths } from '../../router/seller.routes';

const { Sider } = Layout;

  export const USER_ROLE = {
    SUPER_ADMIN:'SUPER_ADMIN',
    BRANCH_MANAGER:'BRANCH_MANAGER',
    SELLER:'SELLER'
} as const;


const Sidebar = () => {
  const token = useAppSelector(currentUserToken)
  let user;
  if(token){
    user = decodeToken(token);
  }
  let sidebarItems:any;
  switch((user as TUser).userRole){
    case USER_ROLE.SUPER_ADMIN:
      sidebarItems = sidebarItemsGenerators(superAdminPaths,USER_ROLE.SUPER_ADMIN)
      break
    case USER_ROLE.BRANCH_MANAGER:
      sidebarItems = sidebarItemsGenerators(branchManagerPaths,USER_ROLE.BRANCH_MANAGER)
      break
    case USER_ROLE.SELLER:
      sidebarItems = sidebarItemsGenerators(sellerPaths,USER_ROLE.SELLER)
      break
      
      default:
        break;
      }
    return (
        <Sider
        style={{height:"100vh", position:'sticky', top:'0', left:'0'}}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
        }}
        onCollapse={(collapsed, type) => {
        }}
      >
        <div className="" 
        style={{color:'white', height:'4rem', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
            <h1>Mobile Dokan</h1>
        </div>
        
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItems} />
      </Sider>
    );
};

export default Sidebar;
import { useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Grid, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";
import logo from "../assets/logo.jpg";
import { Header } from "antd/es/layout/layout";
type MenuItem = Required<MenuProps>["items"][number];
console.log(isAdminAuthenticated());
const items: MenuItem[] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    key: "wishlist",
    label: <Link to="/wishlist">Wishlist</Link>,
  },
  {
    label: <Link to="/cartList" />,
    key: "cart",
    icon: <ShoppingCartOutlined />,
  },
  


  ...(isAdminAuthenticated()
    ? [
        {
          label: <Link to="/admin">Admin</Link>,
          key: "admin",
          icon: <UserOutlined />,
        },
      ]
    : []),
  {
    label: "Logout",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();
  const handleNavItemClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    if (e.key === "cart") {
      // Show Cart Componenet
    }
    if (e.key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
      // Logout user
    }
  };

  return (
   
    
      <>
     <Flex style={{ display: 'flex', alignItems: 'center',  }}>
     <Link to="/">
        <img src={logo} alt="Logo" style={{ width: "90px", marginRight: "16px" }} />
      </Link>
      
    <Menu
      onClick={handleNavItemClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
        
    />
    </Flex>
    
      
     </>
   
  );
};

export default NavBar;

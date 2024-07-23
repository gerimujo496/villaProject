import { useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

type MenuItem = Required<MenuProps>["items"][number];

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
    label: "Cart",
    key: "cart",
    icon: <ShoppingCartOutlined />,
  },
  ...(!isAdminAuthenticated()
    ? [
        {
          // remove ! later
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

  const handleNavItemClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    if (e.key === "cart") {
      // Show Cart Componenet
      console.log("Showing Cart Modal");
    }
    if (e.key === "logout") {
      // Logout user
      console.log("Logging out");
    }
  };

  return (
    <Menu
      onClick={handleNavItemClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default NavBar;

import { useEffect, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";
import { BuyListElement } from "./BuyListElement/BuyListElement";
import { ModalCart } from "./ModalCart/ModalCart";

type MenuItem = Required<MenuProps>["items"][number];


const NavBar = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items: MenuItem[] = [
    {
      label: <Link to="/">Home</Link>,
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      key: "/wishlist",
      label: <Link to="/wishlist">Wishlist</Link>,
    },
    {
      label: <span onClick={showModal}>Cart List</span>,
      key: "/cartList",
      icon: <ShoppingCartOutlined onClick={showModal} />,
    },
    ...(isAdminAuthenticated()
      ? [
          {
            label: <Link to="/admin">Admin</Link>,
            key: "/admin",
            icon: <UserOutlined />,
          },
        ]
      : []),
    {
      label: "Logout",
      key: "logout",
      icon: (
        <LogoutOutlined
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      ),
    },
  ];
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <div>
     <ModalCart  isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk}  />
      <Menu selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  );
};

export default NavBar;

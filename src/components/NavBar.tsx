import { useEffect, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Button, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";
import { BuyListElement } from "./BuyListElement/BuyListElement";
import { ModalCart } from "./ModalCart/ModalCart";
import { useStore } from "../store/store";

type MenuItem = Required<MenuProps>["items"][number];

const NavBar = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { villaWishList, villaBuyList } = useStore();
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
      icon:<Badge  count={villaWishList.length} ><HeartOutlined /></Badge>
    },
    {
      label: <Badge style={{width:10}} count={villaBuyList.length} ><span onClick={showModal}>Cart List</span></Badge>,
      key: "/cartList",
      icon: <ShoppingCartOutlined size={30} onClick={showModal} />,
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
      <ModalCart
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <Menu selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  );
};

export default NavBar;

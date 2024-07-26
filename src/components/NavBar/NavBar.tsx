import { useEffect, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Button, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthenticated } from "../../utils/auth";
import { ModalCart } from "../ModalCart/ModalCart";
import { useStore } from "../../store/store";
import styles from "./NavBar.module.css";

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
      label: (
        <Link className={styles.lables} to="/">
          Home
        </Link>
      ),
      key: "/",
      icon: <HomeOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: "/wishlist",
      label: (
        <Link className={styles.lables} to="/wishlist">
          Wishlist
        </Link>
      ),
      icon: (
        <Badge count={villaWishList.length}>
          <HeartOutlined style={{ fontSize: 20 }} />
        </Badge>
      ),
    },
    {
      label: (
        <Badge style={{ width: 10 }} count={villaBuyList.length}>
          <span className={styles.lables} onClick={showModal}>
            Cart List
          </span>
        </Badge>
      ),
      key: "/cartList",
      icon: (
        <ShoppingCartOutlined style={{ fontSize: 20 }} onClick={showModal} />
      ),
    },
    ...(isAdminAuthenticated()
      ? [
          {
            label: <Link to="/admin">Admin</Link>,
            key: "/admin",
            icon: <UserOutlined style={{ fontSize: 20 }} />,
          },
        ]
      : []),
  ];
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.imgContainer} onClick={() => navigate("/")}>
        <img src="src/assets/logo.jpg" />
      </div>
      <ModalCart
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <Menu
        className={styles.menu}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        <LogoutOutlined />
        Logout
      </Button>
    </div>
  );
};

export default NavBar;

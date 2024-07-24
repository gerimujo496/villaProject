import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { Villa } from "../types/villa";

interface Props {
  villa: Villa; // Define the props to expect an object with a 'villa' property
}

function VillaCard({ villa }: Props) {
  const navigate = useNavigate();
  const handleAddVillaToWishList = () => {
    // Add Villa to wish list with id as parameter
    console.log("adding to wishlist");
  };
  const handleAddVillaToCart = () => {
    // Add Villa to wish list with villa item as parameter
    console.log("adding to cart");
  };
  return (
    <Card
      style={{ width: 300, cursor: "pointer" }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      onClick={() => navigate(`/villas/id`)}
      actions={[
        <HeartOutlined
          onClick={(e) => {
            e.stopPropagation();
            handleAddVillaToWishList();
          }}
          key="like"
        />,
        <ShoppingCartOutlined
          onClick={(e) => {
            e.stopPropagation();
            handleAddVillaToCart();
          }}
          key="cart"
        />,
      ]}
    >
      <Meta
        title="Villa Sponxh Hamedani"
        description="A spacious villa with a great mountain view"
      />
      <div style={{ marginTop: 16 }}>
        <p>
          <strong>Size:</strong> {villa.area} sqm
        </p>
        <p>
          <strong>Location:</strong> {villa.location}
        </p>
        <p>
          <strong>Price:</strong> €{villa.price}
        </p>
        <p>
          <strong>Floors:</strong> {villa.floors}
        </p>
        <p>
          <strong>Rooms:</strong> {villa.numOfRooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {villa.bathrooms}
        </p>
      </div>
    </Card>
  );
}

export default VillaCard;

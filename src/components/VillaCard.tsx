import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
function VillaCard() {
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
          <strong>Size:</strong> 150 sqm
        </p>
        <p>
          <strong>Location:</strong> Tirana
        </p>
        <p>
          <strong>Price:</strong> €500,000
        </p>
        <p>
          <strong>Floors:</strong> 2
        </p>
        <p>
          <strong>Rooms:</strong> 7
        </p>
        <p>
          <strong>Bathrooms:</strong> 3
        </p>
      </div>
    </Card>
  );
}
export default VillaCard;

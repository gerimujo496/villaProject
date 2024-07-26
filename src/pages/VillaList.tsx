import { Alert, Col, Flex, Row, Spin, Typography } from "antd";
import VillaFilter from "../components/VillaFilter/VillaFilter";
import VillaCard from "../components/VillaCard/VillaCard";
import { useVillasTable } from "../hooks/useVillaTable";
import { filteredVillasFn } from "../utils/filter";
import { useStore } from "../store/store";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const VillaList = () => {
  const { data, isError, isLoading } = useVillasTable();
  const { location, locationType, floors, bathrooms, price, isForSale } = useStore();

  const filters = {
    location,
    locationType,
    floors,
    bathrooms,
    price,
    isForSale
  };

  const filteredVillasArray = filteredVillasFn(data, filters);

  if (isError) {
    return (
      <>
        <VillaFilter />
        <Alert
          message="Error Message"
          description="Data could not loaded. Please try again later"
          type="error"
        />
      </>
    );
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f0f2f5" }}>
      <VillaFilter />
      {isLoading ? (
        <Flex align="center" gap="middle">
          <Spin
            fullscreen={true}
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        </Flex>
      ) : (
        <Row gutter={[16, 24]} justify="start">
          {filteredVillasArray && filteredVillasArray.length > 0 ? (
            filteredVillasArray.map((villa) => (
              <Col key={villa.id} xs={24} sm={12} md={8} lg={6}>
                <VillaCard villa={villa} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Title
                level={4}
                style={{ textAlign: "center", margin: "2rem 0" }}
              >
                There are no villas for the applied filters!
              </Title>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default VillaList;

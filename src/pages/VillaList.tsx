import { Col, Row, Typography } from "antd";
import VillaFilter from "../components/VillaFilter";
import VillaCard from "../components/VillaCard/VillaCard";
import { useVillasTable } from "../hooks/useVillaTable";
import { filteredVillasFn } from "../utils/filter";
import { useStore } from "../store/store";

const { Title } = Typography;

const VillaList = () => {
  const { data } = useVillasTable();
  const { location, locationType, floors, bathrooms, price } = useStore();

  const filters = {
    location,
    locationType,
    floors,
    bathrooms,
    price,
  };

  const filteredVillasArray = filteredVillasFn(data, filters);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f0f2f5" }}>
      <VillaFilter />
      <Row gutter={[16, 24]} justify="center">
        {filteredVillasArray && filteredVillasArray.length > 0 ? (
          filteredVillasArray.map((villa) => (
            <Col key={villa.id} xs={24} sm={12} md={8} lg={6}>
              <VillaCard villa={villa} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center", margin: "2rem 0" }}>
              There are no villas for the applied filters!
            </Title>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default VillaList;

// import { Col, Row } from "antd";
// import VillaFilter from "../components/VillaFilter";
// import VillaCard from "../components/VillaCard/VillaCard";
// import { useVillasTable } from "../hooks/useVillaTable";
// import { filteredVillasFn } from "../utils/filter";
// import { useStore } from "../store/store";

// const VillaList = () => {
//   const { data } = useVillasTable();
//   const { location, locationType, floors, bathrooms, price } =
//     useStore();

//   const filters = {
//     location,
//     locationType,
//     floors,
//     bathrooms,
//     price,
//   };

//   const filteredVillasArray = filteredVillasFn(data, filters);

//   return (
//     <>
//       <VillaFilter />
//       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//         {filteredVillasArray ? (
//           filteredVillasArray?.map((villa) => (
//             <Col key={villa.id} className="gutter-row" span={6}>
//               <VillaCard key={villa.id} villa={villa} />
//             </Col>
//           ))
//         ) : (
//           <h1 style={{ width: "100%", textAlign: "center" }}>
//             There are no villas for the applied filters!
//           </h1>
//         )}
//       </Row>
//     </>
//   );
// };

// export default VillaList;

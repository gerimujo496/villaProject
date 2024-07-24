import { Col, Row } from "antd";
import VillaFilter from "../components/VillaFilter";
import VillaCard from "../components/VillaCard/VillaCard";
import { useVillaFilter } from "../hooks/useVillaFilter";
import { Filters } from "../types/filters";

const mockVillas = [
  {
    id: "121",
    location: "Tirana",
    floors: 2,
    numOfBathrooms: 1,
    locationType: "seaSide",
    price: 30000,
    numOfRooms: 5,
    area: 300,
  },
  {
    id: "1212",
    location: "Saranda",
    floors: 1,
    bathrooms: 2,
    locationType: "hill",
    price: 90000,
    numOfRooms: 5,
    area: 300,
  },
  {
    id: "1213",
    location: "Durrës",
    floors: 3,
    bathrooms: 2,
    locationType: "riverBank",
    price: 150000,
    numOfRooms: 5,
    area: 300,
  },
  {
    id: "1214",
    location: "Durrës",
    floors: 3,
    bathrooms: 2,
    locationType: "riverBank",
    price: 160000,
    numOfRooms: 5,
    area: 300,
  }
];

const VillaList = () => {
  const { filteredVillas, displayFiltersResult } = useVillaFilter(mockVillas);

  const handleFilterChange = (filterValues: Filters) => {
    displayFiltersResult(filterValues);
  };

  return (
    <>
      <VillaFilter onFilterChange={handleFilterChange} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {filteredVillas?.length > 0 ? (
          filteredVillas?.map((villa) => (
            <Col key={villa.id} className="gutter-row" span={6}>
              <VillaCard key={villa.id} villa={villa} />
            </Col>
          ))
        ) : (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            There are no villas for the applied filters!
          </h1>
        )}
      </Row>
    </>
  );
};

export default VillaList;

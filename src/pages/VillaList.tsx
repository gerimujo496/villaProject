import { Col, Row } from "antd";
import VillaFilter from "../components/VillaFilter";
import VillaCard from "../components/VillaCard/VillaCard";
import { useVillasTable } from "../hooks/useVillaTable";
import { filteredVillasFn } from "../utils/filter";
import { useStore } from "../store/store";
import { useEffect } from "react";
import { getLocalStorageFilters } from "../utils/getLocalStorageFilters";

const VillaList = () => {
  const { data } = useVillasTable();
  const { location, locationType, floors, bathrooms, price, applyFilters } =
    useStore();

  const fetchFiltersFromLocalStorage = () => {
    const localStorageFilters = getLocalStorageFilters();
    applyFilters(localStorageFilters);
  };

  useEffect(() => {
    fetchFiltersFromLocalStorage();
  }, []);

  const filters = {
    location,
    locationType,
    floors,
    bathrooms,
    price,
  };

  const filteredVillasArray = filteredVillasFn(data, filters);

  return (
    <>
      <VillaFilter />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {filteredVillasArray ? (
          filteredVillasArray?.map((villa) => (
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

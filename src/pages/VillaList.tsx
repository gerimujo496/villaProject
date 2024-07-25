
import { Col, Row } from "antd";
import VillaFilter from "../components/VillaFilter";
import VillaCard from "../components/VillaCard/VillaCard";
import { useVillaFilter } from "../hooks/useVillaFilter";
import { Filters } from "../types/filters";
import { useVillasTable } from "../hooks/useVillaTable";
import { useEffect, useState } from "react";

const VillaList = () => {
  
  const { data } = useVillasTable();
  const [villasArray, setVillasArray] = useState<any>([]);
  const { filteredVillas, displayFiltersResult } = useVillaFilter(villasArray);

  useEffect(() => {
    console.log("API DATA",data);
    // if (data && data.length > 0) {
    //   setVillasArray(data);
    // }
    if (Array.isArray(data)) {
      setVillasArray(data);
    } else {
      console.error("Data is not an array:", data);
    }
  }, [data, setVillasArray])

  const handleFilterChange = (filterValues: Filters) => {
    displayFiltersResult(filterValues);
  };


  console.log(villasArray, 'STATE')
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

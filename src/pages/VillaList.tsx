import { Col, Row } from "antd";
import VillaFilter from "../components/VillaFilter";
import VillaCard from "../components/VillaCard/VillaCard";
import { useVillaFilter } from "../hooks/useVillaFilter";
import { Filters } from "../types/filters";
import { useVillasTable } from "../hooks/useVillaTable";

const VillaList = () => {
  const { data } = useVillasTable();
  console.log("data11", data);
  const { filteredVillas, displayFiltersResult, results } =
    useVillaFilter(data);

  console.log(filteredVillas, "FILTERED");
  const handleFilterChange = (filterValues: Filters) => {
    displayFiltersResult(filterValues);
  };

  return (
    <>
      <VillaFilter onFilterChange={handleFilterChange} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {data?.length || 0 > 0 ? (
          data?.map((villa) => (
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

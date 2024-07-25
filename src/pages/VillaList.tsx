import VillaFilter from "../components/VillaFilter";
import { useVillasTable } from "../hooks/useVillaTable";

const VillaList = () => {
  const { data } = useVillasTable();
  console.log(data);
  return (
    <>
      <VillaFilter />

      <div>VillaList</div>
    </>
  );
};

export default VillaList;

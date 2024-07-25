import { CloseOutlined } from "@ant-design/icons";
import styles from "./BuyListElement.module.css";
import { useStore } from "../../store/store";

interface Props {
  image: string;
  location: string;
  price: number;
  id:string
}
export const BuyListElement: React.FC<Props> = ({ image, location, price, id }) => {
    const{removeVillaFromBuyList}=useStore();
  return (
    <div className={styles.buyListElementContainer}>
      <img className={styles.imageBuyListElement} src={image}></img>
      <p>{location}</p>
      <p>{`${price} €`}</p>

      <CloseOutlined onClick={()=>removeVillaFromBuyList(id)} className={styles.remove} />
    </div>
  );
};

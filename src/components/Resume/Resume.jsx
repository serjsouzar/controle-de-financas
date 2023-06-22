import { ResumeItem } from "../ResumeItem/ResumeItem";
import * as C from "./styles"
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign
} from "react-icons/fa"


export function Resume({income, outcome, total}) {
  return (
    <C.Container>
      <ResumeItem title="Entradas" value={income} Icon={FaRegArrowAltCircleUp}/>
      <ResumeItem title="Saídas" value={outcome} Icon={FaRegArrowAltCircleDown}/>
      <ResumeItem title="Total" value={total} Icon={FaDollarSign}/>
    </C.Container>
  );
}

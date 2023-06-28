import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

export function GridItem({ item, onDelete }) {

  const amountDecimal = item.amount
  console.log(parseFloat(amountDecimal).toFixed(2))

  return (
    <C.Tr>
      <C.Td>{item.desc}</C.Td>
      <C.Td>{parseFloat(amountDecimal).toFixed(2)}</C.Td>
      <C.Td alignCenter>
        {item.outcome ? (
          <FaRegArrowAltCircleDown color="red" />
        ) : (
          <FaRegArrowAltCircleUp color="green" />
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={() => onDelete(item.id)} />
      </C.Td>
    </C.Tr>
  );
}

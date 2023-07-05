import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

export function GridItem({ item, onDelete, titleCheckbox, setTitleCheckbox}) {


  function handleChangeCheckBox(){
    if (titleCheckbox === false) setTitleCheckbox(!titleCheckbox)
  }

  const amountDecimal = item.value

  return (
    <C.Tr>
      <C.Td>
        <input className="desc-checkbox" type="checkbox" defaultValue={false} onChange={handleChangeCheckBox}/>  
        {item.title}
      </C.Td>
      <C.Td>{parseFloat(amountDecimal).toFixed(2)}</C.Td>
      <C.Td alignCenter>
        {item.outcome ? (
          <FaRegArrowAltCircleDown color="red" />
        ) : (
          <FaRegArrowAltCircleUp color="green" />
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={() => onDelete(item._id)} />
      </C.Td>
    </C.Tr>
  );
}

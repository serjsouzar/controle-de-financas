import { useState } from "react";
import { GridItem } from "../GridItem/GridItem";
import * as C from "./styles";


export function Grid({ itens, setItens }) {
  const [titleCheckbox, setTitleCheckbox] = useState(false);

  function getResultsApi() {

    fetch("https://controle-de-financas-backend.onrender.com/api/finances")
      .then((response) => response.json())
      .then((response) => {        
        return setItens(response.amount)        
      });
  }

  const onDelete = async (id) => {
    const selectedAmount = id;
    if (selectedAmount) {
      try {
          await fetch(
          `https://controle-de-financas-backend.onrender.com/api/finances/${selectedAmount}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: selectedAmount }),
          }
        ).then((response) => {
          if (response.ok && titleCheckbox === true) {
            
            const newArray = itens.filter(
              (transaction) => transaction._id !== selectedAmount
            );
            
            setItens(newArray);
            setTitleCheckbox(false)
            
            getResultsApi()  
          } else {
            alert("Falha ao deletar o item selecionado. Por gentileza remarcar o checkbox.");
          }
        });
      } catch (error) {
        console.error("Ocorreu um erro ao deletar o componente:", error);
      }
    } else if(titleCheckbox === false){
      return
    }
    
  };
  

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th width={40}>Descrição</C.Th>
          <C.Th width={40}>Valor</C.Th>
          <C.Th width={10} alignCenter>
            Tipo
          </C.Th>
          <C.Th width={10}></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens.map((item) => (
          <GridItem
            key={item._id}
            item={item}
            onDelete={onDelete}
            titleCheckbox={titleCheckbox}
            setTitleCheckbox={setTitleCheckbox}
          />
        ))}
      </C.Tbody>
    </C.Table>
  );
}

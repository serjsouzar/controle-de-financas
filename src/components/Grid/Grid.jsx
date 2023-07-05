import { GridItem } from "../GridItem/GridItem";
import * as C from "./styles";

export function Grid({ itens, setItens }) {
  function getResultsApi() {
    fetch("https://controle-de-financas-backend.onrender.com/api/finances")
      .then((response) => response.json())
      .then((response) => {
        return setItens(response.amount);
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
          if (response.ok) {
            const newArray = itens.filter(
              (transaction) => transaction._id !== selectedAmount
            );

            setItens(newArray);

            getResultsApi();
          } else {
            alert(
              "Falha ao deletar o item selecionado. Por gentileza remarcar o checkbox."
            );
          }
        });
      } catch (error) {
        console.error("Ocorreu um erro ao deletar o componente:", error);
      }
    } else if (!selectedAmount) {
      return;
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
          <GridItem key={item._id} item={item} onDelete={onDelete} />
        ))}
      </C.Tbody>
    </C.Table>
  );
}

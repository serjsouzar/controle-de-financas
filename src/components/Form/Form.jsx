import { Grid } from "../Grid/Grid";
import { useState } from "react";
import * as C from "./styles";

export function Form({ handleAdd, transactionList, setTransactionList }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const generateId = () => Math.round(Math.random() * 1000);

  function handleOptions() {
    if (!desc || !amount) {
      alert("Informe a descrição e o valor!");
      return;
    } else if (amount < 1) {
      alert("O valor precisa ser positivo!");
      return;
    }

    const transaction = {
      id: generateId(),
      desc: desc,
      amount: amount,
      isCheck: isCheck,
    };

    handleAdd(transaction);

    setDesc("");
    setAmount("");
  }

  return (
    <>
      <C.Container>
        <C.InputContainer>
          <C.Label>Descrição</C.Label>
          <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </C.InputContainer>
        <C.InputContainer>
          <C.Label>Valor</C.Label>
          <C.Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </C.InputContainer>

        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setIsCheck(!isCheck)}
          ></C.Input>
          <C.Label htmlFor="rIncome">Entradas</C.Label>
        </C.RadioGroup>

        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rOutcome"
            name="group1"
            onChange={() => setIsCheck(!isCheck)}
          ></C.Input>
          <C.Label htmlFor="rOutcome">Saídas</C.Label>
        </C.RadioGroup>

        <C.Button onClick={handleOptions}>ADICIONAR</C.Button>
      </C.Container>
      <Grid itens={transactionList} setItens={setTransactionList} />
    </>
  );
}

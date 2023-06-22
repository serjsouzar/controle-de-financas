import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { Resume } from "./components/Resume/Resume";
import { GlobalStyle } from "./styles/global";
import { useState, useEffect } from "react";

export default function App() {
  const data = localStorage.getItem("transactions");
  const [transactionList, setTransactionList] = useState(
    data ? JSON.parse(data) : []
  );

  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amountOutcome = transactionList
      .filter((item) => item.outcome)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionList
      .filter((item) => !item.outcome)
      .map((transaction) => Number(transaction.amount));

      
    const outcomeTotal = amountOutcome
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const incomeTotal = amountIncome
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const amountTotal = Math.abs(incomeTotal - outcomeTotal).toFixed(2);

    setIncome(`R$ ${incomeTotal}`);
    setOutcome(`R$ ${outcomeTotal}`);
    setTotal(
      `${incomeTotal > outcomeTotal ? "-" : ""} R$ ${amountTotal}`
    );
  }, [transactionList]);



  function handleAdd(transaction) {
    const newArrayTransaction = [...transactionList, transaction];

    setTransactionList(newArrayTransaction);

    localStorage.setItem("transactions", JSON.stringify(newArrayTransaction));
  }

  return (
    <>
      <Header />
      <Resume income={income} outcome={outcome} total={total} />
      <Form handleAdd={handleAdd} transactionList={transactionList} setTransactionList={setTransactionList}/>
      <GlobalStyle />
    </>
  );
}

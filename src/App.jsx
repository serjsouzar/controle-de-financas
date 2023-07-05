import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { Resume } from "./components/Resume/Resume";
import { GlobalStyle } from "./styles/global";
import { useState, useEffect } from "react";

export default function App() {
  
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [total, setTotal] = useState(0);
  
  const [transactionList, setTransactionList] = useState([]);

  function getResultsApi() {

    fetch("https://controle-de-financas-backend.onrender.com/api/finances")
      .then((response) => response.json())
      .then((response) => {        
        return setTransactionList(response.amount)        
      });
  }

  useEffect((transaction) => {
    getResultsApi(transaction)
  },[]) 
  

  useEffect(() => {
    const amountOutcome = transactionList
      .filter((item) => item.outcome)
      .map((transaction) => transaction.value);

    const amountIncome = transactionList
      .filter((item) => !item.outcome)
      .map((transaction) => transaction.value);

    const outcomeTotal = amountOutcome
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const incomeTotal = amountIncome
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const amountTotal = Math.abs(incomeTotal - outcomeTotal).toFixed(2);

    setIncome(`R$ ${incomeTotal}`);
    setOutcome(`R$ ${outcomeTotal}`);
    
    setTotal(`${incomeTotal < outcomeTotal ? "-" : ""} R$ ${amountTotal}`);
  }, [transactionList]);


  function handleAdd(transaction) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    };

    fetch("https://controle-de-financas-backend.onrender.com/api/finances", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        getResultsApi()
      })
      .catch((error) => {
        console.error("Erro ao adicionar a transação:", error);
      });
    }


  return (
    <>
      <Header />
      <Resume income={income} outcome={outcome} total={total} />
      <Form
        handleAdd={handleAdd}
        transactionList={transactionList}
        setTransactionList={setTransactionList}
      />
      <GlobalStyle />
    </>
  );
}

